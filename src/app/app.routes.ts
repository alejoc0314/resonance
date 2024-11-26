import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    component: HomePageComponent,
  },
  {
    path: 'song-detail/:id',
    component: DetailPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
