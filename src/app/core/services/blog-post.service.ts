import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { BlogPost, BlogPostContent } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private http = inject(HttpClient);
  private readonly METADATA_PATH = 'blog/blog-metadata.json';
  private readonly POSTS_PATH = 'blog/posts/';

  /**
   * Get all blog posts metadata
   */
  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.METADATA_PATH).pipe(
      map(posts => posts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )),
      catchError(error => {
        console.error('Error loading blog posts:', error);
        return of([]);
      })
    );
  }

  /**
   * Get a single post by slug
   */
  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.getAllPosts().pipe(
      map(posts => posts.find(post => post.slug === slug))
    );
  }

  /**
   * Get markdown content for a specific post
   */
  getPostContent(fileName: string): Observable<string> {
    return this.http.get(`${this.POSTS_PATH}${fileName}`, { 
      responseType: 'text' 
    }).pipe(
      catchError(error => {
        console.error('Error loading post content:', error);
        return of('# Error\n\nCould not load blog post content.');
      })
    );
  }

  /**
   * Get full post with content
   */
  getFullPost(slug: string): Observable<BlogPostContent | null> {
    return this.getPostBySlug(slug).pipe(
      map(post => {
        if (!post) return null;
        return {
          ...post,
          content: ''
        } as BlogPostContent;
      })
    );
  }

  /**
   * Get posts by tag
   */
  getPostsByTag(tag: string): Observable<BlogPost[]> {
    return this.getAllPosts().pipe(
      map(posts => posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      ))
    );
  }

  /**
   * Get all unique tags
   */
  getAllTags(): Observable<string[]> {
    return this.getAllPosts().pipe(
      map(posts => {
        const tags = new Set<string>();
        posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
      })
    );
  }

  /**
   * Get recent posts (limit)
   */
  getRecentPosts(limit: number = 3): Observable<BlogPost[]> {
    return this.getAllPosts().pipe(
      map(posts => posts.slice(0, limit))
    );
  }

  /**
   * Search posts by title or description
   */
  searchPosts(query: string): Observable<BlogPost[]> {
    return this.getAllPosts().pipe(
      map(posts => posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }
}