import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UniqueUserNameComponent } from './unique-user-name/unique-user-name.component';
import { UserDataComponent } from './user-data/user-data.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [FormsModule, RouterLink, UniqueUserNameComponent, UserDataComponent],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  currentForm: "USERNAME" | "USERDATA" = "USERNAME"

  constructor(private store: Store<any>) {
    store.select("User").subscribe((res: any) => {
      if (res?.temp?.UserNameAvailable === true) {
        this.currentForm = "USERDATA"
      }
    })
  }


}
