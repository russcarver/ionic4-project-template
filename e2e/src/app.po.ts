import { browser, by, element } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class AppPage {

  public navigateTo(): wdpromise.Promise<any> {
    return browser.get('/');
  }

  public getParagraphText(): wdpromise.Promise<string> {
    return element(by.deepCss('app-root ion-content')).getText();
  }

}
