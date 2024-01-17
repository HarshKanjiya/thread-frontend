import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

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

  idSignal = signal<{ email?: string, password?: string }>({})

  constructor(public auth: AuthServiceService) { }

  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN">()

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
    this.auth.loginUser({ id: this.id, password: this.password }).then(() => {

    })
  }

}
