import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogPost } from '../../../core/models/blog-post.model';
import { RouteAnimationDirective } from '../../../shared/directives/route-animation.directive';
import { BlogPostService } from '../../../core/services/blog-post.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MarkdownComponent,
    RouteAnimationDirective
  ],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss'
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogPostService);

  post = signal<BlogPost | null>(null);
  markdownContent = signal<string>('');
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  loadPost(slug: string) {
    this.isLoading.set(true);
    this.notFound.set(false);

    this.blogService.getPostBySlug(slug).subscribe({
      next: (post) => {
        if (post) {
          this.post.set(post);
          this.loadMarkdownContent(post.fileName);
        } else {
          this.notFound.set(true);
          this.isLoading.set(false);
        }
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  loadMarkdownContent(fileName: string) {
    this.blogService.getPostContent(fileName).subscribe({
      next: (content) => {
        this.markdownContent.set(content);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading markdown content:', error);
        this.markdownContent.set('# Error\n\nCould not load blog post content.');
        this.isLoading.set(false);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}