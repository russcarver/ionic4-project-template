import { Subscription } from 'rxjs';

export interface HandleSubscriptions {
  add: Function;
  cleanup: Function;
  get: Function;
}

// Used with JSON.stringify to prevent circular reference error (ie. JSON.stringify(foo, censor(foo)) )
export const censor: Function = (censoredData: any): any => {
  const cache: any[] = [];

  return (key: any, value: any): any => {
    if (typeof censoredData === 'object' && typeof value === 'object') {
      if (cache.indexOf(value) !== -1) {
        return '[Circular]';
      }
      cache.push(value);
    }
    return value;
  };
};

export function handleSubscriptions(): HandleSubscriptions {
  let subscriptions: Array<Subscription> = [];

  function addSubscription(subscription: Subscription): void {
    subscriptions.push(subscription);
  }

  function cleanupSubscriptions(): void {
    subscriptions.forEach((subscription: Subscription) => {
      if (subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
    subscriptions = [];
  }

  function getSubscriptions(): Array<Subscription> {
    return subscriptions;
  }

  return {
    add: addSubscription,
    cleanup: cleanupSubscriptions,
    get: getSubscriptions
  };
}

export const isUndefined: any = (value: any): boolean => value === undefined || value === null;
export const isDefined: any = (value: any): boolean => value !== undefined && value !== null;
