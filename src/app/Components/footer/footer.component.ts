import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private themeService: ThemeService) {
  }

  changeTheme() {
    this.themeService.darkTheme.set(!this.themeService.darkTheme())
  }
}
