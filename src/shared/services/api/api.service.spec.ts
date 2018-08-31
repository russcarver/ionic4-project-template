import { Injector } from '@angular/core';
import { async, inject } from '@angular/core/testing';

import { ApiService } from 'shared/services/api/api.service';
import { InjectorService } from 'shared/services/injector';
import { beforeEachProviderCompiler } from 'test-base';

let apiService: ApiService;

describe('ApiService', () => {
  beforeEach(async(() => beforeEachProviderCompiler([ApiService])));

  beforeEach(inject([Injector], (injectorParam: Injector) => {
    InjectorService.injector = injectorParam;
  }));

  beforeEach(inject([ApiService], (_apiService: ApiService) => {
    apiService = _apiService;
  }));

  it('should exist', () => {
    expect(apiService).toBeDefined();
  });
});
