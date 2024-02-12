import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../../../../reducers/User/User.service';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';

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

  constructor(private store: Store<any>, private userService: UserService) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.loading = res.loading
    })
  }

  loading: boolean = false
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
    var res = this.userService.sendMeOtp({
      Email: this.id
    })
    console.log('res :>> ', res);
  }
}
