import { CapitalizePipe } from 'shared/pipes/capitalize-pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe: CapitalizePipe = new CapitalizePipe();
    expect(pipe).toBeDefined();
  });
});
