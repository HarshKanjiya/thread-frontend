import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, ViewChild, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { UserService } from '../../../../reducers/User/User.service';
import { DatePipe } from '@angular/common';
import moment, { } from "moment"

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
  providers: [DatePipe]
})
export class UserDataComponent {

  AllowSubmit: boolean = true
  isOpen: boolean = false
  passwordVisiblity: boolean = false
  date: any;
  loading = signal<boolean>(false)


  @ViewChild("menu") menu !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.menu.nativeElement.contains(event.target) && this.isOpen) {
      // Clicked outside the element, handle it here
      this.isOpen = false
    }
  }

  UserName: string = ""
  Name: string = ""
  Email: string = ""
  PhoneNumber: string = ""
  Gender: "MALE" | "FEMALE" | "KEEP_SECRET" | string = ""
  BirthDate: Date | null = null
  Password: string = ""
  Avatar: any = ""
  selectedFile: File | null = null;


  // formData:
  //   { username: string, name: string, email: string, phone: string, gender: "MALE" | "FEMALE" | "KEEP_SECRET" | "", birthDate: string, password: string, avatar: string }
  //   =
  //   { birthDate: "", email: "", gender: "", name: "", password: "", phone: '', username: "", avatar: "" }

  // errorData:
  //   { username: string, name: string, email: string, phone: string, gender: string, birthDate: string, password: string }
  //   =
  //   { birthDate: "", email: "", gender: "", name: "", password: "", phone: "", username: "" }


  constructor(private store: Store<any>, private userService: UserService, private datePipe: DatePipe) {
    store.select("User").subscribe((res: any) => {
      if (res?.temp?.UserNameAvailable === true) {
        // this.formData.username = res.temp.UserName
        this.UserName = res.temp.UserName
      }
    })
  }


  // fileUploadHandler(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   if (file) {
  //     reader.onload = () => {
  //       this.Avatar = reader?.result as string;
  //     };
  //   }

  //   reader.readAsDataURL(file);
  // }

  removeAvatar() {
    this.Avatar = ""
  }

  fileUploadHandler(event: any) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files && files.length > 0) {

      const selectedFile = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.Avatar = e.target?.result || null;
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadImage();
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.Avatar = e.target.result;

    };
    reader.readAsDataURL(this.selectedFile);
  }




  openGenderBox() { this.isOpen = !this.isOpen }
  setPasswordVisiblity() { this.passwordVisiblity = !this.passwordVisiblity }

  menuClickHandler(gender: "MALE" | "FEMALE" | "KEEP_SECRET") { this.Gender = gender }

  validator(type: string) {
    // if (
    //   this.formData.username.trim().length > 0 &&
    //   this.formData.name.trim().length > 0 &&
    //   this.formData.birthDate.trim().length > 0 &&
    //   this.formData.email.trim().length > 0 &&
    //   this.formData.gender.trim().length > 0 &&
    //   this.formData.password.trim().length > 0 &&
    //   this.formData.avatar === null &&
    //   this.formData.phone.trim().length == 10) {
    // } else {
    // }

    // switch (type) {
    //   case "name":
    //     if (this.formData.name.trim().length === 0) {
    //       this.errorData.name = "Name must contain atleast 3 charectors"
    //     } else {
    //       this.errorData.name = ""
    //     }
    //     break
    //   case "email":
    //     if (this.formData.email.trim().length === 0 || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.formData.email)) {
    //       this.errorData.email = "Invalid Email "
    //     } else {
    //       this.errorData.email = ""
    //     }
    //     break
    //   case "phone":
    //     if (this.formData.phone.toString().trim().length === 0) {
    //       this.errorData.phone = "Phone number must have 10 digits"
    //     } else {
    //       this.errorData.phone = ""
    //     }
    //     break
    //   case "password":
    //     if (this.formData.password.trim().length === 0) {
    //       this.errorData.password = "Password must contain atleast 6 charectors"
    //     } else {
    //       this.errorData.password = ""
    //     }
    //     break
    //   case "gender":
    //     if (this.formData.gender.trim().length === 0) {
    //       this.errorData.gender = "Please select Gender"
    //     } else {
    //       this.errorData.password = ""
    //     }
    //     break
    // }
  }

  submit() {
    // this.validator("gender")


    // console.log(Object.values(this.errorData))

    let _temp = {
      UserName: this.UserName,
      Name: this.Name,
      PhoneNumber: this.PhoneNumber.toString(),
      Avatar: this.Avatar,
      Email: this.Email,
      BirthDate: moment(this.BirthDate).format("Do MMM, YYYY"),
      Gender: this.Gender,
      Password: this.Password
    }

    console.log(_temp)

    this.userService.registerUser(_temp)

    // this.userService.registerUser({
    //   Avatar: this.formData.avatar,
    //   BirthDate: this.formData.birthDate,
    //   Email: this.formData.avatar,
    //   Gender: this.formData.gender,
    //   Name: this.formData.avatar,
    //   Password: this.formData.avatar,
    //   PhoneNumber: this.formData.avatar,
    //   UserName: this.formData.username
    // })


  }
}
