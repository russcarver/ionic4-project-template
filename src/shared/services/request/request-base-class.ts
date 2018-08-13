import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of as observableOf, throwError, Observable } from 'rxjs';
import { delay, retryWhen, switchMap, timeout } from 'rxjs/operators';

import { envVariables } from 'environments/environment-variables.token';
import { Environment } from 'environments/environment.model';
import { isDefined, isUndefined } from 'lib/util';
import { InjectorService } from 'shared/services/injector';

import { RequestAttribute, RequestSpec } from './models/request.model';

const httpRetryDelay: number = 1500; // ms

export abstract class RequestBaseClass {
  private envVars: Environment;
  private http: HttpClient;
  private urlStart: string;

  protected constructor() {
    this.envVars = InjectorService.injector.get<any>(envVariables);
    this.http = InjectorService.injector.get(HttpClient);
    this.urlStart = `${this.envVars.servicesUrl}${this.envVars.servicesPath}`;
  }

  protected get(params: RequestSpec): Observable<any> {
    if (!params.path) {
      throw new Error('Request::Get::Path is a required parameter');
    }

    if (isUndefined(params.absolutePath) || !params.absolutePath) {
      params.path = this.urlStart + params.path;
    }

    const requestOptions: { headers: HttpHeaders; params: HttpParams } = {
      headers: this.addRequestHeaders(params.headers),
      params: this.addQueryParams(params.queryParams)
    };

    return this.http.get(params.path, requestOptions).pipe(
      retryWhen(this.retryCall),
      timeout(this.envVars.httpTimeoutDefault)
    );

  }

  protected patch(params: RequestSpec): Observable<any> {
    if (!params.path) {
      throw new Error('Request::Patch::Path is a required parameter');
    }

    if (isUndefined(params.absolutePath) || !params.absolutePath) {
      params.path = this.urlStart + params.path;
    }

    const body: any = params.body;
    const requestOptions: { headers: HttpHeaders; params: HttpParams } = {
      headers: this.addRequestHeaders(params.headers),
      params: this.addQueryParams(params.queryParams)
    };

    return this.http.patch(params.path, body, requestOptions).pipe(
      retryWhen(this.retryCall),
      timeout(this.envVars.httpTimeoutDefault)
    );
  }

  protected post(params: RequestSpec): Observable<any> {
    if (!params.path) {
      throw new Error('Request::Post::Path is a required parameter');
    }

    if (isUndefined(params.absolutePath) || !params.absolutePath) {
      params.path = this.urlStart + params.path;
    }

    const body: any = JSON.stringify(params.body);
    const requestOptions: { headers: HttpHeaders; params: HttpParams } = {
      headers: this.addRequestHeaders(params.headers),
      params: this.addQueryParams(params.queryParams)
    };

    return this.http.post(params.path, body, requestOptions).pipe(
      retryWhen(this.retryCall),
      timeout(this.envVars.httpTimeoutDefault)
    );
  }

  protected put(params: RequestSpec): Observable<any> {
    if (!params.path) {
      throw new Error('Request::Put::Path is a required parameter');
    }

    if (isUndefined(params.absolutePath) || !params.absolutePath) {
      params.path = this.urlStart + params.path;
    }

    const body: any = params.body;
    const requestOptions: { headers: HttpHeaders; params: HttpParams } = {
      headers: this.addRequestHeaders(params.headers),
      params: this.addQueryParams(params.queryParams)
    };

    return this.http.put(params.path, body, requestOptions).pipe(
      retryWhen(this.retryCall),
      timeout(this.envVars.httpTimeoutDefault)
    );
  }

  protected delete(params: RequestSpec): Observable<any> {
    if (isUndefined(!params.path)) {
      throw new Error('Request::Delete::Path is a required parameter');
    }

    if (isUndefined(params.absolutePath) || !params.absolutePath) {
      params.path = this.urlStart + params.path;
    }

    const requestOptions: { headers: HttpHeaders; params: HttpParams } = {
      headers: this.addRequestHeaders(params.headers),
      params: this.addQueryParams(params.queryParams)
    };

    return this.http.delete(params.path, requestOptions).pipe(
      retryWhen(this.retryCall),
      timeout(this.envVars.httpTimeoutDefault)
    );
  }

  private getDefaultHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    const headersArray: RequestAttribute[] = [{
      key: 'Content-Type',
      value: 'application/json'
    }];

    headersArray.forEach((attribute: RequestAttribute) => {
      headers = headers.append(attribute.key, attribute.value);
    });

    return headers;
  }

  private addQueryParams(attributes: RequestAttribute[]): HttpParams {
    let queryParameters: HttpParams = new HttpParams();

    if (isDefined(attributes)) {
      attributes.forEach((attribute: RequestAttribute) => {
        queryParameters = queryParameters.append(attribute.key, attribute.value);
      });
    }

    return queryParameters;
  }

  private addRequestHeaders(attributes: RequestAttribute[]): HttpHeaders {
    let requestHeaders: HttpHeaders = this.getDefaultHeaders();

    if (attributes) {
      attributes.forEach((attribute: RequestAttribute) => {
        requestHeaders = requestHeaders.append(attribute.key, attribute.value);
      });
    }

    return requestHeaders;
  }

  private retryCall(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      switchMap((error: any) => (error.status >= 400) ? throwError(error) : observableOf(error)), // Don't retry for errors >= 400
      delay(httpRetryDelay)
    );
  }

}
