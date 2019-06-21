import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    this.logOut();
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => this.ngZone.run(() => this.router.navigate(['login'])));
  }
}
