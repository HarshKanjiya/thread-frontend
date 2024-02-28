// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../reducers/User/User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private userService: UserService, private cookie: CookieService) { }

  canActivate() {

    let rToken = this.cookie.get("RefreshToken")
    let aToken = this.cookie.get("AccessToken")
    let user = this.cookie.get("UserName")

    if (!aToken) this.userService.getMySession()

    if (rToken && user) {
      this.userService.getMySession()

      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }

  }
}
