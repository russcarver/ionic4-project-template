import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { isUndefined } from 'lib/util';

import { filter } from 'lodash';

export const storageType: any = {
  username: 'username'
};

@Injectable()
export class StorageService {
  public constructor(private storage: Storage) {}

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

  public getValueForKey(key: string): Promise<any> {
    return new Promise<any>((resolve: Function): void => {
      this.storage.get(key).then((value: any) => {
        if (!value) {
          resolve();
        }
        resolve(value);
      });
    });
  }

  public getValueForAllKeys(keys: string[]): Promise<any> {
    const result: any = {};
    let count: number = 0;

    return new Promise<any>((resolve: Function): void => {
      keys.forEach((key: string) => {
        this.getValueForKey(key).then((val: any) => {
          count++;
          result[key] = val;
          if (count === keys.length) {
            resolve(result);
          }
        });
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
