import screenWidth from 'lib/dom/screen-width';

describe('screen-width', () => {
  it('return width of body element', () => {
    const expected: number = document.body.offsetWidth || 320;
    const actual: number = screenWidth();
    expect(actual).toBe(expected);
  });
});
