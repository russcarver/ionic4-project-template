import { async, inject } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';

import { HomePage } from 'app/home/home.page';
import { ApiServiceMock } from 'mocks';
import { PipesModule } from 'shared/pipes/pipes.module';
import { AlertService } from 'shared/services/alert';
import { ApiService } from 'shared/services/api/api.service';
import { beforeEachCompiler, FixturePayload } from 'test-base';

let testFixturePayload: FixturePayload<HomePage>;
let apiService: ApiService;

describe('HomePage', () => {
  beforeEach(async(() => {
    beforeEachCompiler(
      HomePage,
      [
        { provide: ApiService, useClass: ApiServiceMock },
        AlertController,
        AlertService
      ],
      [PipesModule],
      [HomePage],
      []
    )
      .then((fixturePayload: FixturePayload<HomePage>) => {
        testFixturePayload = fixturePayload;
      })
      .catch((error: any) => {
        console.log(error); // tslint:disable-line:no-console
      });
  }));

  beforeEach(inject([ApiService], (_apiService: ApiService) => {
    apiService = _apiService;
  }));

  it('should exist', () => {
    expect(testFixturePayload).toBeDefined();
    expect(testFixturePayload.fixture).toBeDefined();
    expect(testFixturePayload.instance).toBeDefined();
    expect(apiService).toBeDefined();
  });
});
