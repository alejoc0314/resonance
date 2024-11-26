import { Component, effect } from '@angular/core';
import { GeneralStateService } from '../../../state/general-state/general-state.service';
import { SongStateService } from '../../../state/song-state/song-state.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HandleTransitionService } from '../../../services/handle-navigation/handle-transition.service';
import { SongsDisplayComponent } from '../../utils/songs/songs-display/songs-display.component';
import { AlbumsDisplayComponent } from '../../utils/albums/albums-display/albums-display.component';
import { ArtistsDisplayComponent } from '../../utils/artists/artists-display/artists-display.component';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    SongsDisplayComponent,
    AlbumsDisplayComponent,
    ArtistsDisplayComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  constructor(
    protected transitionService: HandleTransitionService,
    protected songStateService: SongStateService,
    protected generalStateService: GeneralStateService,
    public authStateService: AuthStateService
  ) {

  }
}
