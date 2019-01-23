import { Component } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {
  constructor(private sidenavService: SidenavService) {
    this.sidenavService.setEnabled(false);
  }
}
