import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { SET_USER_DATA, SET_USER_LOADING } from './UserActions';
import { ICheckValidUsername, ILoginUser, ISendMeOtp, IUserInitialState, IVerifyMyOtp } from './UserTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private store: Store<IUserInitialState>, private toast: ToastService) { }


  loginUser(data: ILoginUser) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post("auth/login", data).subscribe((res: any) => {

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          this.toast.makeToast('MESSAGE', res.Message ?? "Logged in Successfully")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast('ERROR', res.Message ?? "Logged in Failed")
        }
      })

    } catch (e: any) {
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
    finally {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
    }
  }
  checkUserNameAvaibility(data: ICheckValidUsername) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post("auth/username", data).subscribe((res: any) => {

        if (res.Success) {
          return true
        } else {
          return false
        }
      })

    } catch (e: any) {
      console.log('Error in Username Look up :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
    finally {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
    }
  }
  registerUser(data: ILoginUser) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post("auth/register", data).subscribe((res: any) => {

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          this.toast.makeToast('MESSAGE', res.Message ?? "Account created Successfully")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast('ERROR', res.Message ?? "Account creation Failed")
        }
      })

    } catch (e: any) {
      console.log('Error in Signup :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
    finally {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
    }
  }
  sendMeOtp(data: ISendMeOtp) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post("otp/create", data).subscribe((res: any) => {

        if (res.Success) {
          this.toast.makeToast("MESSAGE", res.Message ?? "Otp sent")
        } else {
          this.toast.makeToast("MESSAGE", res.Message ?? "Couldn't send OTP")
        }
      })

    } catch (e: any) {
      console.log('Error in sending OTP :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
    finally {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
    }
  }
  VerifyMyOtp(data: IVerifyMyOtp) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post("otp/verify", data).subscribe((res: any) => {

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          this.toast.makeToast('MESSAGE', res.Message ?? "Logged in Successfully")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast('ERROR', res.Message ?? "Logged in Failed")
        }
      })

    } catch (e: any) {
      console.log('Error in Verification of OTP :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }
    finally {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
    }
  }

}
