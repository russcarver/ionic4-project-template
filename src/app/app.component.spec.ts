import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

import { PlatformMock } from 'mocks';
import { createSpyObj } from 'test-base';

import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

import { AppComponent } from './app.component';

// tslint:disable:no-string-literal
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let instance: AppComponent;
  let platform: Platform;
  let splashScreenSpy: SpyObj<any>;
  let statusBarSpy: SpyObj<any>;

  beforeEach(async () => {
    splashScreenSpy = createSpyObj('SplashScreen', ['hide']);
    statusBarSpy = createSpyObj('StatusBar', ['styleDefault']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: StatusBar, useValue: statusBarSpy },
        ScreenOrientation
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(inject([Platform], (_platform: Platform) => {
    platform = _platform;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create the app', async () => {
    expect(fixture).toBeDefined();
    expect(instance).toBeDefined();
  });

  it('should set the native defaults', async () => {
    platform.is = (): boolean => { return true; };
    const screenOrientationSpy: Spy = spyOn((<any> instance).screenOrientation, 'lock');

    (<any> instance).setNativeDefaults();

    expect(splashScreenSpy.hide).toHaveBeenCalled();
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(screenOrientationSpy).toHaveBeenCalledWith('portrait-primary');
  });

});
