import { Component } from '@angular/core';
import { LoaderComponent } from '../../../Components/loader/loader.component';

@Component({
  selector: 'app-constants',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './constants.component.html',
  styleUrl: './constants.component.scss'
})
export class ConstantsComponent {

  pairs: any[] = [
    { Key: 'STRIPE_PUBLIC', Value: 'wjdnawjukde', VarId: "1" },
    { Key: 'STRIPE_SECRET', Value: 'wjdnawjukde', VarId: "2" },
    { Key: '34gt', Value: 'fsjdfouishfuoehu', VarId: "3" },
    { Key: 'public', Value: 'dsdsdsdsdsdsdsdsd', VarId: "4" },
    { Key: 'private', Value: 'xxxxxxxxxxxxxxxxxxxxxxxxxx', VarId: "5" },
  ];

}
