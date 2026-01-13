import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {
  project = input.required<Project>();
  cardClicked = output<Project>();

  onCardClick() {
    this.cardClicked.emit(this.project());
  }

  onLinkClick(event: Event, url: string) {
    event.stopPropagation(); // Prevent card click
    window.open(url, '_blank');
  }
}