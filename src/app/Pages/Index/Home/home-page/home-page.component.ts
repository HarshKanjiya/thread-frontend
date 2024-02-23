import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { DialogService } from '../../../../Services/dialog.service';
import { Store } from '@ngrx/store';
import { IUserInitialState } from '../../../../reducers/User/UserTypes';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThreadComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  userData: any = null

  constructor(private router: Router, public dialog: DialogService, private store: Store<any>) {
    store.select("User").subscribe((res: IUserInitialState) => {
      this.userData = res.userData
    })
  }

  ngAfterViewInit() {

  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }
}
