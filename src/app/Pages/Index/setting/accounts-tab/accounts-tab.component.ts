import { trigger, transition, sequence, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-tab',
  standalone: true,
  imports: [],
  templateUrl: './accounts-tab.component.html',
  animations: [
    trigger("childData", [
      transition(":enter", [
        sequence([
          style({ opacity: 0, }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 1, })
          )
        ])
      ]),
      transition(":leave", [
        sequence([
          style({ opacity: 1, }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 0, })
          )
        ])
      ])
    ])
  ]

})
export class AccountsTabComponent {

  openChildData: string | null = ""


  setOpenChildData(val: string) {
    if (this.openChildData !== val) {
      this.openChildData = val
    } else {
      this.openChildData = null;
    }
  }
}
