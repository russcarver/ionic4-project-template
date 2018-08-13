import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

declare const window: any;

let platform: Platform;

const setPlatform: Function = (value: Platform): void => {
  platform = value;
};

export const isBrowser: Function = (): boolean => platform && (platform.is('core') || platform.is('mobileweb'));
export const isCordova: Function = (): boolean => platform && platform.is('cordova');
export const isIos: Function = (): boolean => platform && platform.is('ios');
export const isAndroid: Function = (): boolean => platform && platform.is('android');

@Component({
  selector: 'app-root', // tslint:disable-line:component-selector
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public constructor(
    private ionicPlatform: Platform,
    private keyboard: Keyboard,
    private screenOrientation: ScreenOrientation,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    setPlatform(ionicPlatform);
    this.initializeApp();
  }

  public initializeApp(): void {
    this.ionicPlatform.ready().then(() => {
      this.setNativeDefaults();
    });
  }

  private setNativeDefaults(): void {
    if (isCordova()) {
      if (isIos()) {
        window.Keyboard.shrinkView(true);
        window.Keyboard.hideFormAccessoryBar(true);
        this.keyboard.disableScroll(true);
      }
      this.statusBar.styleDefault();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.splashScreen.hide();
    }
  }

}
