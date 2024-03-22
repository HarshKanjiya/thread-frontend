import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { HttpService } from '../../../../Services/http-service.service';
import { getDevicesAPI, removeSessionAPI } from '../../../../Utils/Endpoints';
import { ToastService } from '../../../../Services/toast.service';
import { UserService } from '../../../../reducers/User/User.service';

@Component({
  selector: 'app-setting-tab',
  standalone: true,
  imports: [],
  templateUrl: './security-tab.component.html',
})
export class SecurityTabComponent {

  userData: any = null
  devices: any[] = []

  sessionToRemove: any;

  constructor(private store: Store<any>, private http: HttpService, private toast: ToastService, private userService: UserService) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
      this.devices = [...res.userData.Devices]
    })
  }


  getTime(time: string) {
    return moment(time).format('Do MMM YYYY, h:mm a')
  }

  removeSession(item: any) {
    this.sessionToRemove = item.DeviceId
    this.http.get(removeSessionAPI + item.DeviceId).subscribe((res: any) => {
      this.sessionToRemove = null
      if (res.Success) {
        if (res.Message === "OWN_SESSION_REMOVED") {
          this.userService.signOut()
          this.toast.makeToast("MESSAGE", "Current session Removed.")
        } else {
          this.devices = this.devices.filter((x: any) => (x.DeviceId !== item.DeviceId))
          this.toast.makeToast("MESSAGE", "Session removed")
        }
      }
    })

  }
}
