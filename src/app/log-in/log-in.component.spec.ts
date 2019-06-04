import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData, click, newEvent, RouterLinkDirectiveStub } from 'src/testing';
import { SidenavServiceStub, TitleServiceStub } from '../model/testing';
import { DataService } from '../services/data.service';
import { SidenavService } from '../services/sidenav.service';
import { TitleService } from '../services/title.service';
import { SharedModule } from '../shared/shared.module';
import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let comp: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let sidenavService: SidenavService;
  let titleService: TitleService;
  let formBuilder: FormBuilder;
  let dataServiceSpy;
  let routerSpy;

  beforeEach(async(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['logIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        LogInComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: routerSpy },
        { provide: SidenavService, useClass: SidenavServiceStub },
        { provide: TitleService, useClass: TitleServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    comp = fixture.componentInstance;

    const injector = fixture.debugElement.injector;
    sidenavService = injector.get(SidenavService);
    titleService = injector.get(TitleService);

    fixture.detectChanges(); // ngOnInit()
  }));

  it('should hide the sidenav', () => {
    expect(sidenavService.setEnabled).toHaveBeenCalledWith(false);
  });

  it('should reset the document title', () => {
    expect(titleService.resetTitle).toHaveBeenCalled();
  });

  it('should have a fail count of zero', fakeAsync(() => {
    expect(comp.failCount).toBe(0);
  }));

  describe('logging in successful', () => {
    let testCode;

    beforeEach(fakeAsync(() => {
      dataServiceSpy.logIn.and.returnValue(asyncData(true));
      testCode = 'test code';
      const input = fixture.nativeElement.querySelector('.access');

      input.value = testCode;
      input.dispatchEvent(newEvent('input')); // notify Angular

      const button = fixture.nativeElement.querySelector('.log-in');
      click(button);
    }));

    it('should call DataService to log in', () => {
      expect(dataServiceSpy.logIn).toHaveBeenCalledWith(testCode);
    });

    it('should navigate to admin', () => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['admin']);
    });
  });

  describe('logging in failed', () => {
    let testCode;

    beforeEach(fakeAsync(() => {
      dataServiceSpy.logIn.and.returnValue(asyncData(false));
      testCode = 'test code';
      const input = fixture.nativeElement.querySelector('.access');

      input.value = testCode;
      input.dispatchEvent(newEvent('input')); // notify Angular

      const button = fixture.nativeElement.querySelector('.log-in');
      click(button);

      tick(1000);
      fixture.detectChanges(); // update with logIn() response
    }));

    it('should increase fail count', () => {
      expect(comp.failCount).toBe(1);
    });

    it('should increase timeout', () => {
      expect(comp.timeout).toBe(1000);
    });
  });
});
