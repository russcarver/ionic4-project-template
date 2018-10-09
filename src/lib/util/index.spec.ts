import noop from 'lib/noop';
import { censor, handleSubscriptions, HandleSubscriptions, isDefined, isUndefined } from 'lib/util';

interface MockSubscription {
  unsubscribe: Function;
}

describe('censor()', () => {
  it('should find circular content', () => {
    const content: any = {
      name: 'content'
    };
    content.innerContent = content;
    const data: any = {
      content
    };
    const actual: string = JSON.stringify(data, censor(data));
    const expected: string = '{"content":{"name":"content","innerContent":"[Circular]"}}';
    expect(actual).toBe(expected);
  });
});

describe('handle-subscriptions', () => {
  const subscriptions: HandleSubscriptions = handleSubscriptions();

  it('should add a subscription', () => {
    function mockSubscription(): MockSubscription {
      return {
        unsubscribe: noop
      };
    }

    const subscription: MockSubscription = mockSubscription();

    subscriptions.add(subscription);

    const actual: Array<MockSubscription> = subscriptions.get();
    const expected: MockSubscription = subscription;

    expect(actual).toContain(expected);
  });

  it('should get all subscriptions', () => {
    function mockSubscription(): MockSubscription {
      return {
        unsubscribe: noop
      };
    }

    const actual: Array<MockSubscription> = subscriptions.get();
    const expected: Array<MockSubscription> = [mockSubscription()];

    expect(actual).toEqual(expected);
  });

  it('should cleanup all subscriptions', () => {
    subscriptions.cleanup();

    const actual: number = subscriptions.get().length;
    const expected: number = 0;

    expect(actual).toBe(expected);
  });
});

describe('isUndefined()', () => {
  it('should be undefined', () => {
    const tests: Array<any> = [undefined, null];
    const results: Array<any> = tests.filter(isUndefined);
    const actual: number = results.length;
    const expected: number = tests.length;
    expect(actual).toBe(expected);
  });

  it('should not be undefined', () => {
    const tests: Array<any> = ['', 0];
    const results: Array<any> = tests.filter(isUndefined);
    const actual: number = results.length;
    const expected: number = 0;
    expect(actual).toBe(expected);
  });
});

describe('isDefined()', () => {
  it('should be defined', () => {
    const tests: Array<any> = ['', 0];
    const results: Array<any> = tests.filter(isDefined);
    const actual: number = results.length;
    const expected: number = tests.length;
    expect(actual).toBe(expected);
  });

  it('should not be defined', () => {
    const tests: Array<any> = [undefined, null];
    const results: Array<any> = tests.filter(isDefined);
    const actual: number = results.length;
    const expected: number = 0;
    expect(actual).toBe(expected);
  });
});
