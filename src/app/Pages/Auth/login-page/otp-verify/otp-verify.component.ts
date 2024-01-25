import { Component, EventEmitter, Output } from '@angular/core';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { NgOtpInputModule, NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { map, take, timer } from 'rxjs';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [NgOtpInputModule],
  templateUrl: './otp-verify.component.html',
})
export class OtpVerifyComponent {

  otp: string = ""
  email: any = ""
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  secondsLeft: number = 0
  secondsTimer: any
  allowResendOtp: boolean = false

  constructor(public UserState: UserStateService) {
    this.email = this.UserState.temp()
  }

  ngOnInit() {
    this.timer();
  }

  timer() {
    this.secondsLeft = 60
    this.secondsTimer = setInterval(() => {
      if (this.secondsLeft <= 0) {
        clearInterval(this.secondsTimer)
      }
      this.secondsLeft--
    }, 1000)
  }

  // timer() {

  //   let seconds: number = 60;
  //   let textSec: any = "0";
  //   let statSec: number = 60;

  //   const timer = setInterval(() => {
  //     seconds--;
  //     if (statSec != 0) statSec--;
  //     else statSec = 59;

  //     if (statSec < 10) {
  //       textSec = "0" + statSec;
  //     } else textSec = statSec;

  //     this.secondsLeft = textSec

  //     if (seconds == 0) {
  //       this.allowResendOtp = true
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }



  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY">()

  onFormChange(type: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY") {
    this.formChange.emit(type)
  }

  onOtpChange(e: any) {
    console.log('e :>> ', e);
    this.otp = e
  }
}
