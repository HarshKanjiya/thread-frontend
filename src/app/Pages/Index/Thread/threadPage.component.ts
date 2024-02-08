import { Component, Signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsStateService } from '../../../Services/state/posts-state.service';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [],
  templateUrl: './threadPage.component.html'
})
export class ThreadPageComponent {

  postData: Signal<any> = computed(() => {
    return this.postState.postData()
  })
  postRepliesData: Signal<any> = computed(() => this.postState.postRepliesData())

  constructor(private postState: PostsStateService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.postState.getThreadData(id)
    });

  }
}
