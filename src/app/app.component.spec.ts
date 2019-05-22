import { async, inject } from '@angular/core/testing';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { beforeEachCompiler, createSpyObj, FixturePayload } from 'test-base';
import { AppComponent } from './app.component';
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

// tslint:disable:no-string-literal
describe('AppComponent', () => {
  let instance: AppComponent;
  let platform: Platform;
  let splashScreenSpy: SpyObj<any>;
  let statusBarSpy: SpyObj<any>;
  let testFixturePayload: FixturePayload<AppComponent>;

  beforeEach(async(() => {
    splashScreenSpy = createSpyObj('SplashScreen', ['hide']);
    statusBarSpy = createSpyObj('StatusBar', ['styleDefault']);

    beforeEachCompiler(
      AppComponent,
      [
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: StatusBar, useValue: statusBarSpy },
        ScreenOrientation
      ],
      [],
      [AppComponent],
      []
    )
      .then((fixturePayload: FixturePayload<AppComponent>) => {
        testFixturePayload = fixturePayload;
        instance = testFixturePayload.instance;
      })
      .catch((error: any) => {
        console.error(error); // tslint:disable-line:no-console
      });
  }));

  beforeEach(inject([Platform], (_platform: Platform) => {
    platform = _platform;
  }));

  describe('constructor', () => {
    it('should create the app', () => {
      expect(testFixturePayload).toBeDefined();
      expect(testFixturePayload.fixture).toBeDefined();
      expect(instance).toBeDefined();
    });
  });

  describe('setNativeDefaults', () => {
    it('should set the native defaults', () => {
      platform.is = (): boolean => { return true; };
      const screenOrientationSpy: Spy = spyOn((<any>instance).screenOrientation, 'lock');

      (<any>instance).setNativeDefaults();

      expect(splashScreenSpy.hide).toHaveBeenCalled();
      expect(statusBarSpy.styleDefault).toHaveBeenCalled();
      expect(screenOrientationSpy).toHaveBeenCalledWith('portrait-primary');
    });
  });

});
