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

  constructor(private router: Router, private sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

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
