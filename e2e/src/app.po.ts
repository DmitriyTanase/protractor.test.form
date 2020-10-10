import {browser, by, element} from 'protractor';

export class AppPage {
  private credentias = {
    username: 'Иванов Иван Иванович',
    password: 'test1234',
    address: 'Москва, Кремль, Путин'
  };

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getConfirmationText(): Promise<string> {
    return element(by.css('app-root [id="confirmationText"]')).getText() as Promise<string>;
  }

  fillCredentialsToName(credentias: any = this.credentias): void {
    element(by.css('[id="name"]')).sendKeys(credentias.username);
  }

  fillCredentialsToPassword(credentias: any = this.credentias): void {
    element(by.css('[id="password"]')).sendKeys(credentias.password);
  }

  fillCredentialsToAddress(credentias: any = this.credentias): void {
    element(by.css('[id="address"]')).sendKeys(credentias.address);
  }

  getErrorNotification(): Promise<string> {
    return element(by.css('app-root div.notification')).getText() as Promise<string>;
  }

  getErrorNotificationWrongLength(): Promise<string> {
    return element(by.css('[id="wrongLength"]')).getText() as Promise<string>;
  }

  getErrorNotificationOnlyRu(): Promise<string> {
    return element(by.css('[id="onlyRu"]')).getText() as Promise<string>;
  }
}
