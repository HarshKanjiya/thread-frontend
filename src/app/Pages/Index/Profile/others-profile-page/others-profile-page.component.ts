import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-others-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './others-profile-page.component.html',
})
export class OthersProfilePageComponent {
  isPrivacyButtonChecked: boolean = false
  selectedTab: "THREADS" | "REPLIES" | "REPOSTS" = "THREADS"

  myProfile: boolean = false
  userData: any = null

  constructor(private store: Store<any>, private router: Router) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
    })
  }


  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
  }
}
