// home-page.component.ts
import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongStateService } from '../../../state/song-state/song-state.service';
import { GeneralStateService } from '../../../state/general-state/general-state.service';
import { HandleTransitionService } from '../../../services/handle-navigation/handle-transition.service';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';
import { LoadSpotifyService } from '../../../services/load-spotify/load-spotify.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  protected isButtonClicked = signal(false);
  
  constructor(
    protected transitionService: HandleTransitionService,
    protected songStateService: SongStateService,
    protected generalStateService: GeneralStateService,
    public authStateService: AuthStateService,
    private loadSpotifyService: LoadSpotifyService
  ) {
    console.log(songStateService.getPublicSongsPlaylists());
    effect(
      () => {
        const access = this.authStateService.setAccessGranted();

        if (access) {
          this.loadSpotifyService.loadSpotifyScript();

          this.loadSpotifyService.setupSpotifySDK();

          window.onSpotifyWebPlaybackSDKReady =
            this.loadSpotifyService.initializeSpotifyPlayer.bind(this);
        }
      },
      { allowSignalWrites: true }
    );
  }
}
