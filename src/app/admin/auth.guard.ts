import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !environment.production;
  }
  
  canLoad(route: Route): boolean {
    return !environment.production;
  }
}
