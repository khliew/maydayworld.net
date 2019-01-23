import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;
  let titleSpy: any;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    service = new TitleService(titleSpy);
  });

  it('#setTitle sets the document title', () => {
    const testValue = 'test value';
    service.setTitle(testValue);

    expect(titleSpy.setTitle).toHaveBeenCalledWith(`${testValue} - Mayday World  五月天世界`);
  });

  it('#resetTitle resets the document title', () => {
    service.resetTitle();

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Mayday World  五月天世界');
  });
});
