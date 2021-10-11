import {AfterViewInit, Directive, HostListener, Input, OnInit} from '@angular/core';
import {Animation, AnimationController} from "@ionic/angular";

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective implements AfterViewInit {
  @Input('appAnimatedFab')
  fabBtn: any;
  expanded = true;
  shrinkAnimation: Animation;

  constructor(
    private animationController: AnimationController
  ) {
  }


  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const deltaY = $event.detail.deltaY;
    if (deltaY > 0 && this.expanded) {
      // "scroll up", or "page down"
      this.expanded = false;
      this.shrinkFab();
    } else if (deltaY < 0 && !this.expanded) {
      this.expanded = true;
      this.expandFab();

    }
  }


  setUpAnimations() {
    const textSpanEl = (this.fabBtn.el as HTMLElement).querySelector('span');

    const shrink = this.animationController.create('shrink')
      .addElement(this.fabBtn.el)
      .duration(400)
      .fromTo('width', '140px', '50px');

    const spanFadeAndShrinkAnimation = this.animationController.create('span-fade-and-shrink')
      .addElement(textSpanEl)
      .duration(300)
      .fromTo('opacity', 1, 0)
      .fromTo('width', '70px', '0px')
      // .afterStyles({
      //   display: 'none'
      // })
      // .afterClearStyles(['display', 'width'])

    this.shrinkAnimation = this.animationController.create('shrink-animation-group')
      .duration(400)
      .easing('ease-in')
      .addAnimation([shrink, spanFadeAndShrinkAnimation]);

  }

  shrinkFab() {
    this.shrinkAnimation.stop();
    this.shrinkAnimation.direction('normal');
    this.shrinkAnimation.play();

  }

  expandFab() {
    this.shrinkAnimation.stop();
    this.shrinkAnimation.direction('reverse');
    this.shrinkAnimation.play();

  }

  ngAfterViewInit(): void {
    this.setUpAnimations();
  }


}
