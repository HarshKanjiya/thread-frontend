import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { Store } from '@ngrx/store';
import { IAdminInitialState } from '../../../reducers/Admin/AdminTypes';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [RouterLink,LoaderComponent,NoDataFoundComponent],
  templateUrl: './user-reports.component.html',
})
export class UserReportsComponent {

  Reports: any[] = []
  loading: boolean = false
  constructor(private adminReports: AdminService, private store: Store<any>) { }

  ngOnInit() {
    this.store.select("Admin").subscribe((res: IAdminInitialState) => {
      this.Reports = res.userReports
      this.loading = res.loading
    })
  }
}
