import { Component, Input } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'image-loader',
  standalone: true,
  templateUrl: './image-loader.component.html',
  imports: [LoaderComponent]
})
export class ImageLoaderComponent {
  @Input() src: string = ""
  @Input() class: string = ""
  @Input() alt: string = ""

  loading: boolean = true
  afterImgLoad() {
    this.loading = false
  }
}
