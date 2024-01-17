import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailLoginFormComponent } from './email-login-form/email-login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, EmailLoginFormComponent, LoginFormComponent, ForgotPasswordFormComponent],
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


  currentForm: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" = "LOGIN"

  onFormChange(form: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN") {
    this.currentForm = form
  }


}
