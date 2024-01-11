import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown.component';


interface IOptionType {
  option: string,
  id: number
}

const defaultOptions = [{ id: 0, option: "Yes" }, { id: 1, option: "No" }]

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, TextareaAutoresizeDirective, DropdownComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
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
export class CreatePostComponent {

  threadInputText: string = ""
  count: number = 0

  threadType: "TEXT" | "POLL" = "POLL"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" = "ANY"

  postType: "PARENT" | "CHILD" | "QUOTE" | "REPOST" = "PARENT"
  postTypeHelperId: string | null = null

  options: IOptionType[] = defaultOptions


  constructor(public dialog: DialogService) { }


  textAreaCounter(e: any) {
    this.count = e.target.value.length
  }

  addOption() {
    this.options.push({ id: this.options.length, option: "" })
  }
  removeOption(id: number) {
    this.options = this.options.filter((i: IOptionType) => i.id !== id)
  }

  closeDialog() {
    this.options = defaultOptions
    this.postType = 'PARENT'
    this.replyAccess = "ANY"
    this.threadType = "TEXT"
    this.postTypeHelperId = null
    this.dialog.dialogVisible.set(false)
  }

  changeThreadType(type: "TEXT" | "POLL") {
    this.options = defaultOptions
    this.threadType = type

  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }



  SubmitThread($e: any) {
    let _temp: any = {
      authorId: "ID",
      type: this.postType,
      replyAccess: this.replyAccess,
    }

    if (this.postType !== "PARENT") _temp["typeHelperId"] = this.postTypeHelperId

    let _content = {
      type: this.threadType,
      text: this.threadInputText,
      options: this.options
    }

    _temp["content"] = _content

    console.log('option :>> ', $e, _temp);
  }
}


