import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
  ]
})
export class UserDataComponent {

  myForm !: FormGroup;
  AllowSubmit: boolean = false
  isOpen: boolean = false
  selectedGender: string = ''
  passwordVisiblity: boolean = false

  @Input() username !: string


  constructor(public auth: AuthServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: [this.username, [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  openGenderBox() { this.isOpen = !this.isOpen }
  setPasswordVisiblity() { this.passwordVisiblity = !this.passwordVisiblity }

  menuClickHandler(gender: string) { this.selectedGender = gender }


  submit() {

  }
}
