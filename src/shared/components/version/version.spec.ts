import { async } from '@angular/core/testing';

import { appVersion } from 'app-version';
import * as appComponent from 'app/app.component';
import { beforeEachCompiler, FixturePayload } from 'test-base';

import { VersionComponent } from './version';

let testFixturePayload: FixturePayload<VersionComponent>;

describe('VersionComponent', () => {

  beforeEach(async(() => {
    beforeEachCompiler(VersionComponent, [], [], [VersionComponent]).then((fixturePayload: FixturePayload<VersionComponent>) => {
      testFixturePayload = fixturePayload;
    }).catch((error: any) => {
      console.log(error) // tslint:disable-line
    });

  }));

  describe('Lifecycle', () => {

    it('should create version component', () => {
      expect(testFixturePayload.instance).toBeDefined();
    });

  });

  describe('Display platform version', () => {

    it('should display the version', () => {

      // ngAfterViewInit should be triggered after first detectChanges
      testFixturePayload.fixture.detectChanges();

      testFixturePayload.fixture.whenRenderingDone().then(() => {
        expect(testFixturePayload.instance.appVersion).toBe(appVersion);
      }).catch((error: any) => {
        fail(error);
      });

    });

  });

});
