import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService } from '../../../Services/dialog.service';
import { HttpService } from '../../../Services/http-service.service';
import { ToastService } from '../../../Services/toast.service';
import { AdminService } from '../../../reducers/Admin/Admin.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  constructor(private store: Store<any>, private AdminService: AdminService, private toast: ToastService, public dialog: DialogService, private http: HttpService) { }


  ngOnInit() {
    this.dialog.closeDialog()
  }
  openPopUp() {
    this.dialog.openDialog("TEMP")
  }
}
