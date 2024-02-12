import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';

@Component({
  selector: 'app-setting-tab',
  standalone: true,
  imports: [],
  templateUrl: './security-tab.component.html',
})
export class SecurityTabComponent {

  userData: any = null

  constructor(private store: Store<any>) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
    })
  }


  getTime(time: string) {
    // return moment(new Date(time)).fromNow();
    return moment(time).format('Do MMM YYYY, h:mm a')
  }
}
