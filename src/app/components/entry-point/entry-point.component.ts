import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarUserPlaylistsComponent } from '../../global/sidebar-user-playlists/sidebar-user-playlists.component';
import { NavbarSearchComponent } from '../../global/navbar-search/navbar-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SidebarUserPlaylistsComponent, NavbarSearchComponent],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.scss',
})
export class EntryPointComponent {}
