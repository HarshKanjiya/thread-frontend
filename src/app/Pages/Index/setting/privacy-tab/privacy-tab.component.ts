import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-tab',
  standalone: true,
  imports: [],
  templateUrl: './privacy-tab.component.html',
  styleUrl: './privacy-tab.component.scss',
})
export class PrivacyTabComponent {
  isPrivacyButtonChecked: boolean = false


  PrivacyProtactionHandler() {
    this.isPrivacyButtonChecked = !this.isPrivacyButtonChecked
  }


}
