import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canLoad(route: Route): boolean {
    return this.checkAuth();
  }

  checkAuth(): boolean {
    if (!!this.afAuth.auth.currentUser) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
