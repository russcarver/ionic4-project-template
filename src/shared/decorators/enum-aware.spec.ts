import noop from 'lib/noop';
import { EnumAware } from 'shared/decorators/enum-aware';

describe('EnumAware', () => {
  it('Empty Test', () => {
    EnumAware(noop);
  });
});
