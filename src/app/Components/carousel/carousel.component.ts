import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input } from '@angular/core';


import { animate, animation, style } from "@angular/animations";

// =========================
// Enum for referencing animations
// =========================

// =========================
// Scale
// =========================
export const In = animation([
  style({ opacity: 0, transform: "scale(0.5)" }), // start state
  animate(
    "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    style({ opacity: 1, transform: "scale(1)" })
  )
]);

export const Out = animation([
  animate(
    "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    style({ opacity: 0, transform: "scale(0.5)" })
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
      transition("void => scale", [
        useAnimation(In, { params: { time: "500ms" } })
      ]),
      transition("scale => void", [
        useAnimation(Out, { params: { time: "500ms" } })
      ]),
    ])
  ]
})
export class CarouselComponent {
  @Input() slides: any[] = [];

  currentSlide = 0;

  onPreviousClick() {
    if(this.currentSlide > 0){
      this.currentSlide--;
    }
    // const previous = this.currentSlide - 1;
    // this.currentSlide = previous < 0 ? this.slides.length : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    if(this.currentSlide < this.slides.length - 1){
      this.currentSlide++;
    }
    // const next = this.currentSlide + 1;
    // this.currentSlide = next === this.slides.length - 1 ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  ngOnInit() {
    this.preloadImages(); // for the demo
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }
}
