import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from '../../Services/dialog.service';
import { UserStateService } from '../../Services/state/user-state.service';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  username: string = "harxh_here"
  isOpen: boolean = false
  visible: boolean = false;

  userName: string = ""


  constructor(private themeService: ThemeService, public dialog: DialogService, public router: Router, public userState: UserStateService, private store: Store<any>) {
    store.select("User").subscribe((res: any) => {
      if (res?.userData) {
        this.userName = res.userData.UserName
      }
    })
  }

  showDialog() {
    this.visible = !this.visible;
  }

  changeTheme() {
    this.themeService.darkTheme.set(!this.themeService.darkTheme())
  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }

  removePopUp() {
    this.dialog.closeDialog()
  }

  setIsOpen() {
    this.isOpen = !this.isOpen
  }
}
