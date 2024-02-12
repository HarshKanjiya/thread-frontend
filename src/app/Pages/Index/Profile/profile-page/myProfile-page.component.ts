import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { PostService } from '../../../../reducers/Post/Post.service';

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


  userData: any = null


  myThreads: any[] = []


  constructor(private store: Store<any>, private router: Router, private postService: PostService) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
    })
    store.select("Post").subscribe((res: any) => {
      this.myThreads = res.myThreads
    })
  }

  getPosts() {
    let type: "PARENT" | "REPOST" = "PARENT";
    switch (this.selectedTab) {
      case "THREADS":
        type = "PARENT"
        break;
      case "REPOSTS":
        type = "REPOST"
    }
    this.postService.getMyThreads(this.userData.UserId, 2, type);
  }

  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
    this.getPosts()
  }
}
