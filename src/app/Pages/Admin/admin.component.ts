import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../../Components/admin-header/admin-header.component';
import { AdminFooterComponent } from '../../Components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-subscriptions',
  standalone: true,
  imports: [RouterOutlet, AdminHeaderComponent, AdminFooterComponent],
  templateUrl:"./admin.component.html" ,
})
export class AdminComponent {
}
