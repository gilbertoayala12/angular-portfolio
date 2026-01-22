import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavHeader } from "./shared/components/nav-header/nav-header";
import { ScrollService } from './core/services/scroll.service';
import { inject as injectVercel } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, NavHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Gilberto Ayala');
  private scrollService = inject(ScrollService);
  constructor(){
    injectVercel();
    injectSpeedInsights();
  }
}
