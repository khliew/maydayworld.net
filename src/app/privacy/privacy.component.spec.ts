import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let sidenavService: { setEnabled: jasmine.Spy };
  let titleService: { resetTitle: jasmine.Spy };

  beforeEach(() => {
    sidenavService = jasmine.createSpyObj('SidenavService', ['setEnabled']);
    titleService = jasmine.createSpyObj('TitleService', ['resetTitle']);
  });

  it('should hide the sidenav', () => {
    const comp = new PrivacyComponent(<any> titleService, <any> sidenavService);
    expect(sidenavService.setEnabled).toHaveBeenCalledWith(false);
  });

  it('should reset the document title', () => {
    const comp = new PrivacyComponent(<any> titleService, <any> sidenavService);
    expect(titleService.resetTitle).toHaveBeenCalled();
  });
});
