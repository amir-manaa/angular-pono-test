import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/shared/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class SignupGuard {

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {

    if (!this.authenticationService.isUserLoggedIn()) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}