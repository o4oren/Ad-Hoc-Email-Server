import { AdHocEmailPage } from './app.po';

describe('ad-hoc-email App', () => {
  let page: AdHocEmailPage;

  beforeEach(() => {
    page = new AdHocEmailPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
