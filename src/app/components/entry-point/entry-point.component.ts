import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './entry-point.component.html',
  styleUrl: './entry-point.component.scss',
})
export class EntryPointComponent {}
