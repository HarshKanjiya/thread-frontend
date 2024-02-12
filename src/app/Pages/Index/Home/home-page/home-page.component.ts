import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadComponent } from '../../../../Components/thread/thread.component';
import { DialogService } from '../../../../Services/dialog.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThreadComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  constructor(private router: Router, public dialog: DialogService) {
  }

  ngAfterViewInit() {

  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }
}
