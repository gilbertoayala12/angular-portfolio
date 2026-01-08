import { Component } from '@angular/core';
import { RouteAnimationDirective } from '../../shared/directives/route-animation.directive';

@Component({
  selector: 'app-home',
  imports: [RouteAnimationDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
