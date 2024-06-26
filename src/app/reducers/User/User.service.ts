import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { CheckUserNameAPI, GetMyNotifAPI, GetSessionDataAPI, GetUserPRofileAPI, LogOutAPI, LoginAPI, RegisterAPI, SendOtpAPI, UpdatePasswordAPI, UpdateProfileAPI, VerifyOtpAPI } from '../../Utils/Endpoints';
import { SET_USER_DATA, SET_USER_LOADING, SET_USER_NOTIF, SET_USER_OTHER_USER, SET_USER_TEMP } from './UserActions';
import { ICheckValidUsername, ILoginUser, ISendMeOtp, ISignupUser, IUserInitialState, IVerifyMyOtp } from './UserTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private store: Store<IUserInitialState>, private toast: ToastService, private router: Router) { }


  getMySession() {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {
      this.http.get(GetSessionDataAPI).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))
        console.log('res :>> ', res);
        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          return true
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          return false
        }
      })
      return false
    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      this.toast.makeToast('ERROR', "Something went Wrong")
      return false
    }
  }
  loginUser(data: ILoginUser) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {
      this.http.post(LoginAPI, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))
        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          if (res.Data.Role === "ADMIN") {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/'])
          }
          this.toast.makeToast("MESSAGE", res.Message ?? "User Logged in")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast("MESSAGE", res.Message ?? "failed to login")
        }
      })
    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  checkUserNameAvaibility(data: ICheckValidUsername): boolean {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.get(CheckUserNameAPI + data.UserName).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.store.dispatch(SET_USER_TEMP({ UserNameAvailable: true, UserName: data.UserName }))
          return true
        } else {
          this.store.dispatch(SET_USER_TEMP({ UserNameAvailable: false, UserName: null }))
          return false
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in Username Look up :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
      return false

    }
    return false
  }
  registerUser(data: ISignupUser) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post(RegisterAPI, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          this.router.navigate(["/"])
          this.toast.makeToast('MESSAGE', res.Message ?? "Account created Successfully")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast('ERROR', res.Message ?? "Account creation Failed")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in Signup :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  sendMeOtp(data: ISendMeOtp) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post(SendOtpAPI, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.store.dispatch(SET_USER_TEMP({ otpSent: true, Email: data.Email }))
          this.toast.makeToast("MESSAGE", res.Message ?? "Otp sent")
          return true
        } else {
          this.store.dispatch(SET_USER_TEMP({ otpSent: false }))
          this.toast.makeToast("MESSAGE", res.Message ?? "Couldn't send OTP")
          return false
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      this.store.dispatch(SET_USER_TEMP({ otpSent: false }))
      console.log('Error in sending OTP :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  VerifyMyOtp(data: IVerifyMyOtp) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.post(VerifyOtpAPI, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))
        console.log('res :>> ', res);
        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: res.Data }))
          this.router.navigate(['/'])
          this.toast.makeToast('MESSAGE', res.Message ?? "Logged in Successfully")
        } else {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.toast.makeToast('ERROR', res.Message ?? "Logged in Failed")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in Verification of OTP :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  signOut() {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.get(LogOutAPI).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.router.navigate(['/login'])
          this.toast.makeToast('MESSAGE', res.Message ?? "Logged out")
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Try again")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in log out :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  updateProfile(data: any) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.put(UpdateProfileAPI + data.UserId, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.store.dispatch(SET_USER_DATA({ data: null }))
          this.getMySession()
          this.toast.makeToast('MESSAGE', res.Message ?? "Profile Updated")
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Failed to update Profile")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in profile update :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  updatePassword(data: any) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {

      this.http.put(UpdatePasswordAPI + data.UserId, data).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))

        if (res.Success) {
          this.getMySession()
          this.toast.makeToast('MESSAGE', res.Message ?? "Password Updated")
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Failed to update Password")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in profile update :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  FollowUser() { }
  MuteUser() { }
  BlockUser() { }

  getMyNotification(UserId: String, Type: "FOLLOW" | "REPLY" | "LIKE" | "MENTION" | "ALL" | "REPOST", page: number = 1) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {
      this.http.get(GetMyNotifAPI + UserId + '/' + Type).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))
        if (res.Success) {
          this.store.dispatch(SET_USER_NOTIF({ notifs: res.Data }))
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Something went wrong")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in fetching Notifications :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getOtherUsersData(MyId: string, userName: string) {
    this.store.dispatch(SET_USER_LOADING({ loading: true }))
    try {
      this.http.get(GetUserPRofileAPI + MyId + '/' + userName).subscribe((res: any) => {
        this.store.dispatch(SET_USER_LOADING({ loading: false }))
        console.log('res :>> ', res);
        if (res.Success) {
          this.store.dispatch(SET_USER_OTHER_USER({ data: res.Data }))
        } else {
          this.toast.makeToast('ERROR', res.Message ?? "Something went wrong")
        }
      })

    } catch (e: any) {
      this.store.dispatch(SET_USER_LOADING({ loading: false }))
      console.log('Error in fetching Notifications :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  MarkAsDoneNotif() { }
  deleteNotif() { }


}
