import { Component } from '@angular/core';
import { DialogService } from '../../../../Services/dialog.service';
import { CustomPopupComponent } from '../../../../Components/custom-popup/custom-popup.component';
import { ToastService } from '../../../../Services/toast.service';
import { Store } from '@ngrx/store';
import { UserService } from '../../../../reducers/User/User.service';
import { UpdateProfileAPI } from '../../../../Utils/Endpoints';
import { HttpService } from '../../../../Services/http-service.service';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';

@Component({
  selector: 'app-privacy-tab',
  standalone: true,
  imports: [CustomPopupComponent],
  templateUrl: './privacy-tab.component.html',
})
export class PrivacyTabComponent {

  isPrivacyButtonChecked: boolean = false
  loading: boolean = false
  selectedMentionAccess: 'ALL' | 'FOLLOW' | 'NONE' = "ALL"

  userData: any = null


  constructor(public dialog: DialogService, private toast: ToastService, private store: Store<any>, private userService: UserService, private http: HttpService) { }

  ngOnInit() {
    this.store.select("User").subscribe((res: IUserInitialState) => {
      if (res.userData) {
        this.userData = res.userData
        this.isPrivacyButtonChecked = res.userData.Private
      }
    })
  }

  PrivacyProtactionHandler() {
    this.dialog.openDialog("PRIVATE_ACCOUNT")
  }
  MentionClickeHandler() {
    this.dialog.openDialog("MENTION_ACCESS")
  }

  AccountPrivacyConfirmation() {
    this.dialog.closeDialog()
    this.loading = true
    try {

      this.http.put(UpdateProfileAPI + this.userData.UserId, { Private: !this.isPrivacyButtonChecked }).subscribe((res: any) => {
        this.loading = true

        if (res.Success) {
          this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
          this.userService.getMySession()
          this.toast.makeToast('MESSAGE', res.Message ?? "Profile Updated")
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Failed to update Profile")
        }
      })

    } catch (e: any) {
      this.loading = false
      console.log('Error in profile update :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
  }
  MentionConfirmation(val: 'ALL' | 'FOLLOW' | 'NONE') {
    this.selectedMentionAccess = val
  }

}
