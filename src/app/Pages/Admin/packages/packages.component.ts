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

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [NoDataFoundComponent, LoaderComponent,RouterLink],
  templateUrl: './packages.component.html',
  animations:[
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
          style({ opacity: 0, transform: "translateY(20px)" })
        )
      ])
    ]),
  ]
})
export class PackagesComponent {

  loading: boolean = false

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


}
