import { TitleService, TITLE_DEFAULT } from './title.service';

describe('TitleService', () => {
  let service: TitleService;
  let titleSpy: { setTitle: jasmine.Spy };

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    service = new TitleService(titleSpy as any);
  });

  it('#setTitle sets the document title', () => {
    const testValue = 'test value';
    service.setTitle(testValue);

    expect(titleSpy.setTitle).toHaveBeenCalledWith(`${testValue} - ${TITLE_DEFAULT}`);
  });

  it('#resetTitle resets the document title', () => {
    service.resetTitle();

    expect(titleSpy.setTitle).toHaveBeenCalledWith(TITLE_DEFAULT);
  });
});
