// auth.guard.ts
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { UserStateService } from '../Services/state/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor( private router: Router,private userState:UserStateService) { }

  canActivate(): boolean {
    if (this.userState.isuserLoggedin()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }
}
