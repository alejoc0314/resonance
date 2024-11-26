import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStateService } from '../../state/auth-state/auth-state.service';
import { SongStateService } from '../../state/song-state/song-state.service';

@Injectable({
  providedIn: 'root',
})
export class PublicSongsService {
  private clientId = environment.spotifyConfig.clientId;
  private clientSecret = environment.spotifyConfig.clientSecret;
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private publicToken = signal<string | null>('');

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService,
    private songStateService: SongStateService
  ) {
  }

  // Solicitar un token de acceso
  getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener el token:', error);
        return of(null);
      })
    );
  }

  // Obtener playlists populares o canciones en tendencia
  getTrendingPlaylists(publicAccessToken: string): Observable<any> {
    if (!publicAccessToken) {
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${publicAccessToken}`,
    });

    return this.http
      .get<any>('https://api.spotify.com/v1/browse/featured-playlists', {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener playlists:', error);
          return of(null);
        })
      );
  }

  loadTrendingPlaylists = (): void => {
    this.getAccessToken().subscribe((tokenResponse) => {
      this.publicToken.set(tokenResponse);
      if (tokenResponse && tokenResponse.access_token) {
        this.authStateService.setPublicAccessToken(tokenResponse.access_token);
        this.getTrendingPlaylists(tokenResponse.access_token).subscribe(
          (playlists) => {
            this.songStateService.setPublicSongsPlaylists(
              playlists.playlists.items
            );
          }
        );
      }
    });
  };
}
