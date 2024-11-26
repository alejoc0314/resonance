import { Component } from '@angular/core';
import { AuthStateService } from '../../../state/auth-state/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(public authStateService: AuthStateService) {

  }
}
