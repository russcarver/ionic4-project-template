import splitDollarsAndCents from 'lib/dollars-and-cents';

describe('dollars-and-cents', () => {
  it('should handle both dollars and two decimal place cents of zeros', () => {
    const values: Array<string> = [
      '0.00',
      '1.00',
      '22.00',
      '333.00',
      '4444.00',
      '55555.00',
      '666666.00',
      '7777777.00',
      '88888888.00',
      '999999999.00',
      '1000000000.00'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual(value.split('.'));
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle both dollars and two decimal place cents of non-zeros', () => {
    const values: Array<string> = [
      '1.23',
      '12.34',
      '123.45',
      '1234.56',
      '12345.67'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual(value.split('.'));
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle both dollars and two decimal place cents with a leading zero', () => {
    const values: Array<string> = [
      '1.01',
      '12.02',
      '123.03',
      '1234.04',
      '12345.05'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual(value.split('.'));
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle both dollars and two decimal place cents with a trailing zero', () => {
    const values: Array<string> = [
      '1.10',
      '12.20',
      '123.30',
      '1234.40',
      '12345.50'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual(value.split('.'));
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle only dollars', () => {
    const values: Array<string> = [
      '1',
      '12',
      '123',
      '1234',
      '12345'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual([value.split('.')[0], undefined]);
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle only dollars with a trailing decimal', () => {
    const values: Array<string> = [
      '1.',
      '12.',
      '123.',
      '1234.',
      '12345.'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual([value.split('.')[0], undefined]);
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle only cents', () => {
    const values: Array<string> = [
      '0.1',
      '0.12',
      '0.30',
      '0.04'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual(['0', value.split('.')[1]]);
      count++;
    });
    expect(count).toBe(values.length);
  });

  it('should handle only cents with a leading decimal', () => {
    const values: Array<string> = [
      '.1',
      '.12',
      '.30',
      '.04'
    ];
    let count: number = 0;
    values.forEach((value: string) => {
      expect(splitDollarsAndCents(value)).toEqual([undefined, value.split('.')[1]]);
      count++;
    });
    expect(count).toBe(values.length);
  });
});
