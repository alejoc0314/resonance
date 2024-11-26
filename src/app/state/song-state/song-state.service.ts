import { Injectable, signal } from '@angular/core';
import { AlbumItem } from '../../interfaces/albums';
import { ArtistItem } from '../../interfaces/artists';
import { PlaylistItem } from '../../interfaces/public-playlist';
import { Artist, SpotifyResponse, TrackItem } from '../../interfaces/songs';

export type PlaylistItems = PlaylistItem[];

@Injectable({
  providedIn: 'root',
})
export class SongStateService {
  private isSongSelected = signal<boolean>(false);
  private isDetailOn = signal<boolean>(false);
  private selectedItem = signal<{ itemId: string; type: string } | null>(null);
  public selectedItemDetails = signal<
    TrackItem | AlbumItem | ArtistItem | PlaylistItem | undefined
  >(undefined);
  private trackListDetails = signal<TrackItem[] | undefined>(undefined);
  private searchedSongsList = signal<SpotifyResponse | null>(null);
  private publicSongsPlaylists = signal<PlaylistItems | null>(null);
  private searchedAlbumsList = signal<SpotifyResponse | null>(null);
  private searchedArtistList = signal<SpotifyResponse | null>(null);

  constructor() {}

  /*
   * Getter y setter para "isSongSelected"
   * isSongSelected: Indica si una canción está seleccionada.
   */
  public getIsSongSelected() {
    return this.isSongSelected();
  }
  public setIsSongSelected() {
    this.isSongSelected.set(true);
  }

  /*
   * Getter y setter para "isDetailOn"
   * isDetailOn: Indica si se está mostrando el detalle de una canción.
   */
  public getIsDetailOn() {
    return this.isDetailOn();
  }
  public setIsDetailOn(value: boolean) {
    this.isDetailOn.set(value);
  }

  /*
   * Getter y setter para "selectedItem"
   * selectedItem: Representa el elemento seleccionado (ID y tipo).
   */
  public getSelectedItem() {
    return this.selectedItem();
  }
  public setSelectedItem(itemId: string, type: string) {
    this.selectedItem.set({ itemId: itemId, type: type });
  }

  /*
   * Getter y setter para "publicSongsPlaylists"
   * publicSongsPlaylists: Lista de playlists públicas disponibles.
   */
  public getPublicSongsPlaylists() {
    return this.publicSongsPlaylists();
  }
  public setPublicSongsPlaylists(playlists: PlaylistItems) {
    this.publicSongsPlaylists.set(playlists);
  }

  /*
   * Getter y setter para "searchedSongsList"
   * searchedSongsList: Lista de canciones obtenidas de la búsqueda.
   */
  public getSearchedSongsList() {
    return this.searchedSongsList;
  }
  public setSearchedSongsList(value: SpotifyResponse | null) {
    this.searchedSongsList.set(value);
  }

  /*
   * Getter y setter para "searchedAlbumsList"
   * searchedAlbumsList: Lista de álbumes obtenidos de la búsqueda.
   */
  public getSearchedAlbumList() {
    return this.searchedAlbumsList();
  }
  public setSearchedAlbumList(value: SpotifyResponse | null) {
    this.searchedAlbumsList.set(value);
  }

  /*
   * Getter y setter para "searchedArtistList"
   * searchedArtistList: Lista de artistas obtenidos de la búsqueda.
   */
  public getSearchedArtistList() {
    return this.searchedArtistList();
  }
  public setSearchedArtistList(value: SpotifyResponse | null) {
    this.searchedArtistList.set(value);
  }

  /*
   * Getter y setter para "selectedItemDetails"
   * selectedItemDetails: Detalle del Item Seleccionado.
   */
  public getSelectedItemDetails() {
    return this.selectedItemDetails;
  }
  public setSelectedItemDetails(
    detail: TrackItem | AlbumItem | ArtistItem | PlaylistItem | undefined
  ) {
    this.selectedItemDetails.set(detail);
  }

  /*
   * Getter y setter para "selectedItemDetails"
   * selectedItemDetails: Detalle del Item Seleccionado.
   */
  public getTrackListDetails() {
    return this.trackListDetails();
  }
  public setTrackListDetails(detail: TrackItem[] | undefined) {
    this.trackListDetails.set(detail);
  }
}
