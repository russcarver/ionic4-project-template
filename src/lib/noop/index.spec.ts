import noop from 'lib/noop';

describe('noop', () => {
  it('do nothing', () => {
    const expected: any = undefined;
    const actual: any = noop();
    expect(actual).toBe(expected);
  });
});
