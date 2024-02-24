import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { DialogService } from '../../../../Services/dialog.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';
import { trigger, transition, style, animate } from '@angular/animations';
import { IPostInitialState } from '../../../../reducers/Post/PostTypes';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { PostService } from '../../../../reducers/Post/Post.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThreadComponent, LoaderComponent],
  templateUrl: './home-page.component.html',
  animations: [trigger("threadEnterAnimation", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(-20px)" }),
      animate(
        "150ms ease-in-out",
        style({ opacity: 1, transform: "translateY(0)" })
      )
    ]),
    transition(":leave", [
      style({ opacity: 1, transform: "translateY(0)" }),
      animate(
        "150ms ease-in-out",
        style({ opacity: 0, transform: "translateY(-20px)" })
      )
    ])
  ]),
  ]

})
export class HomePageComponent {

  userData: any = null
  loading: boolean = false
  threads: any[] = []

  constructor(private router: Router, public dialog: DialogService, private store: Store<any>, private postService: PostService) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.userData = res.userData
      if (res.userData) {
        this.postService.getMyFeed(this.userData?.UserId, 0)
      }
    })
    store.select("Post").subscribe((res: IPostInitialState) => {
      this.threads = [...res.feed]
      this.loading = this.loading
    })
  }

  ngAfterViewInit() {
  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }
}
