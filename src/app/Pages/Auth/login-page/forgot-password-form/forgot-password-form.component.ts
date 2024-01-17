import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password-form.component.html',
})
export class ForgotPasswordFormComponent {


  id: string = ""
  AllowSubmit: boolean = false

  @Output() formChange = new EventEmitter<"LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN">()

  onFormChange(type: "LOGIN" | "SIGNUP" | "FORGOT_PASS" | "EMAIL_LOGIN") {
    this.formChange.emit(type)
  }

  onTextKeyUp() {
    if (this.id.trim().length > 0) {
      this.AllowSubmit = true
    }
    else {
      this.AllowSubmit = false
    }
  }

}
