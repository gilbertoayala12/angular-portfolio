import { Component, ElementRef, viewChildren, signal, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.scss',
})
export class NavHeader {
  private doc = inject(DOCUMENT);

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  navLinkElements = viewChildren<ElementRef>('navLink');
  mobileMenuOpen = signal(false);
  scrolled = signal(false);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.closeMobileMenu());
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
      // Return focus to the hamburger button
      (this.doc.querySelector('.mobile-menu-button') as HTMLElement)?.focus();
    }
  }

  toggleMobileMenu() {
    const opening = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(opening);
    this.doc.body.style.overflow = opening ? 'hidden' : '';
    if (opening) {
      setTimeout(() => {
        (this.doc.querySelector('.mobile-nav-link') as HTMLElement)?.focus();
      }, 50);
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    this.doc.body.style.overflow = '';
  }
}