import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() type: "FULL" | string = "FULL";

  classes: string = ""

  ngOnInit() {
    if (this.type === "FULL") {
      this.classes = "p-6 sm:py-12 w-full h-full"
    } else {
      this.classes = this.type
    }
  }
}
