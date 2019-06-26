import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private titleService: TitleService, private sidenavService: SidenavService) {
    this.sidenavService.setEnabled(false);
  }

  ngOnInit(): void {
    this.titleService.resetTitle();
  }
}
