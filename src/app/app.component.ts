import { Component, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './Services/theme.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private themeService: ThemeService) { }

  @HostBinding("class.dark") get mode() {
    return this.themeService.darkTheme()
  }



}
