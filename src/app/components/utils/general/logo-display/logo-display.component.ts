import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralStateService } from '../../../../state/general-state/general-state.service';
import { SongStateService } from '../../../../state/song-state/song-state.service';

@Component({
  selector: 'app-logo-display',
  standalone: true,
  imports: [],
  templateUrl: './logo-display.component.html',
  styleUrl: './logo-display.component.scss',
})
export class LogoDisplayComponent {
  constructor(
    public router: Router,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService
  ) {}

  goHome() {
    this.generalStateService.setIsSearching(false);
    this.songStateService.setIsDetailOn(false);
    this.generalStateService.setDisplaySearch(false);

    this.router.navigate([`/start`]);
  }
}
