export const asc: any = (a: any, b: any): number => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

export const desc: any = (a: any, b: any): number => {
  if (a === b) {
    return 0;
  }
  return a > b ? -1 : 1;
};

export const byKey: Function = (key: string, sortFn: any): any =>
  (a: any, b: any): number => sortFn(a[key], b[key]);
