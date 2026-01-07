import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavHeader } from "./shared/components/nav-header/nav-header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, NavHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-portfolio');
}
