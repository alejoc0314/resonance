import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStateService } from '../../../state/general-state/general-state.service';
import { SongStateService } from '../../../state/song-state/song-state.service';
import { Router } from '@angular/router';
import { TrackItem } from '../../../interfaces/songs';
import { SongRecomendationsListComponent } from '../../utils/songs/song-recomendations-list/song-recomendations-list.component';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';
import { PlayMusicService } from '../../../services/play-music/play-music.service';

@Component({
  standalone: true,
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  imports: [CommonModule, SongRecomendationsListComponent],
})
export class DetailPageComponent {
  public songDetails: TrackItem | undefined = undefined;

  constructor(
    public router: Router,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService,
    public authStateService: AuthStateService,
    public playMusicService: PlayMusicService
  ) {
    effect(() => {
      this.songStateService.getSelectedItemDetails()
    })
  }

  ngOnInit(): void {
    if (!this.songStateService.getSelectedItem()) {
      this.router.navigate([`/start`]);
    }
  }

  ngOnDestroy(): void {
    document.getElementById('detail');

    setTimeout(() => {}, 300);
  }
}
