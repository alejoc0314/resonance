import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumItem } from '../../interfaces/albums';
import { ArtistItem } from '../../interfaces/artists';
import { PlaylistItem } from '../../interfaces/public-playlist';
import { TrackItem } from '../../interfaces/songs';
import { GeneralStateService } from '../../state/general-state/general-state.service';
import { SongStateService } from '../../state/song-state/song-state.service';
import { PlayMusicService } from '../play-music/play-music.service';
import { SearchMusicService } from '../search-music/search-music.service';

@Injectable({
  providedIn: 'root',
})
export class HandleTransitionService {
  // Definición de la señal
  handleButtonClickSignal = signal<{
    itemId: string;
    type: string;
    navigationUrl: string;
  } | null>(null);

  constructor(
    private router: Router,
    private songStateService: SongStateService,
    private generalStateService: GeneralStateService,
    private searchMusicService: SearchMusicService,
  ) {
    // Definir el efecto para reaccionar a cambios en la señal
    effect(
      () => {
        const state = this.handleButtonClickSignal();
        if (state) {
          const { itemId, type, navigationUrl } = state;

          if (!itemId || !type) return;

          // Actualizar el estado de la canción
          this.updateSongState(itemId, type);

          // Obtener los detalles del ítem seleccionado
          this.fetchItemDetails(itemId, type);

          // Navegar a la ruta correspondiente
          this.navigateToDetails(navigationUrl, itemId);

          // Restablecer la señal
          this.resetButtonClickSignal();
        }
      },
      { allowSignalWrites: true }
    );
  }

  // Función para actualizar el estado de la canción
  private updateSongState(itemId: string, type: string): void {
    this.songStateService.setSelectedItem(itemId, type);
    this.songStateService.setIsSongSelected();
    this.songStateService.setIsDetailOn(true);
    this.generalStateService.setIsSearching(false);
  }

  // Función para obtener los detalles del ítem seleccionado
  private fetchItemDetails(itemId: string, type: string): void {
    this.searchMusicService.getItemDetails(itemId, type).subscribe({
      next: (response) => {
        if (type === 'artists') {
          this.fetchArtistTopTracks(itemId, response, type);
        } else {
          this.handleItemDetails(response, type);
        }
      },
      error: (err) => {
        console.error('Error al obtener los detalles del ítem:', err);
      },
    });
  }

  private fetchArtistTopTracks(
    itemId: string,
    response: any,
    type: string
  ): void {
    this.searchMusicService.getArtistTopTracks(itemId, 'US').subscribe({
      next: (topTracksResponse) => {
        response.tracks = topTracksResponse.tracks;
        this.handleItemDetails(response, type);
      },
      error: (err) => {
        console.error('Error al obtener las canciones del artista:', err);
      },
    });
  }

  // Función para manejar los detalles del ítem
  private handleItemDetails(response: any, type: string): void {
    this.songStateService.setSelectedItemDetails(response);
    this.handleTrackListSelected(type);
  }

  // Función para navegar a la ruta de detalles
  private navigateToDetails(navigationUrl: string, itemId: string): void {
    this.router.navigate([navigationUrl + itemId]);
  }

  // Función para restablecer la señal del botón
  private resetButtonClickSignal(): void {
    this.handleButtonClickSignal.set(null);
  }

  handleTrackListSelected(type: string) {
    const hasValidImages = (item: any) =>
      item && item.album && item.album.images && item.album.images.length > 0;

    this.generalStateService.actualSong.set(0);

    switch (type) {
      case 'tracks': {
        const tracks: TrackItem =
          this.songStateService.selectedItemDetails() as TrackItem;
        this.searchMusicService.searchSongs(tracks.name).subscribe({
          next: (response) => {
            const filteredTracks = this.filterTracks(response);

            filteredTracks.tracks.items[0] = tracks;

            this.songStateService.setTrackListDetails(
              filteredTracks.tracks.items
            );

            this.songStateService.selectedItemDetails.set(
              filteredTracks.tracks.items![0]
            );
          },
        });
        break;
      }
      case 'albums': {
        const albumItem: AlbumItem =
          this.songStateService.selectedItemDetails() as AlbumItem;
        const reconstructedItems = this.addAlbumImagesToTrackItems(albumItem);
        this.songStateService.setTrackListDetails(
          reconstructedItems.tracks.items
        );
        this.songStateService.selectedItemDetails.set(
          reconstructedItems.tracks.items![0]
        );
        break;
      }
      case 'artists': {
        const artistTracks =
          this.songStateService.selectedItemDetails() as ArtistItem;
        const validArtistTracks = artistTracks.tracks.filter(hasValidImages);
        this.songStateService.setTrackListDetails(validArtistTracks);
        this.songStateService.selectedItemDetails.set(validArtistTracks![0]);
        break;
      }
      case 'playlists': {
        const playlistTracks =
          this.songStateService.selectedItemDetails() as PlaylistItem;
        const mappedTracks = playlistTracks.tracks.items
          .map((item: any) => item.track)
          .filter(hasValidImages);
        this.songStateService.setTrackListDetails(mappedTracks);

        this.songStateService.selectedItemDetails.set(mappedTracks![0]);
        console.log(this.songStateService.selectedItemDetails());
        break;
      }
      default:
        break;
    }
  }

  addAlbumImagesToTrackItems(albumItem: AlbumItem) {
    const updatedItems = albumItem.tracks.items.map((item) => ({
      ...item,
      album: {
        ...item.album,
        images: albumItem.images,
      },
    }));

    return {
      ...albumItem,
      tracks: {
        ...albumItem.tracks,
        items: updatedItems,
      },
    };
  }

  filterTracks(tracksResponse: any): any {
    return {
      ...tracksResponse,
      tracks: {
        ...tracksResponse.tracks,
        items: tracksResponse.tracks.items.filter(
          (item: TrackItem) =>
            item !== null &&
            item.album !== null &&
            item.artists?.length > 0 &&
            item.available_markets?.length > 0 &&
            item.preview_url !== null
        ),
      },
    };
  }

  playNext(itemId: string, index: number, navigationUrl: string) {
    console.log(itemId, index, navigationUrl);

    this.searchMusicService.getItemDetails(itemId, 'tracks').subscribe({
      next: (response) => {
        this.updateSongState(itemId, 'tracks');
        this.songStateService.setSelectedItemDetails(response);
        this.songStateService.setSelectedItem(itemId, 'track');
        this.generalStateService.actualSong.set(index);
        this.router.navigate([navigationUrl + itemId]);
      },
      error: (err) => {
        console.error('Error al obtener los detalles del ítem:', err);
      },
    });
  }

  // Método para actualizar la señal (puedes llamar a esto desde otros componentes o servicios)
  triggerTransition(itemId: string, type: string, navigationUrl: string) {
    this.handleButtonClickSignal.set({ itemId, type, navigationUrl });
  }
}
