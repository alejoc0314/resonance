import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private clientId = environment.spotifyConfig.clientId;
  private clientSecret = environment.spotifyConfig.clientSecret;
  private redirectUri = environment.spotifyConfig.redirectUri;
  public setAccessGranted = signal<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {}

  getPublicAccessToken() {
    return localStorage.getItem('access_token');
  }

  setPublicAccessToken(accessToken: string) {
    localStorage.setItem('public_access_token', accessToken);
  }

  redirectToSpotifyAuth(): void {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=user-read-private user-read-email streaming playlist-modify-public playlist-modify-private user-top-read user-library-read playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing&redirect_uri=${this.redirectUri}`;
    window.location.href = authUrl;
  }

  async getAccessTokenFromCode(code: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code!);
    body.set('redirect_uri', this.redirectUri);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    this.http
      .post('https://accounts.spotify.com/api/token', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .subscribe({
        next: (response: any) => {
          this.setPublicAccessToken(response.access_token);
          this.setAccessGranted.set(true);
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        },
        error: () => {
          this.redirectToSpotifyAuth();
        },
      });
  }

  setDeviceId(deviceId: string): void {
    localStorage.setItem('device_id', deviceId);
  }

  // Método para obtener el Device ID
  getDeviceId(): string | null {
    const deviceId = localStorage.getItem('device_id');
    return deviceId;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}
