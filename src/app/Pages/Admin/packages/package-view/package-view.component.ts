import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { HttpService } from '../../../../Services/http-service.service';
import { ToastService } from '../../../../Services/toast.service';
import { GetPackageById_AdminAPI, UpdatePackage_AdminAPI } from '../../../../Utils/Endpoints';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-package-view',
  standalone: true,
  imports: [LoaderComponent, FormsModule],
  templateUrl: './package-view.component.html',
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
          style({ opacity: 0, transform: "translateY(20px)" })
        )
      ])
    ]),
  ]
})
export class PackageViewComponent {

  loading: boolean = true
  error: any = ""
  packageData: any = null
  tempObj: any = {
    PackageName: "",
    AccentColor: "",
    Active: false,
    Discount: "",
    PackagePrice: "",
    Perks: [],
    Published: false
  }
  tempPerks: string[] = []
  perksChanged:boolean = false

  editObj: any = {
    PackageName: { edit: false, loading: false },
    PackagePrice: { edit: false, loading: false },
    Discount: { edit: false, loading: false },
    AccentColor: { edit: false, loading: false },
    Perks: { edit: false, loading: false },
    PerksChild: [],
    Active: { edit: false, loading: false },
    Published: { edit: false, loading: false },
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
          this.tempPerks = [...res.Data.Perks]

          this.editObj.PerksChild = res.Data.Perks.map((i: any) => ({ edit: false }))
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
    if (!bool) {
      this.tempObj = { ...this.packageData }
    }

    if (key === "Perks") {
      this.editObj.PerksChild?.map(((i: any) => i.edit = false))
    }

  }

  saveChanges(key: "PackageName" | "AccentColor" | "Active" | "Discount" | "PackagePrice" | "Perks" | "Published",) {
    this.editObj[key].loading = true
    try {

      if (key === "Published") {
        if (this.tempObj.Published) {
          this.tempObj.Published = false
        } else {
          this.tempObj.Published = true
          this.tempObj.Active = true
        }
      }
      if (key === "Active") {
        if (this.tempObj.Active) {
          this.tempObj.Active = false
          this.tempObj.Published = false
        } else {
          this.tempObj.Active = true
        }
      }

      if (key === "Perks") {
        this.tempObj.Perks = this.tempPerks
      }

      this.httpService.put(UpdatePackage_AdminAPI + this.packageData.PackageId, this.tempObj).subscribe((res: any) => {
        this.editObj[key].loading = false
        this.editObj[key].edit = false

        if (key === "Perks") {
          this.editObj.PerksChild?.map(((i: any) => i.edit = false))
        }

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

  publishPackage() {
    this.saveChanges("Published")
  }

  archivePackage() {
    this.saveChanges("Active")
  }

  addFieldToPerks() {
    this.tempObj.Perks?.push("")
    this.editObj.PerksChild?.push({ edit: false })
  }
  removePerk(index: number) {
    this.tempObj.Perks?.splice(index, 1)
    this.editObj.PerksChild.splice(index, 1)
  }
  enablePerksEdit(index: number, bool: boolean) {
    if (bool) {
      this.editObj.PerksChild[index].edit = bool
    } else {
      this.editObj.PerksChild[index].edit = bool
      this.tempPerks = [...this.packageData.Perks]
    }
  }
  savePerksEdit(index: number) {
    this.editObj.PerksChild[index].edit = false

  }
}
