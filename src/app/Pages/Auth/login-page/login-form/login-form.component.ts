import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../reducers/User/User.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {

  id: string = ""
  password: string = ""
  AllowSubmit: boolean = false
  loading = signal<boolean>(false)
  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN">()

  // idSignal = signal<{ email?: string, password?: string }>({})

  constructor(private UserService: UserService, private store: Store<any>) {

    console.log('loading :>> 1', this.loading);
    // store.select(state => state.).subscribe((res: any) => {
    //   console.log('res :>> ', res);
    //   this.loading = res
    // })

    this.store.select("User").subscribe((res: any) => {
      this.loading.set(res.success)
    })


    console.log('loading :>> ', this.loading);

  }


  onFormChange(type: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN") {
    this.formChange.emit(type)
  }

  onTextKeyUp() {
    if (this.id.trim().length > 0 && this.password.trim().length > 0) {
      this.AllowSubmit = true
    }
    else {
      this.AllowSubmit = false
    }
  }

  submit() {
    this.UserService.loginUser({
      uniqueId: this.id, password: this.password
    })
  }
}
