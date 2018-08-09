import { async } from '@angular/core/testing';

import { beforeEachCompiler, FixturePayload } from 'test-base';

import { StatusBarComponent } from './status-bar';

let testFixturePayload: FixturePayload<StatusBarComponent>;

describe('StatusBarComponent', () => {

  beforeEach(async(() => {
    beforeEachCompiler(StatusBarComponent, [], [], [StatusBarComponent]).then((fixturePayload: FixturePayload<StatusBarComponent>) => {
      testFixturePayload = fixturePayload;
    }).catch((error: any) => {
      console.log(error) // tslint:disable-line
    });
  }));

  describe('Lifecycle', () => {

    it('should create status bar component', () => {
      expect(testFixturePayload.instance).toBeDefined();
    });

  });

});
