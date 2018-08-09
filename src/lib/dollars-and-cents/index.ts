/**
 * Converts a string containing dollars and/or cents into an array of two strings representing both separately.
 * Will return undefined for either if the corresponding portion does not exist.
 *
 * @param {string} value
 * @return [{string}, {string}]
 */
export default (value: string): Array<string> => { // tslint:disable-line
  let values: Array<string>;
  const decimalPos: number = value.indexOf('.');
  if (decimalPos === 0) {
    values = [undefined, value.substr(1)];
  } else if (decimalPos === value.length - 1) {
    values = [value.substring(0, value.length - 1), undefined];
  } else {
    values = decimalPos > 0
      ? value.split('.')
      : [value, undefined];
  }
  return values;
};
