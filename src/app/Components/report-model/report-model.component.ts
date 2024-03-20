import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { ResDTO } from '../../Interfaces/Common';
import { IReport } from '../../Interfaces/IReport';
import { ICategory } from '../../Interfaces/Report';
import { DialogService } from '../../Services/dialog.service';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { getAvailableReportsAPI, getReportCategoriesAPI } from '../../Utils/Endpoints';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-report-model',
  standalone: true,
  imports: [LoaderComponent],
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
    ]),
    trigger("model", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate(

          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0px)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(00px)" }),
        animate(
          "1000ms ease-in-out",
          style({ opacity: 0, transform: "translateY(20px)" })
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

  initialY: number = 0;
  deltaY: number = 0;
  fullScreenModel: boolean = false

  @Output() onCloseClick = new EventEmitter<any>();

  constructor(public dialog: DialogService, private http: HttpService, private toast: ToastService) { }

  ngOnInit(): void {
    this.getReportCategory()
  }


  closeDialog() {
    this.onCloseClick.emit(true)
    this.dialog.closeDialog()
  }
  stopPropagation(e: any) {
    e.stopPropagation()
  }

  getReportCategory() {
    this.loading = true
    try {
      this.http.get(getReportCategoriesAPI).subscribe((res: ResDTO) => {
        this.loading = false
        if (res.Success) {
          this.Categories = res.Data
        } else {
          this.toast.makeToast("ERROR", res.Message ? res.Message : "Please try again")
        }
      })
    } catch (err: any) {
      this.loading = false
      this.toast.makeToast("ERROR", err.message ? err.message : "Please try again")
    }
  }

  getReports(id: string) {
    this.loading = true
    try {
      this.http.get(getAvailableReportsAPI + id).subscribe((res: ResDTO) => {
        this.loading = false
        if (res.Success) {
          this.Reports = res.Data
        } else {
          this.toast.makeToast("ERROR", res.Message ? res.Message : "Please try again")
        }
      })
    } catch (err: any) {
      this.loading = false
      this.toast.makeToast("ERROR", err.message ? err.message : "Please try again")
    }
  }

  // dragEnded(event: any) {
  //   if (event.distance.y < -100) {
  //     this.fullScreenModel = true
  //     console.log('up',);
  //   } else if (event.distance.y > 200) {
  //     console.log('down',);
  //     this.closeDialog()
  //   }
  // }

}
