import { Component } from '@angular/core';
import { DialogService } from '../../../../Services/dialog.service';
import { CustomPopupComponent } from '../../../../Components/custom-popup/custom-popup.component';
import { ToastService } from '../../../../Services/toast.service';

@Component({
  selector: 'app-privacy-tab',
  standalone: true,
  imports: [CustomPopupComponent],
  templateUrl: './privacy-tab.component.html',
})
export class PrivacyTabComponent {

  isPrivacyButtonChecked: boolean = false
  selectedMentionAccess: 'ALL' | 'FOLLOW' | 'NONE' = "ALL"


  constructor(public dialog: DialogService, private toast: ToastService) { }

  PrivacyProtactionHandler() {
    this.dialog.openDialog("PRIVATE_ACCOUNT")
  }
  MentionClickeHandler() {
    this.dialog.openDialog("MENTION_ACCESS")
  }

  AccountPrivacyConfirmation() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
    this.dialog.closeDialog()
    this.toast.makeToast("MESSAGE", "your Account is now Private")
  }
  MentionConfirmation(val: 'ALL' | 'FOLLOW' | 'NONE') {
    this.selectedMentionAccess = val
  }

}
