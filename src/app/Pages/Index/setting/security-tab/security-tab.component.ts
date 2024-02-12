import { Component, Signal, computed } from '@angular/core';
import { UserStateService } from '../../../../Services/state/user-state.service';
import moment from 'moment';

@Component({
  selector: 'app-setting-tab',
  standalone: true,
  imports: [],
  templateUrl: './security-tab.component.html',
})
export class SecurityTabComponent {


  Devices: Signal<any> = computed(() => {
    return this.UserState.UserData()?.Devices.reverse()
  })

  userData: Signal<any> = computed(() => {
    return this.UserState.UserData()
  })
  constructor(private UserState: UserStateService) { }


  getTime(time: string) {
    // return moment(new Date(time)).fromNow();
    return moment(time).format('Do MMM YYYY, h:mm a')
  }
}
