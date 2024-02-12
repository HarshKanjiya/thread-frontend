import { Injectable, signal } from '@angular/core';
import { ILoginUser, ISendMeOtp } from '../../reducers/User/UserTypes';
import { ToastService } from '../toast.service';
import { HttpService } from '../http-service.service';
import { GetFeedAPI, GetPostsOfSignleUserAPI, GetSessionDataAPI, LogOutAPI, LoginAPI, RegisterAPI } from '../../Utils/Endpoints';
import { Router } from '@angular/router';

// export interface IResponse{
//   Success: boolean
//   Message : string
//   Data ?: Object
// }

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private toast: ToastService, private http: HttpService, private router: Router) { }

  loading = signal<boolean>(false)
  success = signal<boolean>(false)
  UserData = signal<any>(null)

  MyFeed = signal<any[]>([])
  MyPosts = signal<any[]>([])
  OthersPosts = signal<any[]>([])

  message = signal<string | null>(null)
  temp = signal<any>(null)


  // auth logic
  getMySession() {
    this.loading.set(true)
    try {
      this.http.get(GetSessionDataAPI).subscribe((res: any) => {
        this.loading.set(false)
        console.log('res :>> ', res);
        if (res.Success) {
          this.UserData.set(res.Data)
          return true
        } else {
          this.UserData.set(null)

          return false
        }
      })
      return false
    } catch (e: any) {
      this.loading.set(false)
      this.toast.makeToast('ERROR', "Something went Wrong")
      return false
    }
  }
  loginUser(data: ILoginUser): boolean {
    this.loading.set(true)
    try {
      this.http.post(LoginAPI, data).subscribe((res: any) => {
        this.loading.set(false)
        if (res.Success) {
          this.UserData.set(res.Data)
          this.router.navigate(['/'])
          this.toast.makeToast("MESSAGE", res.Message ?? "User Logged in")
          return true
        } else {
          this.UserData.set(null)
          this.toast.makeToast("MESSAGE", res.Message ?? "failed to login")
          return false
        }
      })
      return false
    } catch (e: any) {
      this.loading.set(false)
      this.toast.makeToast('ERROR', "Something went Wrong")
      return false
    }
  }
  registerUser(data: ILoginUser) {

    this.loading.set(true)
    try {

      this.http.post(RegisterAPI, data).subscribe((res: any) => {
        this.loading.set(false)
        if (res.Success) {
          this.UserData.set(res.Data)
          this.toast.makeToast('MESSAGE', res.Message ?? "Account created Successfully")
        } else {
          this.UserData.set(null)
          this.toast.makeToast('ERROR', res.Message ?? "Account creation Failed")
        }
      })

    } catch (e: any) {
      this.loading.set(false)

      console.log('Error in Signup :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")

    }

  }
  signOut() {
    this.loading.set(true)
    this.http.get(LogOutAPI).subscribe((res: any) => {
      this.loading.set(false)
      console.log('res :>> ', res);
      if (res.Success === true) {
        this.toast.makeToast("MESSAGE", res.Message)
        this.router.navigate(["/login"])
        this.UserData.set(null)
      }
    })
  }
  sendMeOTP(data: ISendMeOtp) {
    this.loading.set(true)

    try {
      return this.http.post("otp/create", data)

    } catch (e: any) {
      this.loading.set(false)
      this.toast.makeToast('ERROR', "Something went Wrong")
      return null
    }
  }


  getMyFeed() {

    console.log('object :>> ', this.UserData());
    this.loading.set(true);
    try {

      this.http.get(GetFeedAPI + this.UserData()?.UserId).subscribe((res: any) => {
        this.loading.set(false)
        if (res.Success) {
          this.MyFeed.set(res.Data)
        }
      })
    } catch (err: any) {
      this.loading.set(false)
    }
  }
}
