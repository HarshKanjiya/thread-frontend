import { Component, Signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../../reducers/User/User.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../reducers/User/UserTypes';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  animations: [
    trigger("themeSwitch", [
      transition(":enter", [
        style({ opacity: 0, transform: "rotate(180deg)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "rotate(0deg)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, transform: "rotate(180deg)" })
        )
      ])
    ]),

  ]
})
export class AdminHeaderComponent {

  currentTheme: Signal<boolean> = computed(() => this.theme.darkTheme())


  loading: boolean = false
  constructor(public theme: ThemeService, public router: Router, private userService: UserService, private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select("User").subscribe((res: IUserInitialState) => {
      this.loading = res.loading
    })
  }

  changeTheme() {
    this.theme.darkTheme.set(!this.theme.darkTheme())
  }

  signOut() {
    this.userService.signOut()
  }
}
