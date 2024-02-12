import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStateService } from '../../../../Services/state/user-state.service';

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
  passwordVisiblity: boolean = false

  loading: boolean = false

  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN">()


  constructor(public UserState: UserStateService, private store: Store<any>) {
    this.store.select("User").subscribe((res: any) => {
      this.loading = res.loading
    })
  }

  setPasswordVisiblity() { this.passwordVisiblity = !this.passwordVisiblity }


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
    this.UserState.loginUser({
      UniqueId: this.id, Password: this.password
    })
  }
}
