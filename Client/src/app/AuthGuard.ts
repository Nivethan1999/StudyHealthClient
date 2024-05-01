import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedInCurrentValue()) { // Call isLoggedIn as a method
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to login
      return false;
    }
  }
}