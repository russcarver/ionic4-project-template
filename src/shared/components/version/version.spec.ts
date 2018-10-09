import { async, inject } from '@angular/core/testing';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

import { AppVersionMock, PlatformMock } from 'mocks';
import { beforeEachCompiler, FixturePayload } from 'test-base';

import { VersionComponent } from './version';

let testFixturePayload: FixturePayload<VersionComponent>;
let platform: Platform;

describe('VersionComponent', () => {
  beforeEach(async(() => {
    beforeEachCompiler(
      VersionComponent,
      [{ provide: Platform, useClass: PlatformMock }, { provide: AppVersion, useClass: AppVersionMock }],
      [],
      [VersionComponent]
    )
      .then((fixturePayload: FixturePayload<VersionComponent>) => {
        testFixturePayload = fixturePayload;
      })
      .catch((error: any) => {
        console.log(error); // tslint:disable-line
      });
  }));

  beforeEach(inject([Platform], (_platform: Platform) => {
    platform = _platform;
  }));

  describe('Lifecycle', () => {
    it('should create version component', () => {
      expect(testFixturePayload.instance).toBeDefined();
    });
  });

  describe('Display platform version', () => {
    it('should display the version', () => {
      platform.is = (): boolean => {
        return true;
      };

      testFixturePayload.fixture.detectChanges();

      testFixturePayload.fixture
        .whenRenderingDone()
        .then(async () => {
          await testFixturePayload.instance.ngAfterViewInit();
          expect(testFixturePayload.instance.appVer).toBe('1.2.3');
        })
        .catch((error: any) => {
          fail(error);
        });
    });
  });
});
