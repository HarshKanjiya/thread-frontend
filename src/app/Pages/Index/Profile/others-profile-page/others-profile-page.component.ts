import { Component, Signal, computed } from '@angular/core';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { Router } from '@angular/router';

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
  userDataSignal: Signal<any> = computed(() => this.userState.UserData())

  constructor(private userState: UserStateService, private router: Router) {
  }


  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
  }
}
