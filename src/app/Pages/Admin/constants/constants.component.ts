import { Component } from '@angular/core';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { ToastService } from '../../../Services/toast.service';
import { Clipboard } from "@angular/cdk/clipboard"
import { Store } from '@ngrx/store';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomPopupComponent } from '../../../Components/custom-popup/custom-popup.component';
import { DialogService } from '../../../Services/dialog.service';
import { HttpService } from '../../../Services/http-service.service';
import { GetSingleConstant_AdminAPI, SetSingleConstant_AdminAPI } from '../../../Utils/Endpoints';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-constants',
  standalone: true,
  imports: [LoaderComponent, CustomPopupComponent, FormsModule],
  templateUrl: './constants.component.html',

  animations: [
    trigger("initAnim", [
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
    trigger("rotateEnter", [
      transition(":enter", [
        style({ opacity: 0, transform: "rotate(-360deg)" }),
        animate(
          "200ms ease-in-out",
          style({ opacity: 1, transform: "rotate(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "rotate(0deg)" }),
        animate(
          "200ms ease-in-out",
          style({ opacity: 0, transform: "rotate(-180deg)" })
        )
      ])
    ]),

  ]
})
export class ConstantsComponent {

  constructor(private store: Store<any>, private AdminService: AdminService, private toast: ToastService, private clipboard: Clipboard, public dialog: DialogService, private http: HttpService) { }

  pairs: any[] = []
  loading: boolean = false

  tempLoading: boolean = false
  tempCheck: boolean = false
  tempSuccess: boolean = false
  tempMessage: string = ""
  tempMode: "KEYnVALUE" | "VALUE" = "KEYnVALUE"
  tempData: { Key: string, Value: string, SecretKey: boolean } = {
    Key: '',
    Value: '',
    SecretKey: false
  }

  secretKeyLoading: any = {
    STRIPE: false,
    CLOUDINARY: false,
    JWT: false
  }

  defaultConstants = ["STRIPE_PUBLIC", "STRIPE_SECRET", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_SECRET", "MAIL_SERVICE_EMAIL", "JWT_SECRET_KEY"]

  stripePublic: any = {}
  stripeSecret: any = {}
  cloudinaryCloudName: any = {}
  cloudinaryApiKey: any = {}
  cloudinaryApiSecret: any = {}
  mailService: any = {}

  ngOnInit() {
    this.store.select("Admin")
      .subscribe((res: any) => {
        this.loading = res.loading;
        this.pairs = res.constants.filter((pair: any) => this.defaultConstants.indexOf(pair.Key) === -1 ? true : false)
        if (res.constants) {
          this.stripePublic = res.constants.find((x: any) => x.Key === 'STRIPE_PUBLIC' ? true : false);
          this.stripeSecret = res.constants.find((x: any) => x.Key === 'STRIPE_SECRET' ? true : false);

        }
      })
  }

  ngAfterViewInit() {
    this.AdminService.getConstants()
  }

  copyToClipboard(key: string) {
    this.clipboard.copy(key)
    this.toast.makeToast("MESSAGE", "Value copied")
  }

  openPopUp() {
    this.dialog.openDialog("TEMP")
  }
  tempDataSetSecret(bool: boolean) {
    this.tempData.SecretKey = bool
  }

  addNewEnv() {
    this.tempLoading = true
    try {
      this.http.post(SetSingleConstant_AdminAPI, this.tempData)
        .subscribe((res: any) => {
          this.tempCheck = true
          this.tempMessage = res.Message
          if (res.Success) {
            this.tempSuccess = true
            this.pairs.push(res.Data)
            setTimeout(() => {
              this.tempLoading = false
              this.dialog.closeDialog()
              this.tempSuccess = false
            }, 500);
          } else {
            this.tempSuccess = false
            setTimeout(() => {
              this.tempLoading = false
            }, 1500);
          }
        })
    } catch (err: any) {
      this.tempSuccess = false
      this.tempCheck = true
      this.tempMessage = "Something went wrong"
      setTimeout(() => {
        this.tempLoading = false
        this.tempCheck = false
      }, 1500);

    }
  }

  getSecret(type: "STRIPE" | "CLOUDINARY" | "JWT", key: string) {
    switch (type) {
      case "STRIPE":
        this.secretKeyLoading.STRIPE = true
        break
      case "CLOUDINARY":
        this.secretKeyLoading.STRIPE = true
        break
      case "JWT":
        this.secretKeyLoading.STRIPE = true
        break
    }

    try {
      this.http.get(GetSingleConstant_AdminAPI + key).subscribe((res: any) => {
        if (res.Success) {
          this.stripeSecret = res.Data
        } else {
          this.toast.makeToast("WARN", "Value does not exist")
        }
      })
    } catch (err: any) {
      this.toast.makeToast('ERROR', "Falied to Fetch " + type + " SECRET")
      console.log('Error while fetching Value of ' + key + ' :>> ', err?.message);
    }

    switch (type) {
      case "STRIPE":
        this.secretKeyLoading.STRIPE = false
        break
      case "CLOUDINARY":
        this.secretKeyLoading.STRIPE = false
        break
      case "JWT":
        this.secretKeyLoading.STRIPE = false
        break
    }

  }

  updateKey(Var: any) {

  }
  deleteKey(VarId: any) {

  }

}
