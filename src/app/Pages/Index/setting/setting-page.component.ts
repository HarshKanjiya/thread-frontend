import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss',
  animations: [
    trigger("body", [
      transition(":enter", [
        style({ opacity: 0, }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, })
        )
      ])
    ])
  ]
})
export class SettingPageComponent {

  isPrivacyButtonChecked: boolean = false
  selectedTab: "PRIVACY" | "ACCOUNT" | "HELP" = "ACCOUNT"


  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

  setSelectedTab(val: "PRIVACY" | "ACCOUNT" | "HELP") {
    this.selectedTab = val
  }

}
