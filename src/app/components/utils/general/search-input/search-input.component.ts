import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlbumItem } from '../../../../interfaces/albums';
import { ArtistItem } from '../../../../interfaces/artists';
import { TrackItem } from '../../../../interfaces/songs';
import { SearchMusicService } from '../../../../services/search-music/search-music.service';
import { GeneralStateService } from '../../../../state/general-state/general-state.service';
import { SongStateService } from '../../../../state/song-state/song-state.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  constructor(
    public router: Router,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService,
    public searchMusicService: SearchMusicService
  ) {}

  searchMusic($event: Event): void {
    const inputElement = $event.target as HTMLInputElement;
    const query = inputElement.value;

    if (query.length > 0) {
      forkJoin([
        this.searchMusicService.searchSongs(query),
        this.searchMusicService.searchArtists(query),
        this.searchMusicService.searchAlbums(query),
      ]).subscribe({
        next: ([songsResponse, artistsResponse, albumsResponse]) => {
          // Procesar la respuesta de las canciones
          this.songStateService.setSearchedSongsList(
            this.filterTracks(songsResponse)
          );

          // Procesar la respuesta de los álbumes
          this.songStateService.setSearchedAlbumList(
            this.filterAlbums(albumsResponse)
          );

          // Procesar la respuesta de los artistas
          this.songStateService.setSearchedArtistList(
            this.filterArtists(artistsResponse)
          );

          this.router.navigate([`/search`]);

          this.songStateService.setIsDetailOn(false);
          this.generalStateService.setIsSearching(true);
          this.generalStateService.setDisplaySearch(true);
        },
        error: (err) => {
          console.error('Error en las búsquedas:', err);
        },
      });
    }
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

  filterAlbums(albumsResponse: any): any {
    return {
      ...albumsResponse,
      albums: {
        ...albumsResponse.albums,
        items: albumsResponse.albums.items.filter(
          (item: AlbumItem) =>
            item !== null &&
            item.images?.length > 0 &&
            item.images.every((image) => image !== null) &&
            item.artists?.length > 0 &&
            item.available_markets?.length > 0
        ),
      },
    };
  }

  filterArtists(artistsResponse: any): any {
    return {
      ...artistsResponse,
      artists: {
        ...artistsResponse.artists,
        items: artistsResponse.artists.items.filter(
          (item: ArtistItem) =>
            item !== null &&
            item.images?.length > 0 &&
            item.images.every((image) => image !== null)
        ),
      },
    };
  }
}
