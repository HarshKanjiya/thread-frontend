import { Component } from '@angular/core';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../util/no-data-found/no-data-found.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-subscriptions',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent],
  templateUrl: './admin-subscriptions.component.html',
  styleUrl: './admin-subscriptions.component.scss',
  animations: [
    trigger("enter", [
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
export class AdminSubscriptionsComponent {

  data: any[] = []
  loading: boolean = false
}
