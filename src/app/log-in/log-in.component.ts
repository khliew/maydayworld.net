import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  private static readonly TIMEOUT_INCREMENT = 1000; // ms

  accessForm = this.fb.control('');
  failCount: number;
  timeout: number;
  disabled: boolean;

  constructor(private titleService: TitleService, private fb: FormBuilder, private dataService: DataService, private router: Router) { 
    this.failCount = 0;
    this.timeout = 0;
    this.disabled = false;
    localStorage.removeItem('auth');

    this.titleService.resetTitle();
    }

  logIn() {
    this.disabled = true;
    this.dataService.logIn(this.accessForm.value)
    .subscribe(res => {
      if (res) {
        this.disabled = false;
        localStorage.setItem('auth', 'true');
        this.router.navigate(['admin']);
      } else {
        this.failCount++;
        this.timeout = this.failCount * LogInComponent.TIMEOUT_INCREMENT;
        setTimeout(() => {
          this.disabled = false;
        }, this.timeout);
      }
    });
  }
}
