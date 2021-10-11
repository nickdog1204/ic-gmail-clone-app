import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {IMail} from '../../../../common/models/mail';
import {Animation, AnimationController, DomController, Gesture, GestureController, IonItem} from '@ionic/angular';
import {Haptics, ImpactStyle} from "@capacitor/haptics";

const ANIMATION_BREAKPOINT = 70;

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwipeItemComponent implements OnInit, AfterViewInit {
  @Input()
  mail: IMail;

  @ViewChild(IonItem, {read: ElementRef}) itemElementRef: ElementRef;
  @ViewChild('trash', {read: ElementRef}) trashElementRef: ElementRef;
  @ViewChild('archive', {read: ElementRef}) archiveElementRef: ElementRef;
  @ViewChild('wrapper') wrapperElementRef: ElementRef;

  bigIcon = false;
  private trashAnimation: Animation;
  private archiveAnimation: Animation;
  private deleteAnimation: Animation;

  constructor(
    private gestureController: GestureController,
    private animationController: AnimationController,
    private renderer: Renderer2,
    private domController: DomController,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.setUpGestures();
    this.setUpIconAnimations();
    this.deleteAnimation = this.animationController.create('delete-animation')
      .addElement(this.elementRef.nativeElement)
      .duration(300)
      .easing('ease-out')
      .fromTo('height', '89px', '0');
  }

  private setUpGestures() {
    const windowWidth = window.innerWidth;
    const gesture: Gesture = this.gestureController.create({
      el: this.itemElementRef.nativeElement,
      gestureName: 'item-move',
      threshold: 0,
      onStart: ev => {
        this.domController.write(() => {
          this.renderer.setStyle(this.itemElementRef.nativeElement, 'transition', '');
          this.renderer.addClass(this.itemElementRef.nativeElement, 'rounded');
        });

      },
      onMove: ev => {
        const deltaX = ev.deltaX;
        this.domController.write(() => {
          this.renderer
            .setStyle(this.itemElementRef.nativeElement, 'transform', `translateX(${ev.deltaX}px)`);
        });

        if (deltaX > 0) {
          this.domController.write(() => {
            this.renderer
              .setStyle(this.wrapperElementRef.nativeElement, 'background', 'var(--ion-color-primary)');
          });

        } else if (deltaX < 0) {
          this.domController.write(() => {
            this.renderer
              .setStyle(this.wrapperElementRef.nativeElement, 'background', 'green');
          });

        }

        if (deltaX > ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateTrash(true);
        } else if (deltaX > 0 && deltaX < ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateTrash(false);
        }

        if (deltaX < -ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateArchive(true);
        } else if (deltaX < 0 && deltaX > -ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateArchive(false);
        }


      },
      onEnd: ev => {
        this.domController.write(() => {
          this.renderer
            .setStyle(this.itemElementRef.nativeElement, 'transition', 'transform 0.3s ease-in');
          this.renderer.removeClass(this.itemElementRef.nativeElement, 'rounded');
          if (ev.deltaX > ANIMATION_BREAKPOINT) {
            this.renderer
              .setStyle(this.itemElementRef.nativeElement, 'transform', `translateX(${windowWidth}px)`);

            this.deleteAnimation.play();

          } else if (ev.deltaX < -ANIMATION_BREAKPOINT) {
            this.renderer
              .setStyle(this.itemElementRef.nativeElement, 'transform', `-translateX(${windowWidth}px)`);
            this.deleteAnimation.play();

          } else {
            this.renderer
              .setStyle(this.itemElementRef.nativeElement, 'transform', '');

          }
        });

      }
    }, true);
    gesture.enable();
  }

  private setUpIconAnimations() {
    this.trashAnimation = this.animationController.create('trash-animation')
      .addElement(this.trashElementRef.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)');
    this.archiveAnimation = this.animationController.create('archive-animation')
      .addElement(this.archiveElementRef.nativeElement)
      .duration(300)
      .easing('ease-in')
      .fromTo('transform', 'scale(1)', 'scale(1.5)');

  }

  private animateTrash(zoomIn) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.trashAnimation.direction('alternate').play();
    } else {
      this.trashAnimation.direction('reverse').play();
    }
    Haptics.impact({style: ImpactStyle.Light});

  }

  private animateArchive(zoomIn) {
    this.bigIcon = zoomIn;
    if (zoomIn) {
      this.archiveAnimation.direction('alternate').play();
    } else {
      this.archiveAnimation.direction('reverse').play();
    }
    Haptics.impact({style: ImpactStyle.Light});

  }

}
