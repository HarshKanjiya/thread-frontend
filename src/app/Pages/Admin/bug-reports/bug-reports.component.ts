import { Component } from '@angular/core';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { Store } from '@ngrx/store';
import { IAdminInitialState } from '../../../reducers/Admin/AdminTypes';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-bug-reports',
  standalone: true,
  imports: [LoaderComponent,NoDataFoundComponent],
  templateUrl: './bug-reports.component.html',
  animations: [
    trigger("enter", [
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
export class BugReportsComponent {

  reports: any[] = []
  loading: boolean = false

  constructor(private adminService: AdminService, private store: Store<any>) {
    this.store.select("Admin").subscribe((res: IAdminInitialState) => {
      this.reports = res.bugReports
    })
  }

  ngAfterViewInit() {
    this.adminService.getBugReports()
  }

}
