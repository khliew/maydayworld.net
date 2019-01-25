import { Component } from '@angular/core';
import { EnvironmentService } from '../services/environment.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  appVersion: string;

  constructor(environmentService: EnvironmentService) {
    this.appVersion = environmentService.env.version;
  }
}
