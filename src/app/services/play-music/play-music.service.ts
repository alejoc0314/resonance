import { effect, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongStateService } from '../../state/song-state/song-state.service';
import { AuthStateService } from '../../state/auth-state/auth-state.service';
import { TrackItem } from '../../interfaces/songs';
import { AlbumItem } from '../../interfaces/albums';
import { ArtistItem } from '../../interfaces/artists';
import { PlaylistItem } from '../../interfaces/public-playlist';
import { GeneralStateService } from '../../state/general-state/general-state.service';

@Injectable({
  providedIn: 'root',
})
export class PlayMusicService {
  private accessToken: string | null = localStorage.getItem('access_token');
  public player: Spotify.Player | any = null;
  private selectedTrack:
    | TrackItem
    | AlbumItem
    | ArtistItem
    | PlaylistItem
    | undefined = undefined;

  public itemId: string = '';
  public deviceId: string = '';
  public headers!: HttpHeaders;
  public songIsPLaying = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private songStateService: SongStateService,
    private authStateService: AuthStateService,
    private generalStateService: GeneralStateService
  ) {
    effect(() => {
      this.selectedTrack = this.songStateService.selectedItemDetails();
      this.playItem();
    });
  }

  // Set the access token after login or authorization
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  playItem(): void {
    // Obtener el ítem seleccionado
    const item = this.songStateService.getSelectedItem();

    if (!item || !item.itemId || !item.type) {
      return;
    }

    this.itemId = this.selectedTrack!.id;

    // Obtener el ID del dispositivo
    this.deviceId = this.authStateService.getDeviceId() as string;

    // Si no hay dispositivo activo, lanzar error
    if (!this.deviceId) {
      console.error('No hay dispositivo activo para reproducir');
      return;
    }

    // Cabeceras necesarias para la solicitud
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });

    this.startPlayback(this.itemId, this.deviceId, this.headers);
  }

  private startPlayback(
    itemId: string,
    deviceId: string,
    headers: HttpHeaders
  ): void {
    // URL de la API de Spotify para iniciar la reproducción
    const playUrl = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

    const body = {
      uris: [`spotify:track:${itemId}`],
      position_ms: 0,
    };

    // Enviar la solicitud para reproducir el nuevo ítem
    this.http.put(playUrl, body, { headers }).subscribe(
      (response) => {
        this.songIsPLaying.set(true);
        console.log('Reproducción iniciada correctamente', response);
      },
      (error) => {
        console.error('Error al iniciar la reproducción', error);
      }
    );
  }

  public pausePlayback(): void {
    // URL de la API de Spotify para pausar la reproducción
    const pauseUrl = `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceId}`;

    const headers = this.headers;

    // Enviar la solicitud para pausar la reproducción
    this.http.put(pauseUrl, {}, { headers }).subscribe(
      (response) => {
        console.log('Reproducción pausada correctamente', response);
        this.songIsPLaying.set(false);
      },
      (error) => {
        console.error('Error al pausar la reproducción', error);
        this.songIsPLaying.set(false);
      }
    );
  }

  // Función para pausar la reproducción

  // Función para saltar a la siguiente canción
  skipToNextTrack(): Observable<any> {
    const url = 'https://api.spotify.com/v1/me/player/next';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.post(url, {}, { headers });
  }

  // Función para ajustar el volumen
  setVolume(volumePercent: number): Observable<any> {
    const url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });

    return this.http.put(url, {}, { headers });
  }
}
