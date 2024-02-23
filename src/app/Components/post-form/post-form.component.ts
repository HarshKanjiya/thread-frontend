import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';



@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule, TextareaAutoresizeDirective, DropdownComponent], templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  @Input() PostType_FromParent: string | null = null
  @Input() postTypeHelperId_FromParent: string | null = null
  @Input() allowAddToThread: boolean = false
  @Input() childLevel: number = 1
  @Input() userData: any = null

  ngOnInit() {
    this.childLevel++
  }

  @Output() submition = new EventEmitter<any>()
  @Output() submitionFromChild = new EventEmitter<any>()
  @Output() RemoveMe = new EventEmitter<any>()

  threadInputText: string = ""
  count: number = 0

  AddToThreadButton: boolean = false

  threadType: "TEXT" | "POLL" = "TEXT"

  replyAccess: "ANY" | "FOLLOWING" | "MENTIONED" | "NONE" = "ANY"

  postType: "PARENT" | "REPLY" | "REPOST" = "REPLY"
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


  constructor(public dialog: DialogService) { }


  changeNewThread() {
    this.AddToThreadButton = !this.AddToThreadButton
  }

  RemoveMeHandler() {
    this.RemoveMe.emit(this.childLevel)
  }

  removeMeFromChildThread(lev: any) {
    this.AddToThreadButton = false
    this.RemoveMe.emit(lev)
  }

  textAreaCounter(e: any) {
    this.count = e.target.value.length

    if (e.target.value.length > 0) {
      this.allowAddToThread = true
    } else {
      this.allowAddToThread = false
    }
    this.SubmitThread()
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
    this.SubmitThread()
  }

  removeOption(id: string) {
    this.OptionsArray = this.OptionsArray.filter((i: any) => i.OptionId !== id ? true : false)
    this.SubmitThread()
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
    this.SubmitThread()
  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }

  // onFileChangeChild(event: any) {

  //   const fileList: File[] = event.target.files;

  //   for (let key in fileList) {
  //     if (fileList.hasOwnProperty(key)) {
  //       this.selectedFile.push(fileList[key])
  //     }
  //   }
  //   this.getFileAsBase64(event)

  //   this.SubmitThread()
  // }

  // getFileAsBase64(event: any) {
  //   const input = event.target;
  //   const files = input.files && input.files.length > 0 ? input.files : null;

  //   if (files) {
  //     let _temp: any[] = []
  //     let rawFiles: any[] = []

  //     for (let key in files) {
  //       if (files.hasOwnProperty(key)) {
  //         rawFiles.push(files[key])
  //       }
  //     }

  //     const promises = rawFiles.map((file: File) => {

  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           _temp = [..._temp, reader.result as string]
  //           resolve(reader.result as string)
  //         };
  //         reader.readAsDataURL(file);
  //       })
  //     })

  //     Promise.all(promises).then((res: any) => {
  //       this.selectedFileBase64 = [...this.selectedFileBase64, ...res]
  //       console.log('this.sele  :>> ', this.selectedFileBase64);
  //     })

  //   }
  // }

  // removeFile(index: number) {

  //   this.selectedFile = [...this.selectedFile.slice(0, index), ...this.selectedFile.slice(index + 1)]
  //   this.selectedFileBase64 = [...this.selectedFileBase64.slice(0, index), ...this.selectedFileBase64.slice(index + 1)]


  //   this.SubmitThread()
  // }


  childSubmissionHandler(e: any) {
    this.submitionFromChild.emit(e)
  }

  SubmitThread() {
    let _temp: any = {
      AuthorId: this.userData.UserId,
      Type: this.postType,
      ReplyAccess: "ANY",
      ReferenceId: ""
    }

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

    this.submitionFromChild.emit({ data: _temp, level: this.childLevel })
  }
}
