import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStateService } from '../../../Services/state/user-state.service';
import { OthersProfilePageComponent } from './others-profile-page/others-profile-page.component';
import { MyProfilePageComponent } from './profile-page/myProfile-page.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MyProfilePageComponent, OthersProfilePageComponent],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {

  UserName: string = "";

  // userDataSignal: Signal<any> = computed(() => this.userState.UserData())
  // myProfile: Signal<boolean> = computed(() => this.userDataSignal()?.UserName === this.UserName ? true : false )

  userName: string = ""

  constructor(public userState: UserStateService, private store: Store<any>, public router: Router, public route: ActivatedRoute) {
    store.select("User").subscribe((res: any) => {
      if (res?.userData) {
        this.userName = res.userData.UserName
      }
    })

  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.UserName = params["id"];
    });
  }
}
