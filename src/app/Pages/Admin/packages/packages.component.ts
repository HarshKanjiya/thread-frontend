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

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [NoDataFoundComponent, LoaderComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
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
