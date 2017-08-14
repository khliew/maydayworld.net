import { TestngPage } from './app.po';

describe('testng App', () => {
  let page: TestngPage;

  beforeEach(() => {
    page = new TestngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
