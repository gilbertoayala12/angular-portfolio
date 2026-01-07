import { Directive, ElementRef, inject, OnInit, input } from '@angular/core';
import { RouteTransitionService } from '../../core/services/route-transition.service';

export type AnimationType =
    | 'fade'
    | 'slideUp'
    | 'scale'
    | 'slideRight'
    | 'slideLeft'
    | 'zoomIn'
    | 'blurIn'
    | 'none';

@Directive({
    selector: '[appRouteAnimation]',
    standalone: true
})
export class RouteAnimationDirective implements OnInit {
    private el = inject(ElementRef);
    private transitionService = inject(RouteTransitionService);

    // Input to specify animation type (default is 'scale')
    appRouteAnimation = input<AnimationType>('scale');

    ngOnInit(): void {
        const animationType = this.appRouteAnimation();
        const element = this.el.nativeElement;

        switch (animationType) {
            case 'fade':
                this.transitionService.animateFade(element);
                break;
            case 'slideUp':
                this.transitionService.animateSlideUp(element);
                break;
            case 'scale':
                this.transitionService.animateScale(element);
                break;
            case 'slideRight':
                this.transitionService.animateSlideFromRight(element);
                break;
            case 'slideLeft':
                this.transitionService.animateSlideFromLeft(element);
                break;
            case 'zoomIn':
                this.transitionService.animateZoomIn(element);
                break;
            case 'blurIn':
                this.transitionService.animateBlurIn(element);
                break;
            case 'none':
                // No animation
                break;
            default:
                this.transitionService.animateScale(element);
        }
    }
}