import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { isDefined } from 'lib/util';
import { RequestBaseClass } from 'shared/services/request/request-base-class';

@Injectable()
export class HomePageService extends RequestBaseClass {

  public constructor() {
    super();
  }

  public saveData(data: any, update: boolean = false): Observable<Response> {
    let url: string = '';

    if (update) {
      url += '/updateMyData';
      return this.patch({
        body: data,
        path: url
      });
    } else {
      url += '/insertMyData';
      return this.post({
        body: data,
        path: url
      });
    }
  }

  public getData(id: string): Observable<any> {
    return this.get({ path: `/myData/${id}` });
  }

  public getDatum(timeStampInPast?: number): Observable<any[]> {
    let url: string = `/myDatum`;
    if (isDefined(timeStampInPast)) {
      url += `/${timeStampInPast}`;
    }
    return this.get({ path: url });
  }

  public getUser(userId: string): Observable<any[]> {
    return this.get({ path: `/myUsers/${userId}` });
  }

  public deleteData(id: string): Observable<Response> {
    return this.delete({ path: `/deleteMyData/${id}` });
  }

}
