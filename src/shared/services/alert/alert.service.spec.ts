import { async, inject } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';

import { beforeEachProviderCompiler } from 'test-base';

import { AlertService } from './alert.service';

let alertService: AlertService;

describe('AlertService', () => {
  beforeEach(async(() => beforeEachProviderCompiler([AlertController, AlertService])));

  beforeEach(inject([AlertService], (service: AlertService) => {
    alertService = service;
  }));

  it('should exist', () => {
    expect(alertService).toBeDefined();
  });
});
