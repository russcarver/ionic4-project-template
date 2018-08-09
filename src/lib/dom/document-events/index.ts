const createListener: Function = (): any => {
  const instance: any = {};
  const listeners: Array<any> = [];

  instance.trigger = (event: any): void => {
    listeners.forEach((listener: any) => {
      listener.fn.call(listener.context, event);
    });
  };

  instance.add = (fn: Function, context?: any): void => {
    listeners.push({
      context,
      fn
    });
  };

  instance.remove = (fn: Function): void => {
    let index: number = listeners.length;
    while (index--) {
      const listener: any = listeners[index];
      if (listener.fn === fn) {
        listeners.splice(index, 1);
      }
    }
  };

  instance.clear = (): void => {
    listeners.length = 0;
  };

  return instance;
};

const addedDomEvents: any = {};

export const on: Function = (type: string, fn: Function, context?: any): void => {
  if (addedDomEvents[type]) {
    addedDomEvents[type].add(fn, context);
    return;
  }
  addedDomEvents[type] = createListener();
  addedDomEvents[type].add(fn, context);
  document.addEventListener(type, (event: any) => {
    addedDomEvents[type].trigger(event);
  }, false);
};

/**
 * Unregisters an event, but doesn't remove any DOM listeners.
 *
 * @param  {string}   type
 * @param  {Function} fn
 */
export const off: Function = (type: string, fn: Function): void => {
  if (!addedDomEvents[type]) {
    return;
  }
  addedDomEvents[type].remove(fn);
};

/**
 * Unregisters all listener for an event, but doesn't remove any DOM listeners.
 *
 * @param  {string}   type
 * @param  {Function} fn
 */
export const removeAll: Function = (type: string, fn: Function): void => {
  if (!addedDomEvents[type]) {
    return;
  }
  addedDomEvents[type].clear();
};
