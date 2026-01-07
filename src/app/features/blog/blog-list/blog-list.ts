import { Component } from '@angular/core';
import { RouteAnimationDirective } from '../../../shared/directives/route-animation.directive';
import { BlogPost } from "../blog-post/blog-post";

@Component({
  selector: 'app-blog-list',
  imports: [RouteAnimationDirective, BlogPost],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogList {

}
