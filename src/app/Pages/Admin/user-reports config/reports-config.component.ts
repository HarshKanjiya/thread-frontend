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

  tempData: any = null
  tempLoading: boolean = false
  tempCheck: boolean = false
  tempSuccess: boolean = false
  tempMessage: string = ""
  formType: "NEW" | "UPDATE" = "NEW"
  fieldType: "CATE" | "REPORT" = "CATE"
  constructor(public dialog: DialogService, private toast: ToastService, private http: HttpService) { }

  ngOnInit() {

    this.dialog.closeDialog()

    this.categories = [
      { ReportCategoryId: "1", CategoryName: "one" },
      { ReportCategoryId: "2", CategoryName: "two" },
      { ReportCategoryId: "3", CategoryName: "three" },
      { ReportCategoryId: "4", CategoryName: "fourth" },
    ]
    this.reports = [
      { ReportCategoryId: "1", ReportId: "1", Text: "report type 1" },
      { ReportCategoryId: "1", ReportId: "2", Text: "report type 2" },
      { ReportCategoryId: "1", ReportId: "3", Text: "report type 3" },
      { ReportCategoryId: "1", ReportId: "4", Text: "report type 4" },
      { ReportCategoryId: "2", ReportId: "5", Text: "report type 5" },
      { ReportCategoryId: "3", ReportId: "6", Text: "report type 6" },
      { ReportCategoryId: "3", ReportId: "7", Text: "report type 7" },
      { ReportCategoryId: "3", ReportId: "8", Text: "report type 8" },
      { ReportCategoryId: "4", ReportId: "7", Text: "report type 9" },
      { ReportCategoryId: "4", ReportId: "8", Text: "report type 10" },
    ]
  }

  setSelectedCategory(item: IReportCategory) {
    this.selectedCategory = { ...item }
    this.selectedReports = this.reports.filter((report: IReport) => report.ReportCategoryId === item.ReportCategoryId ? true : false)
  }

  openDialog(FormT: "NEW" | "UPDATE", fieldT: "CATE" | "REPORT", data?: any) {
    this.formType = FormT
    this.fieldType = fieldT

    if (fieldT === "CATE") {
      this.tempString = data.CategoryName || ''
    } else {
      this.tempString = data.Text || ''
    }

    this.dialog.openDialog("TEMP")
  }

  editReport(report: IReport) {

  }

  deleteItem(Type: "CATE" | "REPO", Id: any) {

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

      setTimeout(() => {

        this.tempCheck = true
        this.tempSuccess = true
        this.tempMessage = "qwerty"
        setTimeout(() => {

          this.tempLoading = false
          this.dialog.closeDialog()
          this.tempString = ""
          this.tempData = null

        }, 1500);

      }, 1500);

    } else {
      // new report
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
