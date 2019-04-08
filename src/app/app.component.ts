import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

declare const window: any;

@Component({
  selector: 'app-root', // tslint:disable-line:component-selector
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  public constructor(
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {}

  public ngOnInit(): void {
    this.initializeApp();
  }

  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.setNativeDefaults();
    });
  }

  private setNativeDefaults(): void {
    if (this.platform.is('cordova')) {
      this.statusBar.styleDefault();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.splashScreen.hide();
    }
  }

}
