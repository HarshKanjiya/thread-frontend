import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-data-found',
  standalone: true,
  imports: [],
  templateUrl: './no-data-found.component.html',
})
export class NoDataFoundComponent {
@Input() message = 'No Data Found!';
}
