import { Routes } from '@angular/router';
import { EntryPointComponent } from './components/entry-point/entry-point.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    component: EntryPointComponent,
  },
];
