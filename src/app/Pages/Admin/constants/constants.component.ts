import { Component } from '@angular/core';
import { LoaderComponent } from '../../../Components/loader/loader.component';
import { ToastService } from '../../../Services/toast.service';
import { Clipboard } from "@angular/cdk/clipboard"
import { Store } from '@ngrx/store';
import { AdminService } from '../../../reducers/Admin/Admin.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-constants',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './constants.component.html',
  styleUrl: './constants.component.scss',

  animations: [
    trigger("initAnim", [
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
          style({ opacity: 0, transform: "translateY(-20px)" })
        )
      ])
    ]),

  ]
})
export class ConstantsComponent {

  constructor(private store: Store<any>, private AdminService: AdminService, private toast: ToastService, private clipboard: Clipboard) { }

  pairs: any[] = []
  loading: boolean = false

  stripePublic = { Key: "PUBLIC", Value: "pk_test_51MJHH2SJrXTOQfCq2W2IWqErlyaEbegdTz0YL2g6VaUOrCjEEDc5niisblnhr26qRnr1PSn4AiXRd36gFhHVHVpk00eF5npr4T" }
  stripeSecret = { Key: "SECRET", Value: "sk_test_51MJHH2SJrXTOQfCqrCQccjqsRlwuRAxrYio4MV0mhz8QNYFT9tWY0eChcEuLErZWUpPtRRAjo6TiZmHqAnqVN9eS00SUd76mLi" }
  cloudinaryCloudName = { Key: "CLOUD", Value: "dgusfxr13" }
  cloudinaryApiKey = { Key: "API KEY", Value: "992548565254586" }
  cloudinaryApiSecret = { Key: "SECRET", Value: "Lgwv2oX4I6JuspZflPPH3QqHcPs" }
  mailService = { Key: "MAIL", Value: "harshkanjiyaotp@gmail.com" }

  ngOnInit() {
    this.store.select("Admin")
      .subscribe((res: any) => {
        this.pairs = res.constants;
        this.loading = res.loading;
      })
  }

  ngAfterViewInit() {
    this.AdminService.getConstants()
  }

  copyToClipboard(key: string) {
    this.clipboard.copy(key)
    this.toast.makeToast("MESSAGE", "Text copied")
  }

}
