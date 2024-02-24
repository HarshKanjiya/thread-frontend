import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { DialogService } from '../../Services/dialog.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostService } from '../../reducers/Post/Post.service';
import { Store } from '@ngrx/store';
import { IPostInitialState } from '../../reducers/Post/PostTypes';
import { SET_POST_SUCCESS } from '../../reducers/Post/PostActions';

@Component({
  selector: 'app-create-post-pop-up',
  standalone: true,
  imports: [CreatePostComponent],
  templateUrl: './create-post-pop-up.component.html',

  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.97)" }),
        animate(

          "150ms ease-in-out",
          style({ opacity: 1, transform: "scale(1)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "scale(1)" }),
        animate(
          "1000ms ease-in-out",
          style({ opacity: 0, transform: "scale(0.97)" })
        )
      ])
    ])
  ]
})
export class CreatePostPopUpComponent {

  // success: boolean = false
  constructor(public dialog: DialogService, private PostService: PostService, private store: Store<any>) {
    store.select("Post").subscribe((res: IPostInitialState) => {
      if (res.success) {
        this.closeDialog()
        store.dispatch(SET_POST_SUCCESS({ success: false }))
        PostService.getMyFeed()
      }
    })
  }

  allowAddToThread: boolean = true


  closeDialog() {
    this.dialog.closeDialog()
  }


  submitThread(event: any) {
    this.PostService.createNewPost(event)
  }

}
