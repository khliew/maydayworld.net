import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setEnabled(false);
  }
}
