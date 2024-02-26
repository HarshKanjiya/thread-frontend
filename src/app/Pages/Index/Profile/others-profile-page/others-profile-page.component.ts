import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { PostService } from '../../../../reducers/Post/Post.service';
import { LoaderComponent } from '../../../../Components/loader/loader.component';

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  imports: [ThreadComponent, LoaderComponent],
  templateUrl: './others-profile-page.component.html',
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
export class OthersProfilePageComponent {

  isPrivacyButtonChecked: boolean = false
  selectedTab: "THREADS" | "REPLIES" | "REPOSTS" = "THREADS"

  sticky: boolean = false;

  userLoading: boolean = false;
  postLoading: boolean = false;

  @ViewChild('stickyMenu') menuElement!: ElementRef;
  @ViewChild('loader') loaderElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll >= this.menuPosition - 150) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  constructor(private store: Store<any>, private router: Router, private postService: PostService, private cd: ChangeDetectorRef) { }

  menuPosition: any;

  ngOnInit() {
    this.store.select("User").subscribe((res: any) => {
      this.userData = res.userData
      this.userLoading = res.loading
    })
    this.store.select("Post").subscribe((res: any) => {
      this.myThreads = res.myThreads
      this.postLoading = res.loading
      this.cd.detectChanges()
    })
  }

  ngAfterViewInit() {
    this.getPosts()
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }

  myProfile: boolean = false


  userData: any = null


  myThreads: any[] = []



  getPosts() {
    let type: "PARENT" | "REPOST" = "PARENT";
    switch (this.selectedTab) {
      case "THREADS":
        type = "PARENT"
        break;
      case "REPOSTS":
        type = "REPOST"
    }
    this.postService.getMyThreads(this.userData.UserName, 2, type);
  }

  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPLIES" | "REPOSTS") {
    this.selectedTab = val
    this.getPosts()
  }
}
