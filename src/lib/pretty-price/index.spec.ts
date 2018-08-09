import prettyPrice from 'lib/pretty-price';

describe('pretty-price', () => {
  it('should return same value', () => {
    const values: Array<string> = [
      '',
      '0',
      '10',
      '11',
      '99',
      '999',
      '1.23',
      '10.56',
      '134.98'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(prettyPrice(value)).toBe(value);
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle falsy values', () => {
    expect(prettyPrice()).toBe('0');
    expect(prettyPrice(null)).toBe('0');
    expect(prettyPrice(0)).toBe('0');
  });

  it('should not add decimals to integers', () => {
    expect(prettyPrice(1)).toBe('1');
    expect(prettyPrice(42)).toBe('42');
  });

  it('should add a comma for first thousand', () => {
    expect(prettyPrice('1000')).toBe('1,000');
  });

  it('should add a comma for a hundred thousand', () => {
    expect(prettyPrice('100000')).toBe('100,000');
  });

  it('should add a comma for a million', () => {
    expect(prettyPrice('1000000')).toBe('1,000,000');
  });

  it('should limit to two decimals', () => {
    expect(prettyPrice('0.123')).toBe('0.12');
    expect(prettyPrice('0.2345678')).toBe('0.23');
  });

  it('should add 0 to single decimal', () => {
    expect(prettyPrice('0.1')).toBe('0.10');
  });

  it('should convert any values === 0 to "0"', () => {
    expect(prettyPrice('0')).toBe('0');
    expect(prettyPrice('0.0')).toBe('0');
    expect(prettyPrice('0.00')).toBe('0');
  });

  it('should truncate a trailing decimal point', () => {
    expect(prettyPrice('0.')).toBe('0');
    expect(prettyPrice('3245.')).toBe('3,245');
  });

  it('should allow decimals and commas', () => {
    expect(prettyPrice('999999999.9')).toBe('999,999,999.90');
  });

  it('should not alter the value when it is user input', () => {
    expect(prettyPrice('0', true)).toBe('0');
    expect(prettyPrice('0.', true)).toBe('0.');
    expect(prettyPrice('0.0', true)).toBe('0.0');
    expect(prettyPrice('0.00', true)).toBe('0.00');
    expect(prettyPrice('1', true)).toBe('1');
    expect(prettyPrice('.0', true)).toBe('.0');
    expect(prettyPrice('.1', true)).toBe('.1');
    expect(prettyPrice('12.', true)).toBe('12.');
    expect(prettyPrice('0.1', true)).toBe('0.1');
    expect(prettyPrice('0.23', true)).toBe('0.23');
    expect(prettyPrice('0.532', true)).toBe('0.532');
    expect(prettyPrice('1234.3', true)).toBe('1,234.3');
    expect(prettyPrice('123456.39', true)).toBe('123,456.39');
    expect(prettyPrice('999999999.0', true)).toBe('999,999,999.0');
  });
});
