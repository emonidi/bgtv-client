import { BgtvPage } from './app.po';

describe('bgtv App', () => {
  let page: BgtvPage;

  beforeEach(() => {
    page = new BgtvPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
