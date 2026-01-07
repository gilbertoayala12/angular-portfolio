import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteTransitionService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  // Fade transition
  animateFade(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0 },
        { opacity: 1 }
      ],
      {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }

  // Slide up transition (Apple-style)
  animateSlideUp(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }

  // Scale transition (most Apple-like)
  animateScale(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      {
        duration: 450,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }

  // Slide from right (for forward navigation)
  animateSlideFromRight(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, transform: 'translateX(30px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }

  // Slide from left
  animateSlideFromLeft(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, transform: 'translateX(-30px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ],
      {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }

  // Zoom in
  animateZoomIn(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy easing
        fill: 'forwards'
      }
    );
  }

  // Blur in (sophisticated effect)
  animateBlurIn(element: HTMLElement): Animation {
    return element.animate(
      [
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)' }
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      }
    );
  }
}