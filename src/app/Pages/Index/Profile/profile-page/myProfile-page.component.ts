import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Signal, computed } from '@angular/core';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { Router } from '@angular/router';
import { ThreadComponent } from '../../../../Components/thread/thread.component';

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  imports: [ThreadComponent],
  templateUrl: './myProfile-page.component.html',
  animations: [
    trigger("body", [
      transition(":enter", [
        style({ opacity: 0, }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, })
        )
      ])
    ])
  ]

})
export class MyProfilePageComponent {
  isPrivacyButtonChecked: boolean = false
  selectedTab: "THREADS" | "REPLIES" | "REPOSTS" = "THREADS"

  myProfile: boolean = false
  userDataSignal: Signal<any> = computed(() => this.userState.UserData())

  myThreads: Signal<any> = computed(() => {
    return this.userState.MyPosts()
  })

  constructor(private userState: UserStateService, private router: Router) {
  }

  ngAfterViewInit() {
    this.userState.getAllMyPosts()
  }

  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
  }
}
