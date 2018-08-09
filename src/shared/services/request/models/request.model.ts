export interface RequestSpec {
  absolutePath?: boolean;
  body?: object;
  headers?: RequestAttribute[];
  path: string;
  queryParams?: RequestAttribute[];
}

export class RequestAttribute {
  public constructor(public key: string, public value: string) { }
}
