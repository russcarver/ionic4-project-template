import splitDollarsAndCents from 'lib/dollars-and-cents';
import { isUndefined } from 'lib/util';

/**
 * Converts a number to contain 0 or 2 decimals. If it doesn't contain any
 * decimals, the same value will be returned. It will add a `0` if value has one decimal.
 *
 * @param {string} value
 * @return {string}
 */
export default (value: string | number = '0'): string => { // tslint:disable-line
  value = isUndefined(value)
    ? '0'
    : value.toString();
  const decimalPos: number = value.indexOf('.');
  if ((decimalPos > -1 && isNaN(parseFloat(value))) || (decimalPos === -1 && isNaN(parseInt(value, 10)))) {
    return value;
  }
  const values: Array<string> = splitDollarsAndCents(value);
  let dollars: string = values[0];
  let cents: string = values[1];

  if (decimalPos === 0) {
    dollars = '0';
  } else if (decimalPos === value.length - 1) {
    cents = '00';
  }

  if (isUndefined(cents)) {
    return value;
  }
  if (cents.length > 1) {
    return `${dollars}.${cents.substr(0, 2)}`;
  }
  return `${dollars}.${cents}0`;
};
