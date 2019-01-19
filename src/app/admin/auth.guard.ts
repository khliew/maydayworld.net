import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  canLoad(route: Route): boolean {
    return this.checkAuth();
  }

  checkAuth(): boolean {
    if (!!localStorage.getItem('auth')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
