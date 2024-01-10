import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../../Components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-subscriptions',
  standalone: true,
  imports: [RouterOutlet, AdminHeaderComponent],
  template: `
  <app-admin-header/>
  <router-outlet></router-outlet>
  `,
})
export class AdminComponent {
}
