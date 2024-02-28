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

  dataForDeletion: any = null

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
    })
  }

  ngOnInit() {

    this.dialog.closeDialog()

    this.adminService.getReportCategories()
    this.adminService.getReports()

    // this.categories = [
    //   { ReportCategoryId: "1", CategoryName: "one" },
    //   { ReportCategoryId: "2", CategoryName: "two" },
    //   { ReportCategoryId: "3", CategoryName: "three" },
    //   { ReportCategoryId: "4", CategoryName: "fourth" },
    // ]
    // this.reports = [
    //   { ReportCategoryId: "1", ReportId: "1", Text: "report type 1" },
    //   { ReportCategoryId: "1", ReportId: "2", Text: "report type 2" },
    //   { ReportCategoryId: "1", ReportId: "3", Text: "report type 3" },
    //   { ReportCategoryId: "1", ReportId: "4", Text: "report type 4" },
    //   { ReportCategoryId: "2", ReportId: "5", Text: "report type 5" },
    //   { ReportCategoryId: "3", ReportId: "6", Text: "report type 6" },
    //   { ReportCategoryId: "3", ReportId: "7", Text: "report type 7" },
    //   { ReportCategoryId: "3", ReportId: "8", Text: "report type 8" },
    //   { ReportCategoryId: "4", ReportId: "7", Text: "report type 9" },
    //   { ReportCategoryId: "4", ReportId: "8", Text: "report type 10" },
    // ]
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
    }

    this.dialog.openDialog("TEMP")
  }

  editReport(report: IReport) {
  }

  deleteItem(Type: "CATE" | "REPORT", item: any) {
    this.formType = "DELETE"
    this.fieldType = Type
    this.dialog.closeDialog()
  }
  deleteSubmit() {

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
      // new category



      // setTimeout(() => {

      //   this.tempCheck = true
      //   this.tempSuccess = true
      //   this.tempMessage = "qwerty"
      //   setTimeout(() => {

      //     this.tempLoading = false
      //     this.dialog.closeDialog()
      //     this.tempString = ""
      //     this.tempData = null

      //   }, 1500);

      // }, 1500);

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
                this.categories.push(res.Data)
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
      // new report
      // setTimeout(() => {

      //   this.tempCheck = true
      //   this.tempMessage = "qwerty"
      //   setTimeout(() => {

      //     this.tempLoading = false
      //     this.dialog.closeDialog()
      //     this.tempSuccess = true
      //     this.tempString = ""
      //     this.tempData = null
      //   }, 1500);
      // }, 1500);
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
                this.categories.push(res.Data)
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

    console.log('object :>> ', this.tempString);
    console.log('object :>> ', this.tempData);

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
      // category
      setTimeout(() => {

        this.tempCheck = true
        this.tempMessage = "qwerty"
        setTimeout(() => {

          this.tempLoading = false
          this.dialog.closeDialog()
          this.tempSuccess = true
          this.tempString = ""
          this.tempData = null

        }, 1500);

      }, 1500);
    } else {
      //  report
      setTimeout(() => {

        this.tempCheck = true
        this.tempMessage = "qwerty"
        setTimeout(() => {

          this.tempLoading = false
          this.dialog.closeDialog()
          this.tempSuccess = true
          this.tempString = ""
          this.tempData = null

        }, 1500);

      }, 1500);
    }

  }
}
