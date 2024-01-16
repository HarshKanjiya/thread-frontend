import { Component } from '@angular/core';
import { DialogService } from '../../../../Services/dialog.service';
import { ThreadComponent } from '../../../../Components/thread/thread.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThreadComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(public dialog: DialogService) { }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }
}
