import { Component } from '@angular/core';
import { DialogService } from '../../Services/dialog.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'custom-popup',
  standalone: true,
  imports: [],
  templateUrl: './custom-popup.component.html',
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
export class CustomPopupComponent {

  constructor(public dialog: DialogService) { }

  allowAddToThread: boolean = true


  closeDialog() {
    this.dialog.closeDialog()
  }


  submitThread(event: any) {

    console.log('event :>> ', event);
  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }
}
