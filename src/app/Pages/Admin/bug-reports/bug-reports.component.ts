import { Component } from '@angular/core';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { Store } from '@ngrx/store';
import { IAdminInitialState } from '../../../reducers/Admin/AdminTypes';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';

@Component({
  selector: 'app-bug-reports',
  standalone: true,
  imports: [LoaderComponent,NoDataFoundComponent],
  templateUrl: './bug-reports.component.html',
  styleUrl: './bug-reports.component.scss'
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
