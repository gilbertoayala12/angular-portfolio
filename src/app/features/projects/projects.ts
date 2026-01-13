import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';
import { RouteAnimationDirective } from '../../shared/directives/route-animation.directive';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    ProjectCardComponent,
    ProjectModalComponent,
    RouteAnimationDirective
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements OnInit {
  private projectsService = inject(ProjectsService);

  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  allTechnologies = signal<string[]>([]);
  selectedTech = signal<string | null>(null);
  selectedProject = signal<Project | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadProjects();
    this.loadTechnologies();
  }

  loadProjects() {
    this.isLoading.set(true);
    this.projectsService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.filteredProjects.set(projects);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading.set(false);
      }
    });
  }

  loadTechnologies() {
    this.projectsService.getAllTechnologies().subscribe({
      next: (techs) => {
        this.allTechnologies.set(techs);
      }
    });
  }

  filterByTechnology(tech: string) {
    if (this.selectedTech() === tech) {
      // Deselect if clicking the same tech
      this.selectedTech.set(null);
      this.filteredProjects.set(this.projects());
    } else {
      this.selectedTech.set(tech);
      this.projectsService.getProjectsByTechnology(tech).subscribe({
        next: (projects) => {
          this.filteredProjects.set(projects);
        }
      });
    }
  }

  clearFilter() {
    this.selectedTech.set(null);
    this.filteredProjects.set(this.projects());
  }

  openProjectModal(project: Project) {
    this.selectedProject.set(project);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    this.selectedProject.set(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }
}