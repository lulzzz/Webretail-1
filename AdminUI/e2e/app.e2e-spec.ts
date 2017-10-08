import { WebretailPage } from './app.po';

describe('webretail App', function() {
  let page: WebretailPage;

  beforeEach(() => {
    page = new WebretailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
