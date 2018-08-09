import twoDecimals from 'lib/two-decimals';

describe('two-decimals', () => {
  it('should return same value', () => {
    const values: Array<string> = [
      '0',
      '10',
      '11',
      '99',
      '0.00',
      '1.23',
      '10.56',
      '134.98'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(twoDecimals(value)).toBe(value);
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle falsy values', () => {
    expect(twoDecimals()).toBe('0');
    expect(twoDecimals(null)).toBe('0');
    expect(twoDecimals(0)).toBe('0');
  });

  it('should not add decimals to integers', () => {
    expect(twoDecimals(1)).toBe('1');
    expect(twoDecimals(42)).toBe('42');
  });

  it('should limit to two decimals', () => {
    expect(twoDecimals('0.123')).toBe('0.12');
    expect(twoDecimals('0.2345678')).toBe('0.23');
    expect(twoDecimals(0.123)).toBe('0.12');
    expect(twoDecimals(0.2345678)).toBe('0.23');
  });

  it('should add 0 to single decimal', () => {
    expect(twoDecimals('0.0')).toBe('0.00');
    expect(twoDecimals('0.1')).toBe('0.10');
    expect(twoDecimals(0.0)).toBe('0'); // tslint:disable-line
    expect(twoDecimals(0.1)).toBe('0.10');
  });

  it('should add a leading zero if not present', () => {
    expect(twoDecimals('.0')).toBe('0.00');
    expect(twoDecimals('.13')).toBe('0.13');
    expect(twoDecimals('.2')).toBe('0.20');
  });

  it('should add a training zeros if ends in a decimal point', () => {
    expect(twoDecimals('1.')).toBe('1.00');
    expect(twoDecimals('22.')).toBe('22.00');
    expect(twoDecimals('333.')).toBe('333.00');
  });

});
