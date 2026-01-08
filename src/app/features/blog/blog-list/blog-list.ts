import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../../../core/models/blog-post.model';
import { RouteAnimationDirective } from '../../../shared/directives/route-animation.directive';
import { BlogPostService } from '../../../core/services/blog-post.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouteAnimationDirective
  ],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss'
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogPostService);

  posts = signal<BlogPost[]>([]);
  filteredPosts = signal<BlogPost[]>([]);
  allTags = signal<string[]>([]);
  selectedTag = signal<string | null>(null);
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadPosts();
    this.loadTags();
  }

  loadPosts() {
    this.isLoading.set(true);
    this.blogService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.filteredPosts.set(posts);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading.set(false);
      }
    });
  }

  loadTags() {
    this.blogService.getAllTags().subscribe({
      next: (tags) => {
        this.allTags.set(tags);
      }
    });
  }

  filterByTag(tag: string) {
    if (this.selectedTag() === tag) {
      // Deselect if clicking the same tag
      this.selectedTag.set(null);
      this.filteredPosts.set(this.posts());
    } else {
      this.selectedTag.set(tag);
      this.blogService.getPostsByTag(tag).subscribe({
        next: (posts) => {
          this.filteredPosts.set(posts);
        }
      });
    }
  }

  onSearch() {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.filteredPosts.set(this.posts());
      this.selectedTag.set(null);
      return;
    }

    this.blogService.searchPosts(query).subscribe({
      next: (posts) => {
        this.filteredPosts.set(posts);
        this.selectedTag.set(null);
      }
    });
  }

  clearSearch() {
    this.searchQuery.set('');
    this.selectedTag.set(null);
    this.filteredPosts.set(this.posts());
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}