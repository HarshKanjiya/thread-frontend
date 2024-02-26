import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-data-found',
  standalone: true,
  imports: [],
  templateUrl: './no-data-found.component.html',
})
export class NoDataFoundComponent {
  @Input() Color: "NEUTRAL" | "GRAY" = 'GRAY';
  @Input() message = 'No Data Found!';
}
