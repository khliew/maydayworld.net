import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanLoad, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canLoad() {
    return this.checkAuth();
  }

  checkAuth() {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (!!user) {
          resolve(true);
        } else {
          this.router.navigateByUrl('/login');
          resolve(false);
        }
      });
    });
  }
}
