import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { Observable } from 'rxjs';


interface IOptionType {
  option: string,
  id: number
}

const replyMapper = {
  "Any one": "ANY", "Following": "FOLLOWING", "Mentioned": "MENTIONED", "None": "NONE"
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

  @Input() PostType_FromParent: string | null = null
  @Input() postTypeHelperId_FromParent: string | null = null

  threadInputText: string = ""
  count: number = 0

  threadType: "TEXT" | "POLL" = "TEXT"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" | "NONE" = "ANY"

  postType: "PARENT" | "CHILD" | "QUOTE" | "REPOST" = "PARENT"
  postTypeHelperId: string | null = null

  options: IOptionType[] = defaultOptions

  replyOptions = ["Any one", "Following", "Mentioned", "None"]
  selectedReplyOption: "Any one" | "Following" | "Mentioned" | "None" = "Any one"

  selectedFile: File[] = [];
  selectedFileBase64: File[] = [];



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

  changeSelectedOption(e: any) {
    this.selectedReplyOption = e
  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }

  onFileChange(event: any) {
    this.selectedFile.push(event.target.files[0])
    // this.selectedFileBase64

    console.log('====================================');
    console.log(this.getFileAsBase64(event.target.files[0]));
    console.log('====================================');
  }

  getFileAsBase64(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        return reader.result as string
      };
      reader.readAsDataURL(file);
    }
  }

  SubmitThread($e: any) {
    console.log('$e :>> ', $e);
    console.log(':>> ', this.selectedFile);
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
  }
}


