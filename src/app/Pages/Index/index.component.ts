import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';

@Component({
  selector: 'app-admin-subscriptions',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
  <app-header />
  <router-outlet></router-outlet>
  `,
})
export class IndexComponent {
}
