import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { ToastService } from '../../../../Services/toast.service';

@Component({
  selector: 'app-email-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email-login-form.component.html',
  animations: [
    trigger("errorMsg", [
      transition(":enter", [
        sequence([
          style({ opacity: 0 }),
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
export class EmailLoginFormComponent {

  constructor(public UserState: UserStateService, private toast: ToastService) { }

  id: string = ""
  disableButton: boolean = true
  typingTimeout: any;
  sawErrorMessage: boolean = false


  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY">()

  onFormChange(type: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY") {
    this.formChange.emit(type)
  }
  onTextKeyUp() {
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.id) && this.id.trim().length > 0) {
        this.sawErrorMessage = true
        this.disableButton = true
      } else {
        this.sawErrorMessage = false
        this.disableButton = false
      }
    }, 500);
  }

  submit() {
    this.UserState.sendMeOTP({ email: this.id })?.subscribe((res: any) => {
      this.UserState.loading.set(false)
      if (res.Success) {
        this.toast.makeToast("MESSAGE", res.Message ?? "")
        this.UserState.temp.set(this.id)
        this.formChange.emit("EMAIL_LOGIN_VERIFY")
      } else {
        this.toast.makeToast("MESSAGE", res.Message ?? "")
      }
    })
  }
}
