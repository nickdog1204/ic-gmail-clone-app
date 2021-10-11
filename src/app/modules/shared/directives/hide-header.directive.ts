import {Directive, HostListener, Input, Renderer2} from '@angular/core';
import {DomController} from "@ionic/angular";

export type Direction = 'UP' | 'DOWN'

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader')
  searchOverlay: any;

  direction: Direction = 'DOWN';

  saveY = 0;
  previousY = 0;
  readonly scrollDistance = 50;

  constructor(
    private renderer: Renderer2,
    private domController: DomController
  ) {
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    if ($event.detail.currentY <= 0 || $event.detail.currentY === this.saveY) {
      return;
    }


    const currentY: number = $event.detail.currentY;
    const scrollTop: number = $event.detail.scrollTop;

    let newDirection: Direction = 'DOWN';
    let newPosition = -scrollTop + this.previousY;
    // console.log(`currentY:${currentY}, scrollTop:${scrollTop}`)
    if (this.saveY > $event.detail.currentY) {
      newDirection = 'UP';
      newPosition -= this.scrollDistance;
    }
    if (newPosition < -this.scrollDistance) {
      newPosition = -this.scrollDistance
    }

    const newOpacity = 1 - (newPosition / -this.scrollDistance)

    this.domController.write(() => {
      this.renderer.setStyle(this.searchOverlay, 'top', Math.min(0, newPosition) + 'px');
      this.renderer.setStyle(this.searchOverlay, 'opacity', newOpacity);
    });

    this.saveY = $event.detail.currentY;
    if (this.direction !== newDirection) {
      this.direction = newDirection;
      this.previousY = scrollTop;
    }

  }

}
