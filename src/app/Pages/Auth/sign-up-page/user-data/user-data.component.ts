import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './user-data.component.html',
  animations: [
    trigger("dropBody", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(0)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, transform: "translateY(-20px)" })
        )
      ])
    ])
  ],

})
export class UserDataComponent {

  AllowSubmit: boolean = true
  isOpen: boolean = false
  passwordVisiblity: boolean = false
  date: any;

  @Input() username !: string

  formData: { username: string, name: string, email: string, phone: string, gender: string, birthDate: any, password: string, avatar: File | null } = { birthDate: "", email: "", gender: "", name: "", password: "", phone: '', username: "", avatar: null }
  errorData: { username: string, name: string, email: string, phone: string, gender: string, birthDate: string, password: string } = { birthDate: "", email: "", gender: "", name: "", password: "", phone: "", username: "" }



  constructor(public auth: AuthServiceService,) { }



  fileUploadHandler(event: any) {
    const file: File = event.target.files[0];

    this.formData.avatar = file
  }
  birthDateChangeHandler(e: any) {
    console.log('e.target.value :>> ', e.target.value);
  }


  openGenderBox() { this.isOpen = !this.isOpen }
  setPasswordVisiblity() { this.passwordVisiblity = !this.passwordVisiblity }

  menuClickHandler(gender: string) { this.formData.gender = gender }

  validator(type: string) {
    if (
      this.formData.username.trim().length > 0 &&
      this.formData.name.trim().length > 0 &&
      this.formData.birthDate.trim().length > 0 &&
      this.formData.email.trim().length > 0 &&
      this.formData.gender.trim().length > 0 &&
      this.formData.password.trim().length > 0 &&
      this.formData.avatar === null &&
      this.formData.phone.trim().length == 10) {
    } else {
    }

    switch (type) {
      case "name":
        if (this.formData.name.trim().length === 0) {
          this.errorData.name = "Name must contain atleast 3 charectors"
        } else {
          this.errorData.name = ""
        }
        break
      case "email":
        if (this.formData.email.trim().length === 0 || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.formData.email)) {
          this.errorData.email = "Invalid Email "
        } else {
          this.errorData.email = ""
        }
        break
      case "phone":
        if (this.formData.phone.toString().trim().length === 0) {
          this.errorData.phone = "Phone number must have 10 digits"
        } else {
          this.errorData.phone = ""
        }
        break
      case "password":
        if (this.formData.password.trim().length === 0) {
          this.errorData.password = "Password must contain atleast 6 charectors"
        } else {
          this.errorData.password = ""
        }
        break
    }
  }

  submit() {
    console.log('formData :>> ', this.formData);
  }
}
