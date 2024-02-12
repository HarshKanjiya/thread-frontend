import { Component, Signal, computed } from '@angular/core';
import { DialogService } from '../../../../Services/dialog.service';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { Router } from '@angular/router';
import { UserStateService } from '../../../../Services/state/user-state.service';
import { PostsStateService } from '../../../../Services/state/posts-state.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThreadComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  myThreads: Signal<any> = computed(() => this.userState.MyFeed())
  UserData: Signal<any> = computed(() => this.userState.UserData())

  constructor(private postState: PostsStateService, private userState: UserStateService, private router: Router, public dialog: DialogService) {
  }

  ngAfterViewInit() {
    if (this.UserData()) {
      this.userState.getMyFeed()
    }
  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }
}
