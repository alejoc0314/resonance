import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongStateService } from '../../../../state/song-state/song-state.service';
import { HandleTransitionService } from '../../../../services/handle-navigation/handle-transition.service';
import { ArtistItem } from '../../../../interfaces/artists';
import { PagerConditionerComponent } from '../../general/pager-conditioner/pager-conditioner.component';
import { TrackItem } from '../../../../interfaces/songs';
import { AlbumItem } from '../../../../interfaces/albums';

@Component({
  selector: 'app-artists-display',
  standalone: true,
  imports: [CommonModule, PagerConditionerComponent],
  templateUrl: './artists-display.component.html',
  styleUrl: './artists-display.component.scss',
})
export class ArtistsDisplayComponent {
  protected artistList: ArtistItem[] | undefined = undefined;
  protected slicedList: ArtistItem[] | undefined = undefined;

  constructor(
    public songStateService: SongStateService,
    protected transitionService: HandleTransitionService
  ) {
    effect(() => {
      const searchedArtists = this.songStateService.getSearchedArtistList();
      if (searchedArtists != undefined) {
        this.artistList = searchedArtists!.artists!.items;
      }
    });
  }

  handleSlicedItemList(
    slicedItems: TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  ) {
    this.slicedList = slicedItems as ArtistItem[];
  }
}
