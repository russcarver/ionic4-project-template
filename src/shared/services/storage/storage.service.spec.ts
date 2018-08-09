import { async, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { StorageService } from './storage.service';

import { beforeEachProviderCompiler } from 'test-base';

let storageService: StorageService;
let tempStorage: any = {};

class MockStorage {
  public get(key: string): any {
    return new Promise<any>((resolve: Function, reject: Function): void => {
      resolve(tempStorage[key]);
    });
  }

  public set(key: string, value: any): void {
    tempStorage[key] = value;
  }

  public remove(key: string): void {
    delete tempStorage[key];
  }

  public clear(): void {
    tempStorage = {};
  }
}

describe('StorageService', () => {

  beforeEach(async(() => beforeEachProviderCompiler(
    [
      StorageService,
      { provide: Storage, useClass: MockStorage }
    ])));

  beforeEach(inject([StorageService], (service: StorageService) => {
    storageService = service;
  }));

  beforeEach(() => {
    tempStorage = {};
  });

  afterEach(() => {
    storageService.clearStorage();
  });

  it('should not store data to storage if value is empty', (done: Function) => {
    const testKey: string = 'testKey';
    const testVal: string = '';
    storageService.setValueForKey(testVal, testKey);
    storageService.getValueForKey(testKey, (val: any) => {
      expect(val).toBe(undefined);
      done();
    });
  });

  it('should not replace data in storage if value is empty', (done: Function) => {
    const testKey: string = 'testKey';
    const originalVal: string = 'testVal';
    const updatedVal: string = '';
    storageService.setValueForKey(originalVal, testKey);
    storageService.setValueForKey(updatedVal, testKey);
    storageService.getValueForKey(testKey, (val: any) => {
      expect(val).toBe(originalVal);
      done();
    });
  });

  it('should store data to storage', (done: Function) => {
    const dict: any = {
      testBoolKey: true,
      testKey: 'testVal',
      testNumKey: 3.14,
      wealthAccounts: 'account'
    };
    Object.keys(dict).forEach((key: string) => {
      const testVal: any = dict[key];
      storageService.setValueForKey(testVal, key);
    });
    let correctValuesCount: number = 0; // poor mann's semaphore
    Object.keys(dict).forEach((key: string) => {
      const testVal: any = dict[key];
      storageService.getValueForKey(key, (val: any) => {
        expect(val).toBe(testVal);
        correctValuesCount++;
        if (correctValuesCount === Object.keys(dict).length) {
          done();
        }
      });
    });
  });

  it('should reset data in storage for same key', (done: Function) => {
    const testKey: string = 'testKey';
    const testVal: string = 'testVal';
    const testVal2: string = 'testVal2';
    storageService.setValueForKey(testVal, testKey);
    storageService.setValueForKey(testVal2, testKey);
    storageService.getValueForKey(testKey, (val: any) => {
      expect(val).toBe(testVal2);
      done();
    });
  });

  it('should remove value from storage', (done: Function) => {
    const testKey: string = 'testKey';
    const testVal: string = 'testVal';
    storageService.setValueForKey(testVal, testKey);
    storageService.removeValueForKey(testKey);
    storageService.getValueForKey(testKey, (val: any) => {
      expect(val).toBe(undefined);
      done();
    });
  });

  it('should allow removal of empty string key', (done: Function) => {
    const testKey: string = '';
    storageService.removeValueForKey(testKey);
    storageService.getValueForKey(testKey, (val: any) => {
      expect(val).toBe(undefined);
      done();
    });
  });

  it('should clear all data from storage', () => {
    const testKey: string = 'testKey';
    const testVal: string = 'testVal';
    storageService.setValueForKey(testVal, testKey);
    expect(Object.keys(tempStorage).length).toBe(1);
    storageService.clearStorage();
    expect(Object.keys(tempStorage).length).toBe(0);
  });

  it('should get each value and pass the result to the callback', (done: Function) => {
    storageService.setValueForKey(123, 'foo');
    storageService.setValueForKey(true, 'bar');
    const expected: any = {
      bar: true,
      foo: 123
    };
    storageService.getValueForAllKeys([
      'foo',
      'bar'
    ], (actual: any) => {
      expect(actual).toEqual(expected);
      done();
    });
  });

  it('should return true if any values are undefined', () => {
    const values: any = {
      budgetFood: '200',
      budgetInsurance: '500',
      budgetLoanPayments: undefined
    };
    const result: boolean = storageService.anyStorageValueUndefined(values);
    expect(result).toBeTruthy();
  });

  it('should return true if all values are undefined', () => {
    const values: any = {
      budgetFood: undefined,
      budgetInsurance: undefined,
      budgetLoanPayments: undefined
    };
    const result: boolean = storageService.anyStorageValueUndefined(values);
    expect(result).toBeTruthy();
  });

  it('should return false if all values are defined', () => {
    const values: any = {
      budgetFood: '200',
      budgetInsurance: '500',
      budgetLoanPayments: '2000'
    };
    const result: boolean = storageService.anyStorageValueUndefined(values);
    expect(result).toBeFalsy();
  });

});
