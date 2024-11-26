import { Injectable } from '@angular/core';
import { AuthStateService } from '../../state/auth-state/auth-state.service';
import { GeneralStateService } from '../../state/general-state/general-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoadSpotifyService {
  constructor(
    private authStateService: AuthStateService,
    private generalStateService: GeneralStateService
  ) {}

  public loadSpotifyScript(): void {
    if (typeof document !== 'undefined') {
      if (!document.getElementById('spotify-web-playback-sdk')) {
        const script = document.createElement('script');
        script.id = 'spotify-web-playback-sdk';
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        script.onload = () => {
          console.log('Spotify SDK Loaded');
          if (window.Spotify) {
            console.log('Spotify object is available');
            this.initializeSpotifyPlayer();
          } else {
            console.error('Spotify object is not available');
          }
        };
        script.onerror = (error) => {
          console.error('Error loading Spotify SDK', error);
        };
        document.body.appendChild(script);
      }
    }
  }

  public setupSpotifySDK() {
    if (window.Spotify) {
      console.log('Spotify SDK is already loaded');
      this.initializeSpotifyPlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('Spotify SDK is ready');
        this.initializeSpotifyPlayer();
      };
    }
  }

  public initializeSpotifyPlayer() {
    const token = localStorage.getItem('access_token');
    if (token !== '') {

      setTimeout(() => {
        const player = new Spotify.Player({
          name: 'My Web Playback SDK Player',
          getOAuthToken: (cb) => {
            cb(token!);
          },
          volume: 0.5,
        });

        player.addListener('initialization_error', ({ message }) => {
          console.error('Initialization Error:', message);
        });

        player.addListener('authentication_error', ({ message }) => {
          console.error('Authentication Error:', message);
        });

        player.addListener('account_error', ({ message }) => {
          console.error('Account Error:', message);
        });

        player.addListener('playback_error', ({ message }) => {
          console.error('Playback Error:', message);
        });

        // player.addListener('player_state_changed', (state) => {
        //   console.log('Player State Changed:', state);
        // });

        // Este evento se emite cuando el dispositivo está listo
        player.addListener('ready', ({ device_id }) => {
          this.generalStateService.showHome.set(true);
          this.authStateService.setDeviceId(device_id);
        });

        // Este evento se emite cuando el reproductor no está listo
        player.addListener('not_ready', ({ device_id }) => {
          this.generalStateService.showHome.set(false);
          this.authStateService.setDeviceId(device_id);
        });

        // Intentamos conectar el reproductor
        player.connect().then((success) => {
          if (success) {
            console.log('The Spotify Player connected successfully!');
          } else {
            this.authStateService.redirectToSpotifyAuth();
            console.error('Failed to connect Spotify Player.');
          }
        });
      }, 1000);
    } else {
      console.warn('Access token is not available, retrying...');
      setTimeout(() => {
        this.initializeSpotifyPlayer();
      }, 500);
    }
  }
}
