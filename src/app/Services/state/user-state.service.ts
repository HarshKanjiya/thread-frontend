import { Injectable, signal } from '@angular/core';
import { ILoginUser, ISendMeOtp } from '../../reducers/User/UserTypes';
import { ToastService } from '../toast.service';
import { HttpService } from '../http-service.service';
import { GetSessionDataAPI, LoginAPI, RegisterAPI } from '../../Utils/Endpoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private toast: ToastService, private http: HttpService,private router:Router) { }

  loading = signal<boolean>(false)
  success = signal<boolean>(false)
  UserData = signal<Object | null>(null)
  message = signal<string | null>(null)
  temp = signal<any>(null)

  isuserLoggedin(){
    if(this.UserData() !== null){
      return true;
    }else{
      console.log('userda :>> ', this.UserData());
      return false
    }
  }

  getMySession(){
    this.loading.set(true)
    try {
      this.http.get(GetSessionDataAPI).subscribe((res: any) => {
        this.loading.set(false)
        if (res.success) {
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
        if (res.success) {
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
}
