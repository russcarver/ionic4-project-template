import { FormatIntoPriceCentsPipe } from './format-into-price-cents-pipe';

describe('FormatIntoPriceCentsPipe', () => {
  it('create an instance', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    expect(pipe).toBeDefined();
  });

  it('should return empty string when element is outside bounds of split', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123.12', '.', 3);
    expect(value).toBe('');
  });

  it('should return empty string when element is outside bounds of split negative', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123.12', '.', -1);
    expect(value).toBe('');
  });

  it('should return first element without separator included', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123.12', '.', 0);
    expect(value).toBe('123');
  });

  it('should return nth where n > 0 element with separator included', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123.12', '.', 1);
    expect(value).toBe('.12');
  });

  it('should return first element without separator included using alt separator', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123,12', ',', 0);
    expect(value).toBe('123');
  });

  it('should return nth where n > 0 element with separator included using alt separator', () => {
    const pipe: FormatIntoPriceCentsPipe = new FormatIntoPriceCentsPipe();
    const value: string = pipe.transform('123,12', ',', 1);
    expect(value).toBe(',12');
  });
});
