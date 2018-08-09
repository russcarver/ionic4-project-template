import { async, inject } from '@angular/core/testing';
import { NavController } from 'ionic-angular';

import noop from 'lib/noop';
import { NavControllerMock } from 'mocks';
import { HeaderBackButtonComponent } from 'shared/components/header-back-button/header-back-button';
import { beforeEachCompiler, FixturePayload } from 'test-base';
import Spy = jasmine.Spy;

let navCtrl: NavController;
let testFixturePayload: FixturePayload<HeaderBackButtonComponent>;

describe('HeaderBackButtonComponent', () => {
  beforeEach(async(() => {
    beforeEachCompiler(
      HeaderBackButtonComponent,
      [
        {
          provide: NavController,
          useFactory: (): void => NavControllerMock.instance()
        }
      ],
      [], [HeaderBackButtonComponent],
      []
    ).then((fixturePayload: FixturePayload<HeaderBackButtonComponent>) => {
      testFixturePayload = fixturePayload;
    }).catch((error: any) => {
      console.log(error); // tslint:disable-line:no-console
    });
  }));

  beforeEach(inject([NavController],
    (navController: NavController) => {
      navCtrl = navController;
    })
  );

  it('should check fixture and instance exists', () => {
    expect(testFixturePayload).toBeDefined();
    expect(testFixturePayload.fixture).toBeDefined();
    expect(testFixturePayload.instance).toBeDefined();
  });

  it('should go back a page when back is pressed when no return handler is defined', () => {
    testFixturePayload.instance.onBackPressed();
    expect(navCtrl.pop).toHaveBeenCalled();
  });

  it('should call the return handler when back is pressed if defined', () => {
    testFixturePayload.instance.returnHandler = noop;
    const returnSpy: Spy = spyOn(testFixturePayload.instance, 'returnHandler');

    testFixturePayload.instance.onBackPressed();
    expect(returnSpy).toHaveBeenCalled();
    expect(navCtrl.pop).not.toHaveBeenCalled();
  });

});
