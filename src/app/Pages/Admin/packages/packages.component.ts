import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from '../../../Services/dialog.service';
import { HttpService } from '../../../Services/http-service.service';
import { ToastService } from '../../../Services/toast.service';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { IPackage } from '../../../Interfaces/IPackages';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';
import { IAdminInitialState } from '../../../reducers/Admin/AdminTypes';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { CustomPopupComponent } from '../../../Components/custom-popup/custom-popup.component';
import { FormsModule } from '@angular/forms';
import { AddPackage_AdminAPI } from '../../../Utils/Endpoints';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [NoDataFoundComponent, LoaderComponent, RouterLink, CustomPopupComponent, FormsModule],
  templateUrl: './packages.component.html',
  animations: [
    trigger("initAnim", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
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
export class PackagesComponent {

  loading: boolean = false
  tempLoading: boolean = false
  tempCheck: boolean = false
  tempSuccess: boolean = false
  tempMessage: string = ""

  tempData = {
    PackageName: "",
    PackagePrice: "",
    Discount: "",
    AccentColor: ""
  }

  constructor(private store: Store<any>, private admin: AdminService, private toast: ToastService, public dialog: DialogService, private http: HttpService) {
    store.select("Admin").subscribe((res: IAdminInitialState) => {
      this.loading = res.loading
      this.packages = res.packages
    })
  }

  filterType: "ALL" | "ACTIVE" | "INACTIVE" | "DRAFTS" = "ACTIVE"
  packages: IPackage[] = []
  ngOnInit() {
    this.dialog.closeDialog()
    this.admin.getAllPackages(this.filterType.toLocaleLowerCase())
  }
  openPopUp() {
    this.dialog.openDialog("TEMP")
  }

  setFilterType(type: "ALL" | "ACTIVE" | "INACTIVE" | "DRAFTS") {
    if (this.filterType !== type) {
      this.filterType = type
      this.admin.getAllPackages(this.filterType.toLocaleLowerCase())
    }
  }

  addPackage() {
    this.tempLoading = true
    try {
      this.http.post(AddPackage_AdminAPI, this.tempData)
        .subscribe((res: any) => {
          this.tempCheck = true
          this.tempMessage = res.Message
          if (res.Success) {
            this.tempSuccess = true
            setTimeout(() => {
              this.tempLoading = false
              this.dialog.closeDialog()
              this.tempSuccess = false
              if (this.filterType == "DRAFTS") this.packages = [...this.packages, res.Data]
            }, 1500);
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

  closeDialog() {
    this.tempData = {
      PackageName: "",
      PackagePrice: "",
      Discount: "",
      AccentColor: ""
    }
    this.dialog.closeDialog()
  }

}
