import { Component } from '@angular/core';
import { RouteAnimationDirective } from '../../shared/directives/route-animation.directive';

@Component({
  selector: 'app-about',
  imports: [RouteAnimationDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
