import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserAccessComponent } from '../../utils/user-access/user-access.component';
import { SongStateService } from '../../../state/song-state/song-state.service';
import { GeneralStateService } from '../../../state/general-state/general-state.service';
import { SearchMusicService } from '../../../services/search-music/search-music.service';
import { Router } from '@angular/router';
import { SearchInputComponent } from '../../utils/general/search-input/search-input.component';
import { LogoDisplayComponent } from "../../utils/general/logo-display/logo-display.component";

@Component({
  standalone: true,
  selector: 'app-navbar-search',
  imports: [CommonModule, SearchInputComponent, LogoDisplayComponent],
  templateUrl: './navbar-search.component.html',
  styleUrl: './navbar-search.component.scss',
})
export class NavbarSearchComponent {
  constructor(
    public router: Router,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService,
    public searchMusicService: SearchMusicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateNavbarHeight();
      window.addEventListener('resize', this.updateNavbarHeight);
    }
  }

  private updateNavbarHeight = () => {
    if (isPlatformBrowser(this.platformId)) {
      const navbarElement = document.querySelector('#navbar');
      if (navbarElement) {
        this.generalStateService.setNavbarHeight(navbarElement.clientHeight);
      }
    }
  };

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.updateNavbarHeight);
    }
  }
}
