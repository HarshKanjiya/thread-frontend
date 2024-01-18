import { trigger, transition, style, animate, sequence, state } from '@angular/animations';
import { Component } from '@angular/core';
import { PrivacyTabComponent } from './privacy-tab/privacy-tab.component';
import { AccountsTabComponent } from './accounts-tab/accounts-tab.component';
import { SecurityTabComponent } from './security-tab/security-tab.component';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [PrivacyTabComponent, AccountsTabComponent, SecurityTabComponent],
  templateUrl: './setting-page.component.html',
  animations: [
    trigger("body", [
      transition(":enter", [
        sequence([
          style({ opacity: 0, top: -20 }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 1, top: 0 })
          )
        ])
      ]),
      transition(":leave", [
        sequence([
          style({ opacity: 1, top: 0 }),
          animate(
            "200ms  ease-in-out",
            style({ opacity: 0, top: 20 })
          )
        ])
      ])
    ])
  ]
})
export class SettingPageComponent {

  selectedTab: "PRIVACY" | "ACCOUNT" | "SECURITY" = "ACCOUNT"


  setSelectedTab(val: "PRIVACY" | "ACCOUNT" | "SECURITY") {
    this.selectedTab = val
  }



}
