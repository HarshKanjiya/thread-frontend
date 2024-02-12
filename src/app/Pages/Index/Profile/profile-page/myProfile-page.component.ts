import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, Signal, ViewChild, computed } from '@angular/core';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { Router } from '@angular/router';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { Store } from '@ngrx/store';

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

  sticky: boolean = false;

  @ViewChild('stickyMenu') menuElement!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll >= this.menuPosition - 150) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  menuPosition: any;

  ngAfterViewInit() {
    this.getPosts()
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }

  myProfile: boolean = false
  // userDataSignal: Signal<any> = computed(() => this.userState.UserData())


  userData: any = null


  myThreads: Signal<any> = computed(() => {
    return this.userState.MyPosts()
  })

  constructor(private userState: UserStateService, private store: Store<any>, private router: Router) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
    })
  }

  getPosts() {
    let type = "";
    switch (this.selectedTab) {
      case "THREADS":
        type = "PARENT"
        break;
      case "REPLIES":
        type = "REPLY"
        break;
      case "REPOSTS":
        type = "REPOST"
    }
    this.userState.getAllMyPosts(type, 1)
  }

  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
    this.getPosts()
  }
}
