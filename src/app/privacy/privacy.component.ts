import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setOpen(false);
  }
}
