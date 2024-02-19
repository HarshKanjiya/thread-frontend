import { Component, Signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
  animations: [
    trigger("themeSwitch", [
      transition(":enter", [
        style({ opacity: 0, transform: "rotate(180deg)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "rotate(0deg)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, transform: "rotate(180deg)" })
        )
      ])
    ]),

  ]
})
export class AdminHeaderComponent {

  currentTheme: Signal<boolean> = computed(() => this.theme.darkTheme())

  constructor(public theme: ThemeService) {
  }

  changeTheme() {
    this.theme.darkTheme.set(!this.theme.darkTheme())
  }


}
