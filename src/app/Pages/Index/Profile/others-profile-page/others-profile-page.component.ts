import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { PostService } from '../../../../reducers/Post/Post.service';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';
import { UserService } from '../../../../reducers/User/User.service';
import { SET_USER_OTHER_USER } from '../../../../reducers/User/UserActions';
import { HttpService } from '../../../../Services/http-service.service';
import { FollowAPI } from '../../../../Utils/Endpoints';
import { ToastService } from '../../../../Services/toast.service';

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
  selectedTab: "THREADS" | "REPOSTS" = "THREADS"

  sticky: boolean = false;

  userLoading: boolean = false;
  postLoading: boolean = false;

  @ViewChild('stickyMenu') menuElement!: ElementRef;
  @ViewChild('loader') loaderElement!: ElementRef;

  // @HostListener('window:scroll', ['$event'])


  menuPosition: any = null;
  userData: any = null
  requesterData: any = null

  followed: boolean = false
  userPosts: any[] = []
  initialLoad: boolean = true
  userNameFromURL: string = ""

  constructor(private store: Store<any>, private http: HttpService, private toast: ToastService, private postService: PostService, private userService: UserService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.store.select("User").subscribe((res: IUserInitialState) => {
      if (res.userData) {
        this.requesterData = res.userData
      }
      if (res.otherUserData) {
        this.userData = res.otherUserData
        this.followed = res.otherUserData.FollowedByMe
        this.userPosts = [...res.otherUserData?.posts]
      }
      if (res.userData !== null && this.initialLoad && this.userNameFromURL !== "") {
        this.userService.getOtherUsersData(res.userData?.UserId, this.userNameFromURL)
        this.initialLoad = false
      }
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userNameFromURL = params['id'];
    });
  }

  ngOnDestroy() {
    this.store.dispatch(SET_USER_OTHER_USER({ data: null }));
  }

  ngAfterViewInit() {
    // this.getPosts()
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }

  handleScroll() {
    const windowScroll = window.scrollY;
    if (windowScroll >= this.menuPosition - 150) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
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
    this.postService.getMyThreads(this.userData.UserName, 2, type);
  }

  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "THREADS" | "REPOSTS") {
    this.selectedTab = val
    this.getPosts()
  }

  followLoading: boolean = false;
  followUser() {
    this.followLoading = true
    let temp = { CasterId: this.requesterData.UserId, ReceiverId: this.userData.user.UserId, Type: "FOLLOW" }
    try {
      this.http.post(FollowAPI, temp).subscribe((res: any) => {
        if (res.Success) {
          this.followed = !this.followed
          this.toast.makeToast("MESSAGE", this.userData.user.Name + " followed")
        }
      })
    } catch (err: any) {
      this.toast.makeToast('ERROR', err.message ?? "Failed to perform Action")
    }
  }
}
