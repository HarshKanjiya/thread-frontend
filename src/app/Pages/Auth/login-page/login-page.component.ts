import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailLoginFormComponent } from './email-login-form/email-login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { Router } from '@angular/router';
import { UserStateService } from '../../../Services/state/user-state.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, EmailLoginFormComponent, LoginFormComponent, ForgotPasswordFormComponent, OtpVerifyComponent],
  templateUrl: './login-page.component.html',
  // animations: [
  //   trigger("body", [
  //     transition(":enter", [
  //       sequence([
  //         style({ opacity: 0 }),
  //         animate(
  //           "200ms  ease-in-out",
  //           style({ opacity: 1, })
  //         )
  //       ])
  //     ]),
  //     transition(":leave", [
  //       sequence([
  //         style({ opacity: 1, }),
  //         animate(
  //           "200ms  ease-in-out",
  //           style({ opacity: 0, })
  //         )
  //       ])
  //     ])
  //   ])
  // ]
})
export class LoginPageComponent {


  currentForm: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY" = "LOGIN"

  onFormChange(form: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY") {
    this.currentForm = form
  }


  constructor(private router: Router, private userState: UserStateService, private cookie: CookieService, private store: Store<any>) {

    if (this.cookie.get('RefreshToken') && this.cookie.get('UserName')) {
      router.navigate(["/"]);
    } {
    }

    store.select("User").subscribe((res: any) => {
      if (res?.temp?.otpSent === true) {
        this.currentForm = "EMAIL_LOGIN_VERIFY"
      }
    })


  }
}
