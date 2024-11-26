import { Component, input } from '@angular/core';
import { AlbumItem } from '../../../../interfaces/albums';
import { ArtistItem } from '../../../../interfaces/artists';
import { TrackItem } from '../../../../interfaces/songs';
import { HandleTransitionService } from '../../../../services/handle-navigation/handle-transition.service';
import { SongStateService } from '../../../../state/song-state/song-state.service';
import { CommonModule } from '@angular/common';
import { GeneralStateService } from '../../../../state/general-state/general-state.service';

@Component({
  selector: 'app-song-recomendations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-recomendations-list.component.html',
  styleUrl: './song-recomendations-list.component.scss',
})
export class SongRecomendationsListComponent {
  public trackList = input<TrackItem[] | undefined>(undefined);
  protected slicedList: TrackItem[] | undefined = undefined;

  constructor(
    public songStateService: SongStateService,
    protected transitionService: HandleTransitionService,
    public generalStateService: GeneralStateService
  ) {}

  handleSlicedItemList(
    slicedItems: TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  ) {
    this.slicedList = slicedItems as TrackItem[];
  }
}
