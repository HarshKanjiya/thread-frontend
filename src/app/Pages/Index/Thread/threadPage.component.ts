import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplyComponent } from '../../../Components/reply/reply.component';
import { ThreadComponent } from '../../../Components/thread/thread.component';
import { PostService } from '../../../reducers/Post/Post.service';
import { Store } from '@ngrx/store';
import { LoaderComponent } from '../../../Components/loader/loader.component';

@Component({
  selector: 'app-thread-page',
  standalone: true,
  imports: [ReplyComponent, ThreadComponent, LoaderComponent],
  templateUrl: './threadPage.component.html'
})
export class ThreadPageComponent {


  loading: boolean = false

  postData: any = null

  postRepliesData: any[] = []

  constructor(private route: ActivatedRoute, private postService: PostService, private store: Store<any>) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.getThreadData(id)
        this.postService.getThreadReplies(id)
      }
    });
    this.store.select("Post").subscribe((res: any) => {
      this.loading = res.loading
      this.postData = res.threadData
      this.postRepliesData = res.threadReplies
    })
  }
}
