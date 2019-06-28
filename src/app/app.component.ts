import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav, { static: false }) sidenav: MatSidenav;

  analyticsEnabled: boolean;

  sidenavSub: Subscription;
  mediaSub: Subscription;

  constructor(private router: Router, private sidenavService: SidenavService, private mediaObserver: MediaObserver) {
    this.analyticsEnabled = typeof (window as any).ga === 'function';
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.analyticsEnabled) {
          (window as any).ga('set', 'page', event.urlAfterRedirects);
          (window as any).ga('send', 'pageview');
        }
      }
    });

    this.sidenavSub = this.sidenavService.enable$
      .subscribe(enabled => {
        if (this.sidenav.mode === 'side') {
          if (enabled) {
            this.sidenav.open();
          } else {
            this.sidenav.close();
          }
        }
      });

    this.mediaSub = this.mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ).subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.sidenav.fixedTopGap = 56;
          this.sidenav.mode = 'over';
          this.sidenav.disableClose = false;
          this.sidenav.close();
        } else {
          this.sidenav.fixedTopGap = 64;
          this.sidenav.mode = 'side';
          this.sidenav.disableClose = true;

          if (this.sidenavService.enabled) {
            this.sidenav.open();
          }
        }
      });
  }

  ngOnDestroy() {
    this.sidenavSub.unsubscribe();
    this.mediaSub.unsubscribe();
  }
}
