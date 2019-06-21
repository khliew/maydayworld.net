import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleService } from '../services/title.service';
import { SidenavService } from '../services/sidenav.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  private static readonly TIMEOUT_INCREMENT = 1000; // ms

  credentials = this.fb.group({
    email: [''],
    password: [''],
  });

  failCount: number;
  timeout: number;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private sidenavService: SidenavService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.failCount = 0;
    this.timeout = 0;

    this.sidenavService.setEnabled(false);
    this.titleService.resetTitle();
  }

  logIn() {
    this.credentials.disable();
    this.afAuth.auth.signInWithEmailAndPassword(this.credentials.get('email').value, this.credentials.get('password').value)
      .then(data => {
        this.router.navigate(['admin']);
      })
      .catch(error => {
        this.failCount++;
        this.timeout = this.failCount * LogInComponent.TIMEOUT_INCREMENT;

        setTimeout(() => {
          this.credentials.enable();
        }, this.timeout);
      });
  }
}
