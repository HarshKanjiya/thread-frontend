import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ImageLoaderComponent } from "../../../../Components/image-loader/image-loader.component";
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { PhoneFormatPipe } from '../../../../Directives/phone-fomrat.directive';
import { HttpService } from '../../../../Services/http-service.service';
import { getSingleUser_AdminAPI, getUserPosts_AdminAPI } from '../../../../Utils/Endpoints';
import { AdminService } from '../../../../reducers/Admin/Admin.service';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { ToastService } from '../../../../Services/toast.service';
import { CarouselComponent } from "../../../../Components/carousel/carousel.component";

@Component({
    selector: 'app-users-analytics',
    standalone: true,
    templateUrl: './users-analytics.component.html',
    animations: [
        trigger("enter", [
            transition(":enter", [
                style({ opacity: 0, transform: "translateY(-20px)" }),
                animate("150ms ease-in-out", style({ opacity: 1, transform: "translateY(0)" }))
            ]),
            transition(":leave", [
                style({ opacity: 1, transform: "translateY(0)" }),
                animate("150ms ease-in-out", style({ opacity: 0, transform: "translateY(20px)" }))
            ])
        ]),
    ],
    imports: [LoaderComponent, NoDataFoundComponent, PhoneFormatPipe, ImageLoaderComponent, CarouselComponent]
})
export class UsersAnalyticsComponent {
  dataSource: any = {
    userData: {
      data: null,
      loading: false
    },
    Posts: {
      data: [],
      loading: false
    },
    Reports: {
      data: [],
      loading: false
    },
  }

  constructor(private adminService: AdminService, private http: HttpService, private route: ActivatedRoute, private toast: ToastService) {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getUserData(params['id'])
        this.getUserPosts(params['id'])
      }
    });
  }



  getUserData(id: string) {
    try {
      this.dataSource.userData.loading = true
      setTimeout(() => {
        this.http.get(getSingleUser_AdminAPI + id).subscribe((res: any) => {
          this.dataSource.userData.loading = false
          if (res.Success) {
            this.dataSource.userData.data = res.Data
          }
        })
      }, 1000)
    } catch (err: any) {
      this.dataSource.userData.loading = false
      this.toast.makeToast('ERROR', err.message ?? "Error loading User's Data")

    }
  }
  getUserPosts(id: string, num: number = 3) {
    try {
      this.dataSource.Posts.loading = true
      setTimeout(() => {
        this.http.get(getUserPosts_AdminAPI + id + "/" + num).subscribe((res: any) => {
          this.dataSource.Posts.loading = false
          if (res.Success) {
            this.dataSource.Posts.data = res.Data
          }
        })
      }, 1000)
    } catch (err: any) {
      this.dataSource.Posts.loading = false
      this.toast.makeToast('ERROR', err.message ?? "Error loading User's Posts")
    }
  }

}
