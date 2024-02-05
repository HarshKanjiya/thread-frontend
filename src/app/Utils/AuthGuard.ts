// auth.guard.ts
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { UserStateService } from '../Services/state/user-state.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router, private userState: UserStateService, private cookie: CookieService) { }

  canActivate() {

    let rToken = this.cookie.get("RefreshToken")
    let aToken = this.cookie.get("AccessToken")
    let user = this.cookie.get("UserName")

    if(!aToken) this.userState.getMySession();

    if (rToken && user) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }

  }
}
