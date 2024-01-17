import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UniqueUserNameComponent } from './unique-user-name/unique-user-name.component';
import { UserDataComponent } from './user-data/user-data.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [FormsModule, RouterLink, UniqueUserNameComponent, UserDataComponent],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  currentForm: "USERNAME" | "USERDATA" = "USERDATA"
  username: string = ""

  userNameReceived(e: string) {
    this.username = e
    if (e.trim().length > 0) this.currentForm = 'USERDATA'

  }
}
