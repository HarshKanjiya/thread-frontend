import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IReport, IReportCategory } from '../../../Interfaces/IReport';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogService } from '../../../Services/dialog.service';
import { ToastService } from '../../../Services/toast.service';
import { HttpService } from '../../../Services/http-service.service';
import { CustomPopupComponent } from '../../../Components/custom-popup/custom-popup.component';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { Store } from '@ngrx/store';
import { IAdminInitialState } from '../../../reducers/Admin/AdminTypes';
import { CreateReportCategory_AdminAPI, CreateReport_AdminAPI } from '../../../Utils/Endpoints';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [RouterLink, NoDataFoundComponent, CustomPopupComponent, LoaderComponent, FormsModule],
  templateUrl: './reports-config.component.html',
  animations: [
    trigger("dropBody", [
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
export class ReportsConfigComponent {

  categories: IReportCategory[] = []
  selectedCategory: IReportCategory | null = null

  reports: IReport[] = []
  selectedReports: IReport[] = []

  tempCategory: string | null = null
  tempString: string = ""
  reportId: string = ""

  dataForDeletion: any = null

  loading: boolean = true
  tempData: any = null
  tempLoading: boolean = false
  tempCheck: boolean = false
  tempSuccess: boolean = false
  tempMessage: string = ""
  formType: "NEW" | "UPDATE" | "DELETE" = "NEW"
  fieldType: "CATE" | "REPORT" = "CATE"
  constructor(public dialog: DialogService, private toast: ToastService, private http: HttpService, private adminService: AdminService, private store: Store<any>) {
    this.store.select("Admin").subscribe((res: IAdminInitialState) => {
      this.categories = res.reportCategories
      this.reports = res.reports
      this.loading = res.loading
    })
  }

  ngOnInit() {

    this.dialog.closeDialog()

    this.adminService.getReportCategories()
    this.adminService.getReports()
  }

  setSelectedCategory(item: IReportCategory) {
    this.selectedCategory = { ...item }

    this.selectedReports = this.reports.filter((report: IReport) => report.ReportCategoryId === item.ReportCategoryId ? true : false)
  }

  openDialog(FormT: "NEW" | "UPDATE", fieldT: "CATE" | "REPORT", data?: any) {
    this.formType = FormT
    this.fieldType = fieldT

    if (fieldT === "CATE") {
      this.tempString = data?.CategoryName || ''
    } else {
      this.tempString = data?.Text || ''
      if (FormT == "UPDATE") this.reportId = data?.Report
    }

    this.dialog.openDialog("TEMP")
  }

  editReport(report: IReport) {
  }

  itemToBeDeleted: any = null
  deleteItem(Type: "CATE" | "REPORT", item: any) {
    this.formType = "DELETE"
    this.fieldType = Type
    this.itemToBeDeleted = item
    this.dialog.openDialog("TEMP")
  }
  deleteSubmit() {

    this.tempLoading = true

    if (this.fieldType === "CATE") {
      try {
        this.http.delete(CreateReportCategory_AdminAPI + this.selectedCategory?.ReportCategoryId)
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false
                this.categories = this.categories.filter((category: IReportCategory) => category.ReportCategoryId !== res.Data.ReportCategoryId)
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

    } else {
      try {
        this.http.delete(CreateReport_AdminAPI + this.itemToBeDeleted.ReportId)
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false

                this.reports = this.reports.filter((report: IReport) => report.ReportId !== res.Data.ReportId)
                this.selectedReports = this.reports.filter((report: IReport) => report.ReportCategoryId === this.selectedCategory?.ReportCategoryId ? true : false)


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

  }


  addCateReportForm() {
    this.tempLoading = true

    if (this.tempString.trim().length == 0) {
      this.tempCheck = true
      this.tempMessage = "Invalid field value"
      this.tempSuccess = true
      setTimeout(() => {
        this.tempLoading = false
        this.tempCheck = false
      }, 1500);
      return
    }

    if (this.fieldType === "CATE") {
      try {
        this.http.post(CreateReportCategory_AdminAPI, { CategoryName: this.tempString })
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false
                this.categories = [...this.categories, res.Data]
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
    } else {
      try {
        this.http.post(CreateReport_AdminAPI, { text: this.tempString, CategoryId: this.selectedCategory?.ReportCategoryId })
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false
                this.reports = [...this.reports, res.Data]
                this.selectedReports = [...this.selectedReports, res.Data]
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
  }
  submitUpdateForm() {
    this.tempLoading = true

    if (this.tempString.trim().length == 0) {
      this.tempCheck = true
      this.tempMessage = "Invalid field value"
      this.tempSuccess = true
      setTimeout(() => {
        this.tempLoading = false
        this.tempCheck = false
      }, 1500);
      return
    }

    if (this.fieldType === "CATE") {

      try {
        this.http.put(CreateReportCategory_AdminAPI + this.selectedCategory?.ReportCategoryId, { CategoryName: this.tempString })
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false
                this.categories = this.categories.map((category: IReportCategory) => {
                  if (category.ReportCategoryId === res.Data.ReportCategoryId) {
                    return res.Data
                  } else {
                    return category
                  }
                })
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

    } else {
      try {
        this.http.put(CreateReport_AdminAPI + this.reportId, { text: this.tempString, CategoryId: this.selectedCategory?.ReportCategoryId })
          .subscribe((res: any) => {
            this.tempCheck = true
            this.tempMessage = res.Message
            if (res.Success) {
              this.tempSuccess = true
              setTimeout(() => {
                this.tempLoading = false
                this.dialog.closeDialog()
                this.tempSuccess = false

                this.reports = this.reports.map((report: IReport) => {
                  if (report.ReportId == res.Data.ReportId) {
                    return res.Data
                  } else {
                    return report
                  }
                })
                this.selectedReports = this.reports.filter((report: IReport) => report.ReportCategoryId === this.selectedCategory?.ReportCategoryId ? true : false)


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

  }
}
