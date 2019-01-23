import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SidenavService {
  private enableSideNav: Subject<boolean>;
  
  enable$: Observable<boolean>;
  enabled: boolean;

  constructor() {
    this.enableSideNav = new Subject<boolean>();
    this.enable$ = this.enableSideNav as Observable<boolean>;
  }

  public setEnabled(enabled: boolean) {
    this.enableSideNav.next(enabled);
    this.enabled = enabled;
  }
}

