import { Injectable } from '@angular/core';

@Injectable()
export class TitleServiceStub {
  resetTitle = jasmine.createSpy('resetTitle');
  setTitle = jasmine.createSpy('setTitle');
}
