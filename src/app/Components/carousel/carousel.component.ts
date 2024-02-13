import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input } from '@angular/core';


import { animate, animation, style } from "@angular/animations";

export const In = animation([
  style({ opacity: 0, transform: "opacity(0)", position:"absolute" }), // start state
  animate(
    "200ms ease-out",
    style({ opacity: 1, transform: "opacity(1)", position:"relative" })
  )
]);

export const Out = animation([
  animate(
    "200ms ease-out",
    style({ opacity: 0, transform: "opacity(0)",position:"absolute" })
  )
]);



@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  animations: [
    trigger("carouselAnimation", [
      /* scale */
      transition(":enter", [
        useAnimation(In, { params: { time: "500ms" } })
      ]),
      transition(":leave", [
        useAnimation(Out, { params: { time: "500ms" } })
      ]),
    ])
  ]
})
export class CarouselComponent {
  @Input() slides: any[] = [];

  currentSlide = 0;

  onPreviousClick() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }

  }

  onNextClick() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }

  }

  ngOnInit() {
    this.preloadImages();
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
