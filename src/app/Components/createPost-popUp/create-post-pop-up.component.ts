import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DialogService } from '../../Services/dialog.service';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-create-post-pop-up',
  standalone: true,
  imports: [CreatePostComponent],
  templateUrl: './create-post-pop-up.component.html',

  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.97)" }),
        animate(

          "150ms ease-in-out",
          style({ opacity: 1, transform: "scale(1)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "scale(1)" }),
        animate(
          "1000ms ease-in-out",
          style({ opacity: 0, transform: "scale(0.97)" })
        )
      ])
    ])
  ]
})
export class CreatePostPopUpComponent {

  constructor(public dialog: DialogService) { }

  allowAddToThread: boolean = true


  closeDialog() {
    this.dialog.dialogVisible.set(false)
  }


  submitThread(event: any) {

    console.log('event :>> ', event);
  }

}
