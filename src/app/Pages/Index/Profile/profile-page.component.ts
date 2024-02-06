import { Component, Signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStateService } from '../../../Services/state/user-state.service';
import { MyProfilePageComponent } from './profile-page/myProfile-page.component';
import { OthersProfilePageComponent } from './others-profile-page/others-profile-page.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MyProfilePageComponent, OthersProfilePageComponent],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {

  UserName:string = "";

  userDataSignal: Signal<any> = computed(() => this.userState.UserData())
  myProfile: Signal<boolean> = computed(() => this.userDataSignal()?.UserName === this.UserName ? true : false )

  constructor(public userState: UserStateService, public router: Router,public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.UserName = params["id"];
    });
  }
}
