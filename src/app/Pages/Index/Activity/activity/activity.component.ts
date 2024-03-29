import { Component } from '@angular/core';
import { INotification } from '../../../../Interfaces/Common';
import { UserService } from '../../../../reducers/User/User.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { Router, RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import moment from 'moment';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent, RouterLink],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  animations: [
    trigger("animation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "150ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(0)" }),
        animate(
          "150ms ease-out",
          style({ opacity: 0, transform: "translateY(-20px)" })
        )
      ])
    ]),

  ]
})
export class ActivityComponent {



  data: INotification[] = []
  userData: any = null
  loading: boolean = false
  initialLoad: boolean = true

  constructor(private UserService: UserService, private store: Store<any>, private router: Router) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.loading = res.loading
      this.userData = res.userData
      this.data = res.notificatinos

      if (this.initialLoad && this.userData) {
        this.getNotifs("ALL")
        this.initialLoad = false
      }

    })
  }

  getNotifs(type: "FOLLOW" | "LIKE" | "ALL" | "REPLY" | "REPOST" | "MENTION") {
    this.UserService.getMyNotification(this.userData?.UserId, type)
  }

  getTimePassed(time: any) {
    return moment(time).toNow()
  }

  redirect(item: any) {
    switch (item.Type) {
      case "FOLLOW":
        this.router.navigate(["user", item.CasterUserName])
        break
      case "REPLY":
        this.router.navigate(["thread", item.HelperId])
        break
    }
  }
}
