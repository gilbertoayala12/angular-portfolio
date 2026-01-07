import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list/blog-list').then(m => m.BlogList),
    title: 'Blog - Gilberto Ayala'
  },
  {
    path: ':slug',
    loadComponent: () => import('./blog-post/blog-post').then(m => m.BlogPost),
    title: 'Blog Post - Gilberto Ayala'
  }
];