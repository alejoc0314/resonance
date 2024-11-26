/// <reference types="spotify-web-playback-sdk" />

import {
  AfterViewInit,
  Component,
  effect,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarUserPlaylistsComponent } from './components/global/sidebar-user-playlists/sidebar-user-playlists.component';
import { NavbarSearchComponent } from './components/global/navbar-search/navbar-search.component';
import { FooterPlayingBarComponent } from './components/global/footer-playing-bar/footer-playing-bar.component';
import { SongStateService } from './state/song-state/song-state.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GeneralStateService } from './state/general-state/general-state.service';
import { PublicSongsService } from './services/public-songs/public-songs.service';
import { AuthStateService } from './state/auth-state/auth-state.service';
import { PlayMusicService } from './services/play-music/play-music.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarUserPlaylistsComponent,
    NavbarSearchComponent,
    FooterPlayingBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  /**
   * Preparativos del reproductor
   */
  protected isPlaying: boolean = false;
  protected currentTrack: string | undefined;

  constructor(
    public router: Router,
    public songStateService: SongStateService,
    public generalStateService: GeneralStateService,
    public publicSongService: PublicSongsService,
    public authStateService: AuthStateService,
    public playMusicService: PlayMusicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.publicSongService.loadTrendingPlaylists();

    // Ajustar la altura inicial y agregar el listener al evento de resize
    this.updateWindowHeight();
    window.addEventListener('resize', this.updateWindowHeight.bind(this));
  }

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    await this.authStateService.getAccessTokenFromCode(code!);
  }

  private updateWindowHeight = () => {
    if (isPlatformBrowser(this.platformId)) {
      this.generalStateService.setWindowHeight(window.innerHeight);
    }
  };

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.updateWindowHeight);
    }
  }
}
