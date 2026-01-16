import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.scss',
})
export class NavHeader {
  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];
}
