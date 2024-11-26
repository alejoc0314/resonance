import { Component } from '@angular/core';
import { GeneralStateService } from '../../../state/general-state/general-state.service';

@Component({
  standalone: true,
  selector: 'app-sidebar-user-playlists',
  imports: [],
  templateUrl: './sidebar-user-playlists.component.html',
  styleUrl: './sidebar-user-playlists.component.scss',
})
export class SidebarUserPlaylistsComponent {
  constructor(public generalStateService: GeneralStateService) {}
}
