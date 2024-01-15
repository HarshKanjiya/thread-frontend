import { Component } from '@angular/core';


@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss'
})
export class SettingPageComponent {

  isPrivacyButtonChecked: boolean = false


  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }

}
