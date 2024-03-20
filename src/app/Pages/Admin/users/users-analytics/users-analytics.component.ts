import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { AdminService } from '../../../../reducers/Admin/Admin.service';
import { Store } from '@ngrx/store';
import { IAdminInitialState } from '../../../../reducers/Admin/AdminTypes';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../Services/http-service.service';
import { getSingleUser_AdminAPI } from '../../../../Utils/Endpoints';

@Component({
  selector: 'app-users-analytics',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent],
  templateUrl: './users-analytics.component.html',
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
export class UsersAnalyticsComponent {
  dataSource : any = {
    userData: {
      data: null,
      loading: false
    }
  }

  constructor(private adminService: AdminService, private http: HttpService, private store: Store<any>, private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getUserData(params['id'])
      }
    });
  }



  getUserData(id: string) {
    try {
      this.dataSource.userData.loading = true
      setTimeout(()=>{
        this.http.get(getSingleUser_AdminAPI + id).subscribe((res: any) => {
          this.dataSource.userData.loading = false
          if (res.Success) {
            this.dataSource.userData.data = res.Data
          }
        })
      },1000)
    } catch (err: any) {
      this.dataSource.userData.loading = false

    }
  }
}
