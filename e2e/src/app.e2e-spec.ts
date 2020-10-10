import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('pet-project App', () => {
  let page: AppPage;

  const wrongCredentias = {
    username: '1245',
    password: '12344',
    address: ''
  };

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ngForm app is running!');
  });

  it('should display confirmation message', () => {
    page.navigateTo();
    expect(page.getConfirmationText()).toEqual('Код подтверждения');
  });

  it('should entering wrong name and when showing error notification', () => {
    page.navigateTo();
    page.fillCredentialsToName(wrongCredentias);
    expect(page.getErrorNotificationWrongLength()).toEqual('Длина имени больше 2 букв');
    expect(page.getErrorNotificationOnlyRu()).toEqual('Только кириллица');
  });

  it('should entering wrong password and when showing error notification', () => {
    page.navigateTo();
    page.fillCredentialsToPassword(wrongCredentias);
    expect(page.getErrorNotification()).toEqual('Слабый пароль');
  });

  it('should checking select of country', () => {
    page.navigateTo();
    const countryList = element.all(by.repeater('country of countries'));
    expect(countryList.count()).toEqual(1);
    expect(countryList.get(1).getText()).toEqual('Америка');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
