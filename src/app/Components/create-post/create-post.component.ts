import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { IUserInitialState } from '../../reducers/User/UserTypes';
import { PostFormComponent } from '../post-form/post-form.component';


@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, TextareaAutoresizeDirective, DropdownComponent, PostFormComponent],
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
  @Input() allowAddToThread: boolean = true

  userData: any = null
  @Output() submition = new EventEmitter<any>()

  threadInputText: string = ""
  count: number = 0

  AddToThreadButton: boolean = false

  threadType: "TEXT" | "POLL" = "TEXT"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" | "NONE" = "ANY"

  postType: "PARENT" | "CHILD" | "REPOST" = "PARENT"
  postTypeHelperId: string | null = null



  // new option sln
  OptionsArray: { OptionId: string, Option: string, Value: string }[] = []



  replyOptions = ["Any one", "Following", "Mentioned", "None"]
  replyOptionsMap = {
    "Any one": "ANY", "Following": "FOLLOWING", "Mentioned": "MENTIONED", "None": "NONE"
  }

  selectedReplyOption: "Any one" | "Following" | "Mentioned" | "None" = "Any one"

  selectedFile: File[] = [];
  selectedFileBase64: string[] = []

  ChildData: any[] = []

  formDisable: boolean = false

  constructor(public dialog: DialogService, store: Store<any>) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.userData = res.userData
    })
  }


  changeNewThread() {
    this.AddToThreadButton = !this.AddToThreadButton
  }

  removeMeFromChildThread(e: any) {
    if (e == 1) this.AddToThreadButton = false
    this.ChildData = this.ChildData.splice(e, 1)
  }

  textAreaCounter(e: any) {

    if (this.count < 10) {
      this.count = e.target.value.trim().length
      this.threadInputText = e.target.value.trim()
    }

    if (e.target.value.trim().length === 0) {
      this.formDisable = true
    } else {
      this.formDisable = false
    }
  }

  generateId() {
    let id = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      id += alphabet[randomIndex];
    }

    return id;
  }

  addOption(Option: string = "") {
    let id = this.generateId()

    this.OptionsArray.map((opt: any) => {
      if (id === opt.id) {
        id = this.generateId()
      }
    })

    this.OptionsArray.push({ OptionId: id, Option: Option, Value: id })
  }
  removeOption(id: string) {

    this.OptionsArray = this.OptionsArray.filter((i: any) => i.OptionId !== id ? true : false)
  }

  closeDialog() {
    this.OptionsArray = []
    this.postType = 'PARENT'
    this.replyAccess = "ANY"
    this.threadType = "TEXT"
    this.postTypeHelperId = null
    this.ChildData = []
    this.dialog.closeDialog()
  }

  changeThreadType(type: "TEXT" | "POLL") {
    if (type === "POLL") {
      if (this.OptionsArray.length == 0) {
        this.addOption("Yes")
        this.addOption("No")
      }

    } else {
      this.OptionsArray = []
    }
    this.threadType = type

  }

  changeSelectedReplyOption(e: any) {
    this.replyAccess = e.code
    this.selectedReplyOption = e.label
  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }

  onFileChange(event: any) {

    const fileList: File[] = event.target.files;

    for (let key in fileList) {
      if (fileList.hasOwnProperty(key)) {
        this.selectedFile.push(fileList[key])
      }
    }
    this.getFileAsBase64(event)
  }

  getFileAsBase64(event: any) {
    const input = event.target;
    const files = input.files && input.files.length > 0 ? input.files : null;

    if (files) {
      let _temp: any[] = []
      let rawFiles: any[] = []

      for (let key in files) {
        if (files.hasOwnProperty(key)) {
          rawFiles.push(files[key])
        }
      }

      const promises = rawFiles.map((file: File) => {

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            _temp = [..._temp, reader.result as string]
            resolve(reader.result as string)
          };
          reader.readAsDataURL(file);
        })
      })

      Promise.all(promises).then((res: any) => {
        this.selectedFileBase64 = [...this.selectedFileBase64, ...res]
      })

    }
  }

  removeFile(index: number) {

    this.selectedFile = [...this.selectedFile.slice(0, index), ...this.selectedFile.slice(index + 1)]
    this.selectedFileBase64 = [...this.selectedFileBase64.slice(0, index), ...this.selectedFileBase64.slice(index + 1)]
  }


  validationHandler(e: any) {
    if (e.target.value.trim().length === 0) {
      this.formDisable = true
    } else {
      this.formDisable = false
    }
  }

  childSubmissionHandler(event: any) {
    let ind = event.level - 1
    if (event.level > this.ChildData.length) {
      this.ChildData.push(event.data)
    } else {
      this.ChildData = this.ChildData.map((item: any, index: number) => {
        if (index == ind) {
          return event.data
        } else {
          return item
        }
      })
    }
  }

  addTag() {
    this.threadInputText = this.threadInputText + " #"
  }

  SubmitThread() {
    let _temp: any = {
      AuthorId: this.userData.UserId,
      Type: this.postType,
      ReplyAccess: this.replyAccess,
      ReferenceId: ""
    }

    if (this.postType !== "PARENT") _temp["ReferenceId"] = this.postTypeHelperId_FromParent

    let _content: any = {
      Type: this.threadType,
      Text: this.threadInputText,
      Options: [],
      Files: []
    }

    if (this.threadType === "POLL") {
      _content.Options = [...this.OptionsArray]
    }

    if (this.selectedFile.length > 0) {
      // _content["selectedFile"] = this.selectedFile
      _content["Files"] = [...this.selectedFileBase64]

    }


    // let formData = new FormData()
    // formData.append("authorId","ID")
    // formData.append("type",this.postType)
    // formData.append("replyAccess",this.replyAccess)
    // formData.append("content type",this.threadType)
    // formData.append("content text",this.threadInputText)
    // formData.append("content options",this.options)



    _temp["Content"] = _content
    // _temp["Child"] = this.ChildData



    this.submition.emit(_temp)
  }
}


