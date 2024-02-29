import { Component } from '@angular/core';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';

@Component({
  selector: 'app-admin-subscriptions',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent],
  templateUrl: './admin-subscriptions.component.html',
  styleUrl: './admin-subscriptions.component.scss'
})
export class AdminSubscriptionsComponent {

  data: any[] = []
  loading: boolean = false
}
