import { trigger, transition, sequence, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';
import { PhoneFormatPipe } from '../../../../Directives/phone-fomrat.directive';

@Component({
  selector: 'app-accounts-tab',
  standalone: true,
  imports: [PhoneFormatPipe],
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
    ]),
    trigger("popin", [
      transition(":enter", [
        sequence([
          style({ opacity: 0, transform: "translateY(-20px)" }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 1, transform: "translateY(0px)" })
          )
        ])
      ]),
      transition(":leave", [
        sequence([
          style({ opacity: 1, transform: "translateY(0px)" }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 0, transform: "translateY(-20px)" })
          )
        ])
      ])
    ]),
  ]

})
export class AccountsTabComponent {


  userData: any = null

  openChildData: string | null = ""

  constructor(private store: Store<any>) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.userData = res.userData
    })
  }

  setOpenChildData(val: string) {
    if (this.openChildData !== val) {
      this.openChildData = val
    } else {
      this.openChildData = null;
    }
  }
}
