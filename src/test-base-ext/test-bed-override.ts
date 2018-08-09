
export enum TestBedOverrideType {
  COMPONENT,
  PROVIDER
}

export class TestBedOverride<T> {
  public type: TestBedOverrideType;

  public constructor(public data: T) {}
}
