import { Component, Signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplyComponent } from '../../../Components/reply/thread.component';
import { ThreadComponent } from '../../../Components/thread/thread.component';
import { PostsStateService } from '../../../Services/state/posts-state.service';

@Component({
  selector: 'app-thread-page',
  standalone: true,
  imports: [ReplyComponent, ThreadComponent],
  templateUrl: './threadPage.component.html'
})
export class ThreadPageComponent {


  loading: Signal<boolean> = computed(() => this.postState.loading())



  postData: Signal<any> = computed(() => {
    console.log('postData() :>> ', this.postState.postData());
    return this.postState.postData()
  })

  postRepliesData: Signal<any> = computed(() => {
    console.log('object :>> ', this.postState.postRepliesData());
    return this.postState.postRepliesData()
  })

  constructor(private postState: PostsStateService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) this.postState.getThreadData(id)
    });


  }
}
