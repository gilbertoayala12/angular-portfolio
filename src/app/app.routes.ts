import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'Home - Gilberto Ayala'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
    title: 'About - Gilberto Ayala'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then(m => m.Projects),
    title: 'Projects - Gilberto Ayala'
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.routes').then(m => m.blogRoutes)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact - Gilberto Ayala'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];