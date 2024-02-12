import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from './Services/theme.service';
import { UserService } from './reducers/User/User.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private themeService: ThemeService, private userService: UserService, private cookie: CookieService) {

    if (cookie.get("RefreshToken")) {
      this.userService.getMySession()
    }
  }

  ngOnInit() {
  }

  @HostBinding("class.dark") get mode() {
    return this.themeService.darkTheme()
  }


}
