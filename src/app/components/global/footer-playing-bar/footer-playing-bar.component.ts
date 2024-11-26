import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GeneralStateService } from '../../../state/general-state/general-state.service';
import { SongStateService } from '../../../state/song-state/song-state.service';
import { Router } from '@angular/router';
import { PlaylistItem } from '../../../interfaces/public-playlist';
import { ArtistItem } from '../../../interfaces/artists';
import { AlbumItem } from '../../../interfaces/albums';
import { TrackItem } from '../../../interfaces/songs';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';
import { PlayMusicService } from '../../../services/play-music/play-music.service';
import { HandleTransitionService } from '../../../services/handle-navigation/handle-transition.service';
import { SearchMusicService } from '../../../services/search-music/search-music.service';
import { LoadSpotifyService } from '../../../services/load-spotify/load-spotify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-footer-playing-bar',
  imports: [CommonModule],
  templateUrl: './footer-playing-bar.component.html',
  styleUrls: ['./footer-playing-bar.component.scss'],
})
export class FooterPlayingBarComponent implements AfterViewInit {
  protected selectedItemDetails:
    | TrackItem
    | AlbumItem
    | ArtistItem
    | PlaylistItem
    | undefined = undefined;
  protected trackListDetails: TrackItem[] | undefined = undefined;
  protected volume: number = 50;

  constructor(
    public router: Router,
    private http: HttpClient,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService,
    public authStateService: AuthStateService,
    protected playMusicService: PlayMusicService,
    private searchMusicService: SearchMusicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    effect(
      () => {
        this.trackListDetails = this.songStateService.getTrackListDetails();

        const isSongSelected = this.songStateService.getIsSongSelected();
        if (isSongSelected) {
          this.updateFooterHeight();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateFooterHeight();
      window.addEventListener('resize', this.updateFooterHeight);
    }
  }

  private updateFooterHeight = () => {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const footerElement = document.querySelector('#footer');
        if (footerElement) {
          this.generalStateService.setFooterHeight(footerElement.clientHeight);
        }
      }, 100);
    }
  };

  setDetail() {
    const currentUrl = this.router.url;
    const itemId = this.songStateService.getSelectedItem()!.itemId;

    console.log('listDetail');

    // En caso de estar en la vista de búsqueda
    if (this.generalStateService.getDisplaySearch()) {
      if (currentUrl.endsWith('/search')) {
        this.songStateService.setIsDetailOn(true);
        this.router.navigate([`/song-detail/${itemId}`]);
      } else if (currentUrl.endsWith(`/song-detail/${itemId}`)) {
        this.songStateService.setIsDetailOn(true);
        this.generalStateService.setDisplaySearch(true);
        this.router.navigate([`/search`]);
      }
    }
    // En caso de estar en el home
    else if (currentUrl.endsWith('/start')) {
      this.songStateService.setIsDetailOn(true);
      this.router.navigate([`/song-detail/${itemId}`]);
    }
    // En caso de estar en la vista del detalle
    else if (currentUrl.endsWith(`/song-detail/${itemId}`)) {
      this.songStateService.setIsDetailOn(false);
      this.router.navigate([`/start`]);
    }
  }

  convertToMinutesAndSeconds(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.playMusicService.setAccessToken(localStorage.getItem('access_token')!);
  }

  playTrack(): void {
    this.playMusicService.playItem();
  }

  previousItem() {
    const currentIndex = this.generalStateService.actualSong();

    // Verifica que el índice actual sea mayor que 0
    if (currentIndex > 0) {
      // Decrementa el índice de la canción actual
      this.generalStateService.actualSong.set(currentIndex - 1);

      const previousItem =
        this.trackListDetails![this.generalStateService.actualSong()];

      const previousItemId = previousItem.id;

      const previousIndex = this.generalStateService.actualSong();

      console.log(previousIndex);

      // Obtiene los detalles del ítem anterior
      this.searchMusicService
        .getItemDetails(previousItemId, 'tracks')
        .subscribe({
          next: (response) => {
            this.songStateService.setSelectedItem(previousItemId, 'track');
            this.songStateService.setIsSongSelected();
            this.songStateService.setIsDetailOn(true);
            this.generalStateService.setIsSearching(false);
            this.songStateService.setSelectedItemDetails(response);
            this.songStateService.setSelectedItem(previousItemId, 'track');
            this.router.navigate([`/song-detail/${previousItemId}`]);
          },
          error: (err) => {
            console.error(
              'Error al obtener los detalles del ítem anterior:',
              err
            );
          },
        });
    }
  }

  nextItem() {
    const currentIndex = this.generalStateService.actualSong();

    if (currentIndex < 49) {
      this.generalStateService.actualSong.set(currentIndex + 1);

      const previousItem =
        this.trackListDetails![this.generalStateService.actualSong()];

      const previousItemId = previousItem.id;

      const previousIndex = this.generalStateService.actualSong();

      console.log(previousIndex);

      // Obtiene los detalles del ítem anterior
      this.searchMusicService
        .getItemDetails(previousItemId, 'tracks')
        .subscribe({
          next: (response) => {
            this.songStateService.setSelectedItem(previousItemId, 'track');
            this.songStateService.setIsSongSelected();
            this.songStateService.setIsDetailOn(true);
            this.generalStateService.setIsSearching(false);
            this.songStateService.setSelectedItemDetails(response);
            this.songStateService.setSelectedItem(previousItemId, 'track');
            this.router.navigate([`/song-detail/${previousItemId}`]);
          },
          error: (err) => {
            console.error(
              'Error al obtener los detalles del ítem anterior:',
              err
            );
          },
        });
    }
  }

  changeVolume(event: Event) {
    const target = event.target as HTMLInputElement; // Tipar el evento
    const volumeNumber = Number(target.value); // Obtener el valor y convertirlo a número
    this.volume = volumeNumber; // Actualiza el volumen en el componente

    // Llama al servicio para cambiar el volumen
    this.setVolume(volumeNumber).subscribe({
      next: () => {
        console.log(`Volumen cambiado a: ${volumeNumber}`);
      },
      error: (err) => {
        console.error('Error al cambiar el volumen:', err);
      },
    });
  }

  setVolume(volume: number) {
    const url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.put(url, {}, { headers });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.updateFooterHeight);
    }
  }
}
