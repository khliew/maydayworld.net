import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let sidenavService: { setEnabled: jasmine.Spy };
  let titleService: { resetTitle: jasmine.Spy };

  beforeEach(() => {
    sidenavService = jasmine.createSpyObj('SidenavService', ['setEnabled']);
    titleService = jasmine.createSpyObj('TitleService', ['resetTitle']);
  });

  it('should hide the sidenav', () => {
    const comp = new PrivacyComponent(titleService as any, sidenavService as any);
    expect(sidenavService.setEnabled).toHaveBeenCalledWith(false);
  });

  it('should reset the document title', () => {
    const comp = new PrivacyComponent(titleService as any, sidenavService as any);
    expect(titleService.resetTitle).toHaveBeenCalled();
  });
});
