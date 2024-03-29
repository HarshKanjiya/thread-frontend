import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgOtpInputConfig, NgOtpInputModule } from 'ng-otp-input';
import { UserService } from '../../../../reducers/User/User.service';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [NgOtpInputModule],
  templateUrl: './otp-verify.component.html',
})
export class OtpVerifyComponent {

  otp: string = ""
  email: any = ""

  loading: boolean = false

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

  constructor(private store: Store<any>, private userService: UserService) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.email = res.temp?.Email
      this.loading = res.loading
    })
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


  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY">()

  onFormChange(type: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN" | "EMAIL_LOGIN_VERIFY") {
    this.formChange.emit(type)
  }

  onOtpChange(e: any) {
    this.otp = e
  }

  submit() {
    this.userService.VerifyMyOtp({
      Email: this.email,
      Otp: this.otp
    })
  }
}
