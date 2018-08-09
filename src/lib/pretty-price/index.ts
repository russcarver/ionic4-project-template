import splitDollarsAndCents from 'lib/dollars-and-cents';
import twoDecimals from 'lib/two-decimals';
import { isUndefined } from 'lib/util';

const splitDollarsCents: Function = (value: string): Array<string> => {
  if (value.length === 0) {
    return [value, undefined];
  }

  const values: Array<string> = splitDollarsAndCents(value);
  const dollars: string = isUndefined(values[0])
    ? values[0]
    : Number(values[0]).toLocaleString();
  const cents: string = values[1];
  return [dollars, cents];
};

const createResult: Function = (values: Array<string>, hasDecimal: boolean = false): string => {
  const dollars: string = values[0];
  const cents: string = values[1];
  if (isUndefined(cents)) {
    return hasDecimal
      ? `${dollars}.`
      : dollars;
  }
  if (isUndefined(dollars)) {
    return hasDecimal
      ? `.${cents}`
      : cents;
  }
  return `${dollars}.${cents}`;
};

/**
 * Formats a number to contain commas. Ex 4001 will be 4,001.
 *
 * @param {string | number} value
 * @param {boolean} isInput If true, we won't try to alter the decimal value.
 * @return {string}
 */
export default (value: string | number = '0', isInput: boolean = false): string => { // tslint:disable-line
  value = isUndefined(value)
    ? '0'
    : value.toString();
  if (!isInput && (value === '0' || value === '0.0' || value === '0.00')) {
    return '0';
  }

  const hasDecimal: boolean = value.indexOf('.') >= 0;

  if (isInput) {
    return createResult(splitDollarsCents(value), hasDecimal);
  }

  if (value.lastIndexOf('.') === value.length - 1) {
    value = value.substring(0, value.length - 1); // Strip off trailing decimal
  }
  const values: Array<string> = splitDollarsCents(twoDecimals(value));
  const dollars: string = values[0];
  const cents: string = values[1];
  if (isUndefined(cents)) {
    return dollars;
  }
  return createResult(values);
};
