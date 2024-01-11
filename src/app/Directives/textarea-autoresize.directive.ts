import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textareaAutoresize]',
  standalone: true
})
export class TextareaAutoresizeDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener(':input')
  onInput() {
    this.resize();

  }

  resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
  }
}
