import { Component } from '@angular/core';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';

@Component({
  selector: 'app-user-access',
  standalone: true,
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss'],
})
export class UserAccessComponent {
  constructor(private authStateService: AuthStateService) {}

  /**
   * Función para redirigir al usuario al Auth de Spotify
   */
  onClickLogin(): void {
    this.authStateService.redirectToSpotifyAuth();
  }

  onClickLogout(): void {
    this.authStateService.logout();
  }
}
