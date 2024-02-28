import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { HttpService } from '../../../../Services/http-service.service';
import { ToastService } from '../../../../Services/toast.service';
import { GetPackageById_AdminAPI, UpdatePackage_AdminAPI } from '../../../../Utils/Endpoints';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-view',
  standalone: true,
  imports: [LoaderComponent, FormsModule],
  templateUrl: './package-view.component.html',
})
export class PackageViewComponent {

  loading: boolean = true
  error: any = ""
  packageData: any = null
  tempObj = {
    PackageName: "",
    AccentColor: "",
    Active: false,
    Discount: "",
    PackagePrice: "",
    Perks: []
  }
  editObj = {
    PackageName: { edit: false, loading: false },
    AccentColor: { edit: false, loading: false },
    Active: { edit: false, loading: false },
    Discount: { edit: false, loading: false },
    PackagePrice: { edit: false, loading: false },
    Perks: { edit: false, loading: false }
  }

  constructor(private toast: ToastService, private httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.getPackageInfo(id)
      } else {
        this.router.navigate(['../'])
      }
    });
  }

  getPackageInfo(id: string) {
    this.loading = true
    try {
      this.httpService.get(GetPackageById_AdminAPI + id).subscribe((res: any) => {
        this.loading = false
        console.log('res :>> ', res);
        if (res.Success) {
          this.packageData = res.Data
          this.tempObj = { ...res.Data }
        } else {
          this.error = res.Message
        }
      })
    } catch (err: any) {
      this.loading = false
      this.error = err.message
    }
  }

  enableDisableEdit(key: "PackageName" | "AccentColor" | "Active" | "Discount" | "PackagePrice" | "Perks", bool: boolean) {
    this.editObj[key].edit = bool
  }

  saveChanges(key: "PackageName" | "AccentColor" | "Active" | "Discount" | "PackagePrice" | "Perks",) {
    this.editObj[key].loading = true
    try {
      this.httpService.put(UpdatePackage_AdminAPI + this.packageData.PackageId, this.tempObj).subscribe((res: any) => {
        this.editObj[key].loading = false
        this.editObj[key].edit = false
        console.log('res :>> ', res);
        if (res.Success) {
          this.packageData = res.Data
        } else {
          this.error = res.Message
        }
      })
    } catch (err: any) {
      this.editObj[key].loading = false
      this.editObj[key].edit = false
      this.error = err.message
    }
  }
}
