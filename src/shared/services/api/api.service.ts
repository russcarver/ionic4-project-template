import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Foo } from 'shared/models';
import { RequestBaseClass } from 'shared/services/request/request-base-class';

@Injectable()
export class ApiService extends RequestBaseClass {

  public constructor() {
    super();
  }

  public getFoo(id: number): Observable<Foo> {
    return (this.get({ path: `/${id}` }) as Observable<Foo>);
  }

}
