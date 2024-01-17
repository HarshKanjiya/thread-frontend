import { Injectable, signal } from '@angular/core';
import { HttpService } from '../../../Services/http-service.service';
import { ToastService } from '../../../Services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpService, private toast: ToastService) { }

  loading = signal<boolean>(false)
  UserData = signal<any>(false)


  async loginUser(data: { id: string, password: string }) {
    this.loading.set(true)
    try {
      let res: any = this.http.put("/user/login", data)

      console.log('res :>> ', res);

      this.toast.makeToast('MESSAGE', res.message)
      this.loading.set(false)

      if (res.success) {
        this.UserData.set(res.userData)
        return true
      } else {
        return false
      }
    }
    catch (err: any) {
      this.loading.set(false)

      this.toast.makeToast('ERROR', err.message)
      console.log(err.message)
      return false
    }

  }

  async SignUpUser(data: { id: string, password: string, username: string, phone: number, age: string, gender: string }) {
    // this.loading.set(true)
    // try {
    //   let res: any = this.http.put("/user/login", data)
    //   console.log('res :>> ', res);

    //   // this.message.set(res.message)

    //   this.toast.makeToast('MESSAGE', res.message)

    //   if (res.success) {
    //     this.UserData.set(res.userData)
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    // catch (err: any) {
    //   this.toast.makeToast('ERROR', err.message)
    //   console.log(err.message)
    //   return false
    // }
    // finally {
    //   this.loading.set(false)
    // }
  }




}
