import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

  userName: string = ""

  constructor(private store: Store<any>, public router: Router, public route: ActivatedRoute) {
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
