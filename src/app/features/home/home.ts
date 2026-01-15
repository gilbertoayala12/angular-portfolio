import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouteAnimationDirective } from '../../shared/directives/route-animation.directive';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';
import { BlogPost } from '../../core/models/blog-post.model';
import { BlogPostService } from '../../core/services/blog-post.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouteAnimationDirective
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  private blogService = inject(BlogPostService);

  public featuredProjects$: Observable<Project[]> = of([]);
  public recentPosts$: Observable<BlogPost[]> = of([]);

  skills = [
    {
      icon: 'code',
      title: 'Frontend Development',
      description: 'Building responsive, performant web applications with modern frameworks',
      technologies: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      icon: 'palette',
      title: 'UI/UX Design',
      description: 'Creating intuitive, accessible interfaces with attention to detail',
      technologies: ['Design Systems', 'Accessibility', 'Animation']
    },
    {
      icon: 'speed',
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and scalability',
      technologies: ['Optimization', 'Web Vitals', 'Best Practices']
    }
  ];

  ngOnInit() {
    this.loadFeaturedProjects();
    this.loadRecentPosts();
  }

  loadFeaturedProjects() {
    this.featuredProjects$ = this.projectsService.getAllProjects().pipe(
      map((projects)=> projects.slice(0, 3))
    );
  }

  loadRecentPosts() {
    this.recentPosts$ = this.blogService.getRecentPosts(3).pipe(
      map((recentPosts)=> recentPosts)
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}