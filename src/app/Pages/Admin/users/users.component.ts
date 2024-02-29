import { Component } from '@angular/core';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../Services/http-service.service';
import { ToastService } from '../../../Services/toast.service';
import { getUsers_AdminAPI } from '../../../Utils/Endpoints';
import { UsersTableViewComponent } from './users-table-view/users-table-view.component';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NoDataFoundComponent, LoaderComponent, FormsModule, UsersTableViewComponent, UsersListViewComponent],
  templateUrl: './users.component.html',
  animations: [
    trigger("initAnim", [
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
export class UsersComponent {
  loading: boolean = false;
  users: any[] = []

  filterType: "UNBAN" | "BAN" | "ALL" = "UNBAN"
  view: "LIST" | "TABLE" = "LIST";

  constructor(private http: HttpService, private toast: ToastService) { }

  ngOnInit() {
    this.getUsers()
  }
  ngAfterViewInit() {

  }

  getUsers() {
    this.loading = true
    try {
      this.http.get(getUsers_AdminAPI + this.filterType.toLocaleLowerCase()).subscribe((res: any) => {
        this.loading = false
        if (res.Success) {
          this.users = res.Data
        } else {
          this.toast.makeToast("ERROR", res.message || "Something went wrong")
        }
      })
    } catch (err: any) {
      this.loading = false
      this.toast.makeToast('ERROR', err.message || "Something went wrong")
    }
  }

  setFilterType(type: "UNBAN" | "BAN" | "ALL") {
    this.filterType = type
    this.getUsers()
  }

}
