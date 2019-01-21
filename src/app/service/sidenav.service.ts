import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SidenavService {
  private showSidenav: Subject<boolean>;
  
  open: Observable<boolean>;

  constructor() {
    this.showSidenav = new Subject<boolean>();
    this.open = this.showSidenav as Observable<boolean>;
  }

  public setOpen(open: boolean) {
    this.showSidenav.next(open);
  }
}

