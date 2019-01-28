import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  analyticsEnabled: boolean;

  sidenavSub: Subscription;
  sidenavEnabled: boolean;

  mediaSub: Subscription;

  constructor(private router: Router, private sidenavService: SidenavService, private mediaObserver: MediaObserver) {
    this.analyticsEnabled = typeof (<any>window).ga === 'function';
    this.sidenavEnabled = false;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('router: event', event);

        if (this.analyticsEnabled) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }

        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      }
    });

    this.sidenavSub = this.sidenavService.enable$
      .subscribe(enabled => {
        this.sidenavEnabled = enabled;

        if (this.sidenav.mode === 'side') {
          if (enabled) {
            this.sidenav.open();
          } else {
            this.sidenav.close();
          }
        } else {
          if (enabled) {
            // TODO: show menu button
          } else {
            // TODO: hide menu button
          }
        }
      });

    this.mediaSub = this.mediaObserver.media$.subscribe((change: MediaChange) => {
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
