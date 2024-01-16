import { trigger, transition, style, animate, sequence, state } from '@angular/animations';
import { Component } from '@angular/core';
import { PrivacyTabComponent } from './privacy-tab/privacy-tab.component';
import { AccountsTabComponent } from './accounts-tab/accounts-tab.component';
import { HelpTabComponent } from './help-tab/help-tab.component';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [PrivacyTabComponent, AccountsTabComponent, HelpTabComponent],
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

  selectedTab: "PRIVACY" | "ACCOUNT" | "HELP" = "PRIVACY"


  setSelectedTab(val: "PRIVACY" | "ACCOUNT" | "HELP") {
    this.selectedTab = val
  }



}
