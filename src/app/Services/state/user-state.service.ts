import { Injectable, signal } from '@angular/core';
import { ILoginUser, ISendMeOtp } from '../../reducers/User/UserTypes';
import { ToastService } from '../toast.service';
import { HttpService } from '../http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private toast: ToastService, private http: HttpService) { }

  loading = signal<boolean>(false)
  success = signal<boolean>(false)
  UserData = signal<Object | null>(null)
  message = signal<string | null>(null)
  temp = signal<any>(null)


  loginUser(data: ILoginUser): boolean {
    this.loading.set(true)
    try {
      this.http.post("auth/login", data).subscribe((res: any) => {
        this.loading.set(false)
        if (res.success) {
          this.UserData.set(res.data)
          this.toast.makeToast("MESSAGE", res.message ?? "")
          return true
        } else {
          this.UserData.set(null)
          this.toast.makeToast("MESSAGE", res.message ?? "")
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


  registerUser(data: ILoginUser) {

    this.loading.set(true)
    try {

      this.http.post("auth/register", data).subscribe((res: any) => {


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

}
