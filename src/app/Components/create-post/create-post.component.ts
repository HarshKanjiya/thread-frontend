import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Type, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { PostFormComponent } from '../post-form/post-form.component';


interface IOptionType {
  option: string,
  id: number
}



const defaultOptions = [{ id: 0, option: "Yes" }, { id: 1, option: "No" }]

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

  @Output() submition = new EventEmitter<any>()

  threadInputText: string = ""
  count: number = 0

  AddToThreadButton: boolean = false

  threadType: "TEXT" | "POLL" = "TEXT"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" | "NONE" = "ANY"

  postType: "PARENT" | "CHILD" | "QUOTE" | "REPOST" = "PARENT"
  postTypeHelperId: string | null = null

  options: IOptionType[] = defaultOptions
  optionsObject: any = {}


  replyOptions = ["Any one", "Following", "Mentioned", "None"]
  replyOptionsMap = {
    "Any one": "ANY", "Following": "FOLLOWING", "Mentioned": "MENTIONED", "None": "NONE"
  }

  selectedReplyOption: "Any one" | "Following" | "Mentioned" | "None" = "Any one"

  selectedFile: File[] = [];
  selectedFileBase64: string[] = []

  dataBeforeSubmit: any[] = []

  formDisable: boolean = false

  constructor(public dialog: DialogService) { }


  changeNewThread() {
    this.AddToThreadButton = !this.AddToThreadButton
  }

  removeMeFromChildThread(e: boolean) {
    this.AddToThreadButton = e
  }

  textAreaCounter(e: any) {
    this.count = e.target.value.trim().length

    if (e.target.value.trim().length === 0) {
      this.formDisable = true
    } else{
      this.formDisable = false
    }
  }

  addOption() {
    this.options.push({ id: this.options.length, option: "" })

    if (Object.keys(this.optionsObject).length < 4) {

      this.optionsObject[`0 option ${Object.keys(this.optionsObject).length}`] = ""
    }

    console.log(this.optionsObject);
    console.log(this.options);
  }
  removeOption(id: number) {

    console.log('id :>> ', id);
    this.options = this.options.filter((i: IOptionType) => i.id !== id)
    console.log('id :>> ', this.options);

    delete this.optionsObject[`0 option ${id}`]
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
    if (type === "POLL") {
      this.options = defaultOptions
      this.optionsObject[`0 option 0`] = "Yes"
      this.optionsObject[`0 option 1`] = "No"
    } else {
      this.optionsObject = {}
      this.options = []
    }
    this.threadType = type

    this.SubmitThread()
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


  validationHandler(e:any) {
    if (e.target.value.trim().length === 0) {
      this.formDisable = true
    } else {
      this.formDisable = false
    }
}

  childSubmissionHandler(event: any) {


    let _temp = [...this.dataBeforeSubmit]

    _temp = _temp.filter((i: any) => i.level !== event.level)

    _temp.push(event)

    this.dataBeforeSubmit = _temp

    let bool = true

    this.dataBeforeSubmit.map((item: any) => {
      for (let key in item.content) {
        if (item.content.hasOwnProperty(key)) {

          if (item.content.text.trim().length === 0) {
            bool = false
            return
          }

          if (item.content.type === "POLL") {

            let options = item.content.options

            for (let opt in options){
              if (options.hasOwnProperty(opt)) {
                if (options[opt].trim().length === 0){
                  bool = false
                  return
                }
              }
            }
          }
        }
      }
    })
  }



  SubmitThread() {
    let _temp: any = {
      authorId: "ID",
      type: this.postType,
      replyAccess: this.replyAccess,
    }

    if (this.postType !== "PARENT") _temp["typeHelperId"] = this.postTypeHelperId

    let _content: any = {
      type: this.threadType,
      text: this.threadInputText
    }

    if (this.threadType === "POLL") {
      _content["options"] = this.optionsObject
    }

    if (this.selectedFile.length > 0) {
      _content["selectedFile"] = this.selectedFile
      _content["selectedFileBase64"] = this.selectedFileBase64

    }


    // let formData = new FormData()
    // formData.append("authorId","ID")
    // formData.append("type",this.postType)
    // formData.append("replyAccess",this.replyAccess)
    // formData.append("content type",this.threadType)
    // formData.append("content text",this.threadInputText)
    // formData.append("content options",this.options)



    _temp["content"] = _content
    _temp["child"] = this.dataBeforeSubmit



    this.submition.emit(_temp)
  }
}


