import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongStateService } from '../../../../state/song-state/song-state.service';
import { TrackItem } from '../../../../interfaces/songs';
import { HandleTransitionService } from '../../../../services/handle-navigation/handle-transition.service';
import { PagerConditionerComponent } from '../../general/pager-conditioner/pager-conditioner.component';
import { ArtistItem } from '../../../../interfaces/artists';
import { AlbumItem } from '../../../../interfaces/albums';

@Component({
  selector: 'app-songs-display',
  standalone: true,
  imports: [CommonModule, PagerConditionerComponent],
  templateUrl: './songs-display.component.html',
  styleUrl: './songs-display.component.scss',
})
export class SongsDisplayComponent {
  protected trackList: TrackItem[] | undefined = undefined;
  protected slicedList: TrackItem[] | undefined = undefined;

  constructor(
    public songStateService: SongStateService,
    protected transitionService: HandleTransitionService
  ) {
    effect(() => {
      const searchedSongs = this.songStateService.getSearchedSongsList();
      this.trackList = searchedSongs()?.tracks!.items;
    });
  }

  handleSlicedItemList(
    slicedItems: TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  ) {
    this.slicedList = slicedItems as TrackItem[];
  }
}
