import { Component, input, output, effect, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss'
})
export class ProjectModalComponent {
  project = input<Project | null>(null);
  closed = output<void>();

  currentImageIndex = 0;
  isClosing = signal(false);

  constructor() {
    // Reset image index and closing state when project changes
    effect(() => {
      if (this.project()) {
        this.currentImageIndex = 0;
        this.isClosing.set(false);
      }
    });
  }

  // Close on ESC key
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeModal();
  }

  closeModal() {
    // Trigger closing animation
    this.isClosing.set(true);
    
    // Wait for animation to complete before emitting close event
    setTimeout(() => {
      this.closed.emit();
      this.isClosing.set(false);
    }, 300); // Match this with CSS animation duration
  }

  onBackdropClick(event: MouseEvent) {
    // Close only if clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  nextImage() {
    const images = this.project()?.images || [];
    if (images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    }
  }

  previousImage() {
    const images = this.project()?.images || [];
    if (images.length > 0) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? images.length - 1 
        : this.currentImageIndex - 1;
    }
  }

  get hasMultipleImages(): boolean {
    return (this.project()?.images?.length || 0) > 1;
  }

  get currentImage(): string {
    const images = this.project()?.images;
    if (!images || images.length === 0) {
      return this.project()?.thumbnail || '';
    }
    return images[this.currentImageIndex];
  }
}