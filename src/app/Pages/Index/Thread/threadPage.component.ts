import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplyComponent } from '../../../Components/reply/reply.component';
import { ThreadComponent } from '../../../Components/thread/thread.component';
import { PostService } from '../../../reducers/Post/Post.service';
import { Store } from '@ngrx/store';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-thread-page',
  standalone: true,
  imports: [ReplyComponent, ThreadComponent, LoaderComponent],
  templateUrl: './threadPage.component.html',
  animations: [
    trigger("threadEnterAnimation", [
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
export class ThreadPageComponent {


  loading: boolean = false

  postData: any = null

  postRepliesData: any[] = []

  userData: any = null

  id: any = null

  constructor(private route: ActivatedRoute, private postService: PostService, private store: Store<any>) {
    store.select("User").subscribe((res: any) => {
      this.userData = res.userData
      if (res?.userData) {
        this.route.params.subscribe(params => {
          this.id = params['id'];
        });
        this.postService.getThreadData(res.userData.UserId, this.id)
        this.postService.getThreadReplies(res.userData.UserId, this.id)
      }
    })
    this.store.select("Post").subscribe((res: any) => {
      this.loading = res.loading
      this.postData = res.threadData
      this.postRepliesData = res.threadReplies
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

  }
}
