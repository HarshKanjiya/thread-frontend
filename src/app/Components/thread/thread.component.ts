import { Component, Input } from '@angular/core';
// import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {
  @Input() ThreadData : any
  @Input() UserData : any

  ngAfterViewInit(){
    console.log('object :>> ', this.ThreadData,this.UserData);
  }
}
