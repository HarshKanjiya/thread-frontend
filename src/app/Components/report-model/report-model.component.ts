import { Component, EventEmitter, Output } from '@angular/core';
import { ResDTO } from '../../Interfaces/Common';
import { IReport } from '../../Interfaces/IReport';
import { ICategory } from '../../Interfaces/Report';
import { DialogService } from '../../Services/dialog.service';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { getAvailableReportsAPI, getReportCategoriesAPI } from '../../Utils/Endpoints';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-report-model',
  standalone: true,
  imports: [],
  templateUrl: './report-model.component.html',
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.97)" }),
        animate(

          "150ms ease-in-out",
          style({ opacity: 1, transform: "scale(1)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "scale(1)" }),
        animate(
          "1000ms ease-in-out",
          style({ opacity: 0, transform: "scale(0.97)" })
        )
      ])
    ])
  ]
})
export class ReportModelComponent {

  loading: boolean = false
  success: boolean = false
  message: string | null = null
  Categories: ICategory[] = []
  Reports: IReport[] = []

  @Output()  onClose = new EventEmitter<any>();

  constructor(public dialog: DialogService, private http: HttpService, private toast: ToastService) { }

  allowAddToThread: boolean = true


  closeDialog() {
    this.dialog.closeDialog()
    this.onClose.emit(true)
  }


  stopPropagation(e: any) {
    e.stopPropagation()
  }

  getReportCategory() {
    this.loading = true
    try {
      this.http.get(getReportCategoriesAPI).subscribe((res: ResDTO) => {
        if (res.Success) {
          this.Categories = res.Data
        } else {
          this.toast.makeToast("ERROR", res.Message ? res.Message : "Please try again")
        }
      })
    } catch (err: any) {
      this.toast.makeToast("ERROR", err.message ? err.message : "Please try again")
    }
  }

  getReports(id: string) {
    this.loading = true
    try {
      this.http.get(getAvailableReportsAPI + id).subscribe((res: ResDTO) => {
        if (res.Success) {
          this.Reports = res.Data
        } else {
          this.toast.makeToast("ERROR", res.Message ? res.Message : "Please try again")
        }
      })
    } catch (err: any) {
      this.toast.makeToast("ERROR", err.message ? err.message : "Please try again")
    }
  }
}
