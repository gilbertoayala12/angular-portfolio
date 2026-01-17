import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        document.body.scrollTop = 0; // Works for Safari
        document.documentElement.scrollTop = 0; // Works for Chrome, Firefox, IE and Opera
      });
  }
}