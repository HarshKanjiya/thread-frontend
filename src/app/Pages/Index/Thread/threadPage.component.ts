import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplyComponent } from '../../../Components/reply/thread.component';
import { ThreadComponent } from '../../../Components/thread/thread.component';
import { PostService } from '../../../reducers/Post/Post.service';

@Component({
  selector: 'app-thread-page',
  standalone: true,
  imports: [ReplyComponent, ThreadComponent],
  templateUrl: './threadPage.component.html'
})
export class ThreadPageComponent {


  loading: boolean = false

  postData: any = null

  postRepliesData: any = null

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) this.postService.getThreadData(id)
    });


  }
}
