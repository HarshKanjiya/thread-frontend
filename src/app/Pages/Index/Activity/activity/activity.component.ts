import { Component } from '@angular/core';
import { INotification } from '../../../../Interfaces/Common';
import { UserService } from '../../../../reducers/User/User.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent,RouterLink],
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

  constructor(private UserService: UserService, private store: Store<any>) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.loading = res.loading
      this.userData = res.userData
      this.data = res.notificatinos

      if(this.initialLoad && this.userData){
        this.getNotifs("ALL")
        this.initialLoad = false
      }

    })
  }

  getNotifs(type: "FOLLOW" | "LIKE" | "ALL" | "REPLY" | "REPOST" | "MENTION") {
    this.UserService.getMyNotification(this.userData?.UserId, type)
  }

  getTimePassed(createdAt: Date) {
    console.log('createAt :>> ', createdAt, Date.now());

    // @ts-ignore
    return (Date.now() - createdAt).toLocaleString()
  }


  timeDifference(createAt: any): string {
    const currentTime = new Date();
    const postDate = new Date(createAt);
    const difference = currentTime.getTime() - postDate.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);


    if (hours >= 8760) {
      return `${Math.floor(hours / 8760)}y`
    }
    if (hours >= 720 && hours < 8760) {
      return `${Math.floor(hours / 720)}m`
    }
    if (hours >= 24 && hours < 168) {
      return `${Math.floor(hours / 24)}d`
    }
    if (hours > 0 && hours < 24) {
      return `${hours}h`;
    }
    if (hours <= 0 && minutes > 0) {
      return `${minutes}m`;
    }
    if (hours < 0 && minutes < 0) {
      return `${seconds}s`;
    }
    return "1y"
  }
}
