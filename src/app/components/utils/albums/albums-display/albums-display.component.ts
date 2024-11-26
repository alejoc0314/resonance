import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongStateService } from '../../../../state/song-state/song-state.service';
import { HandleTransitionService } from '../../../../services/handle-navigation/handle-transition.service';
import { AlbumItem } from '../../../../interfaces/albums';
import { PagerConditionerComponent } from '../../general/pager-conditioner/pager-conditioner.component';
import { TrackItem } from '../../../../interfaces/songs';
import { ArtistItem } from '../../../../interfaces/artists';

@Component({
  selector: 'app-albums-display',
  standalone: true,
  imports: [CommonModule, PagerConditionerComponent],
  templateUrl: './albums-display.component.html',
  styleUrl: './albums-display.component.scss',
})
export class AlbumsDisplayComponent {
  protected albumList: AlbumItem[] | undefined = undefined;
  protected slicedList: AlbumItem[] | undefined = undefined;

  constructor(
    public songStateService: SongStateService,
    protected transitionService: HandleTransitionService
  ) {
    effect(() => {
      const searchedAlbums = this.songStateService.getSearchedAlbumList();
      if (searchedAlbums != undefined) {
        this.albumList = searchedAlbums!.albums!.items;
      }
    });
  }

  handleSlicedItemList(
    slicedItems: TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  ) {
    this.slicedList = slicedItems as AlbumItem[];
  }
}
