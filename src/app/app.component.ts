import { Component, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './Services/theme.service';
import { UserStateService } from "./Services/state/user-state.service"
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private themeService: ThemeService, public UserState: UserStateService, private cookie: CookieService) {

    if (cookie.get("RefreshToken")) {
      this.UserState.getMySession();
    }
  }

  ngOnInit() {
  }

  @HostBinding("class.dark") get mode() {
    return this.themeService.darkTheme()
  }


}
