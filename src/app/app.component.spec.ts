import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

import SpyObj = jasmine.SpyObj;

import { PlatformMock } from 'mocks';
import { createSpyObj } from 'test-base';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy: SpyObj<any>;
  let splashScreenSpy: SpyObj<any>;

  beforeEach(async () => {
    statusBarSpy = createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = createSpyObj('SplashScreen', ['hide']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: StatusBar, useValue: statusBarSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;

    expect(fixture).toBeDefined();
    expect(app).toBeDefined();
  });

});
