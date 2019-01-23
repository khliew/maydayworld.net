import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavService } from './service/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  analyticsEnabled: boolean;

  constructor(private router: Router, private sidenavService: SidenavService) {
    this.analyticsEnabled = typeof (<any>window).ga === 'function';
  }

  ngOnInit() {
    if (this.analyticsEnabled) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }

    this.sidenavService.open
      .subscribe(open => {
        if (open) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      });
  }
}
