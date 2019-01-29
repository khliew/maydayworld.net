import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentService } from '../services/environment.service';
import { FooterComponent } from './footer.component';

class EnvironmentServiceStub {
  env = { version: 'test version' };
}

describe('FooterComponent ', () => {
  let comp: FooterComponent;
  let environmentService: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FooterComponent,
        { provide: EnvironmentService, useClass: EnvironmentServiceStub }
      ]
    });

    comp = TestBed.get(FooterComponent);
    environmentService = TestBed.get(EnvironmentService);
  });

  it('should get the app version from environment', () => {
    expect(comp.appVersion).toBe(environmentService.env.version);
  });
});

describe('FooterComponent (DOM)', () => {
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let environmentService: EnvironmentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [{ provide: EnvironmentService, useClass: EnvironmentServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    comp = fixture.componentInstance;
    environmentService = fixture.debugElement.injector.get(EnvironmentService);

    fixture.detectChanges();
  }));

  it('should display the app version', () => {
    const footerEl: HTMLElement = fixture.nativeElement;
    const el = footerEl.querySelector('.app-version');
    expect(el.textContent).toEqual(`v${environmentService.env.version}`);
  });
});