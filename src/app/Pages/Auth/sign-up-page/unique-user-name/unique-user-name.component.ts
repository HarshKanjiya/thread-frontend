import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unique-user-name',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './unique-user-name.component.html',
  animations: [

  ]
})
export class UniqueUserNameComponent {

  uniqueId: string = ""
  AllowSubmit: boolean = false
  invalidInput: boolean = false
  AlertMessage: string = ""
  loading = signal<boolean>(false)

  @Output() username = new EventEmitter<string>()

  // constructor(public auth: AuthServiceService) { }

  onTextKeyUp() {

    if (/\s/.test(this.uniqueId)) {
      this.AlertMessage = "Spaces are not allowed!"
      this.invalidInput = true
    }
    else if (/[/;|!@#$%^&*():"<>?]/.test(this.uniqueId)) {
      this.AlertMessage = "Used symbols are not Allowed!"
      this.invalidInput = true
    }
    else if (/[A-Z]/.test(this.uniqueId)) {
      this.AlertMessage = "Only use Lowecase letters!"
      this.invalidInput = true
    } else {
      this.invalidInput = false
      this.AlertMessage = ""
    }

    // check in DB if Username exists or not
  }

  submit() {
    this.username.emit(this.uniqueId)
  }
}
