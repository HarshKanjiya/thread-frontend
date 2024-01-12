import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';


interface IOptionType {
  option: string,
  id: number
}



const defaultOptions = [{ id: 0, option: "Yes" }, { id: 1, option: "No" }]

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule, TextareaAutoresizeDirective, DropdownComponent], templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  @Input() PostType_FromParent: string | null = null
  @Input() postTypeHelperId_FromParent: string | null = null
  @Input() allowAddToThread: boolean = true
  @Input() childLevel: number = 1

  ngOnInit() {
    this.childLevel++
  }

  @Output() submition = new EventEmitter<any>()
  @Output() submitionFromChild = new EventEmitter<any>()
  @Output() RemoveMe = new EventEmitter<boolean>()

  threadInputText: string = ""
  count: number = 0

  AddToThreadButton: boolean = false

  threadType: "TEXT" | "POLL" = "TEXT"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" | "NONE" = "ANY"

  postType: "PARENT" | "CHILD" | "QUOTE" | "REPOST" = "CHILD"
  postTypeHelperId: string | null = null

  options: IOptionType[] = defaultOptions

  replyOptions = ["Any one", "Following", "Mentioned", "None"]
  replyOptionsMap = {
    "Any one": "ANY", "Following": "FOLLOWING", "Mentioned": "MENTIONED", "None": "NONE"
  }

  selectedReplyOption: "Any one" | "Following" | "Mentioned" | "None" = "Any one"

  selectedFile: File[] = [];
  selectedFileBase64: string[] = []


  constructor(public dialog: DialogService) { }


  changeNewThread() {
    this.AddToThreadButton = !this.AddToThreadButton
  }

  RemoveMeHandler() {
    this.RemoveMe.emit(false)
  }

  removeMeFromChildThread(e: boolean) {
    this.AddToThreadButton = e
  }

  textAreaCounter(e: any) {
    this.count = e.target.value.length

    this.SubmitThread()
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

    this.SubmitThread()
  }

  changeSelectedReplyOption(e: any) {
    this.replyAccess = e.code
    this.selectedReplyOption = e.label

    this.SubmitThread()
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

    this.SubmitThread()
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
        console.log('this.sele  :>> ', this.selectedFileBase64);
      })

    }
  }

  removeFile(index: number) {

    this.selectedFile = [...this.selectedFile.slice(0, index), ...this.selectedFile.slice(index + 1)]
    this.selectedFileBase64 = [...this.selectedFileBase64.slice(0, index), ...this.selectedFileBase64.slice(index + 1)]


    this.SubmitThread()
  }


  childSubmissionHandler(e: any) {
    console.log('e :>> ', e);
    this.submitionFromChild.emit(e)
  }

  SubmitThread() {
    let _temp: any = {
      level: this.childLevel,
      authorId: "ID",
      type: this.postType,
    }

    if (this.postType !== "PARENT") _temp["typeHelperId"] = this.postTypeHelperId

    let _content: any = {
      type: this.threadType,
      text: this.threadInputText
    }

    if (this.threadType === "POLL") {
      _content["options"] = this.options
    }

    if (this.selectedFile.length > 0) {
      _content["selectedFile"] = this.selectedFile
    }


    // let formData = new FormData()
    // formData.append("authorId","ID")
    // formData.append("type",this.postType)
    // formData.append("replyAccess",this.replyAccess)
    // formData.append("content type",this.threadType)
    // formData.append("content text",this.threadInputText)
    // formData.append("content options",this.options)



    _temp["content"] = _content

    this.submitionFromChild.emit(_temp)
  }
}
