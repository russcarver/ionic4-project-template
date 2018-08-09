import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { filter } from 'lodash';

import { isUndefined } from 'lib/util';

export const StorageType: any = { // tslint:disable-line
  username: 'username'
};

@Injectable()
export class StorageService {

  public constructor(
    private platform: Platform,
    private storage: Storage
  ) { }

  public clearStorage(): void {
    this.storage.clear();
  }

  // Get/set values

  public setValueForKey(value: any, key: string): Promise<any> {
    if (value === '') {
      return Promise.resolve();
    }
    return this.storage.set(key, value);
  }

  public getValueForKey(key: string, callback: Function): void {
    this.storage.get(key).then((value: any) => {
      if (!value) {
        callback();
        return;
      }
      callback(value);
    });
  }

  public getValueForAllKeys(keys: string[], callback: Function): void {
    const result: any = {};
    let count: number = 0;
    keys.forEach((key: string) => {
      this.getValueForKey(key, (val: any) => {
        count++;
        result[key] = val;
        if (count === keys.length) {
          callback(result);
        }
      });
    });
  }

  public removeValueForKey(key: string): void {
    if (key === '') {
      return;
    }
    this.storage.remove(key);
  }

  /* This is meant to check the values returned from getValueForAllKeys */
  public anyStorageValueUndefined(values: any): boolean {
    return filter(values, isUndefined).length > 0;
  }

}
