import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { Store } from '@ngrx/store';
import { TextareaAutoresizeDirective } from "../../../../Directives/textarea-autoresize.directive";

@Component({
  selector: 'edit-profile',
  standalone: true,
  imports: [FormsModule, PickerComponent, TextareaAutoresizeDirective],
  templateUrl: './edit-profile.component.html',
  animations: [
    trigger("dropBody", [
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
export class EditProfileComponent {
  userLoading: boolean = false;

  editObj = {
    nameEdit: false,
    uNameEdit: false,
    statusEdit: false,
    bioEdit: false,
  };
  imageOptions: boolean = false

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private store: Store<any>
  ) {
    this.store.select('User').subscribe((res: any) => {
      this.userData = res.userData;
      this.userLoading = res.loading;

      if (res.userData) {
        this.tempData.Name = this.userData.Name;
        this.tempData.UserName = this.userData.UserName;
        this.tempData.Status = this.userData.Status;
        this.tempData.Bio = this.userData.Bio;
      }
    });
  }

  userData: any = null;
  tempData = {
    Name: '',
    UserName: '',
    Status: '',
    Bio: '',
  };

  myThreads: any[] = [];

  setStatus(event: any) {
    this.tempData.Status = event.emoji.unified;
    this.editObj.statusEdit = false;
  }
}
