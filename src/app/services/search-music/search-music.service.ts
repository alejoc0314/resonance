import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SpotifyResponse, TrackItem } from '../../interfaces/songs';
import { AuthStateService } from '../../state/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class SearchMusicService {
  private spotifySearchApiUrl = 'https://api.spotify.com/v1/search';
  private spotifyDetailApiUrl = 'https://api.spotify.com/v1';

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  /**
   * Obtiene canciones recomendadas basadas en un trackId
   * @param trackId ID de la canción seleccionada
   * @param limit Número máximo de canciones recomendadas (default: 50)
   * @returns Observable con las canciones recomendadas
   */
  getRecommendedTracks(trackId: string): Observable<TrackItem[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authStateService.getPublicAccessToken()}`
    );

    const limit = 50;

    // Los parámetros que usaremos para la consulta
    const params = {
      seed_tracks: trackId, // Usamos el trackId seleccionado como semilla para recomendaciones
      limit: limit.toString(), // Definimos el límite de canciones recomendadas
    };

    // Realizamos la petición GET al endpoint de recomendaciones
    return this.http
      .get<any>(`${this.spotifyDetailApiUrl}/recommendations`, {
        headers,
        params,
      })
      .pipe();
  }

  // Método para buscar canciones
  public searchSongs(query: string): Observable<SpotifyResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authStateService.getPublicAccessToken()}`
    );

    const params = {
      q: query,
      type: 'track',
      limit: '50',
    };

    return this.http.get<SpotifyResponse>(this.spotifySearchApiUrl, {
      headers,
      params,
    });
  }

  public searchArtists(query: string): Observable<SpotifyResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authStateService.getPublicAccessToken()}`
    );

    const params = {
      q: query,
      type: 'artist',
      limit: '50',
    };

    return this.http.get<SpotifyResponse>(this.spotifySearchApiUrl, {
      headers,
      params,
    });
  }

  public searchAlbums(query: string): Observable<SpotifyResponse> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authStateService.getPublicAccessToken()}`
    );

    const params = {
      q: query,
      type: 'album',
      limit: '50',
    };

    return this.http.get<SpotifyResponse>(this.spotifySearchApiUrl, {
      headers,
      params,
    });
  }

  public getItemDetails(itemId: string, type: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authStateService.getPublicAccessToken()}`
    );

    return this.http.get<any>(`${this.spotifyDetailApiUrl}/${type}/${itemId}`, {
      headers,
    });
  }

  getArtistTopTracks(artistId: string, market: string = 'US'): Observable<any> {
    const url = `${this.spotifyDetailApiUrl}/artists/${artistId}/top-tracks?market=${market}`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.authStateService.getPublicAccessToken()}`,
      },
    });
  }
}
