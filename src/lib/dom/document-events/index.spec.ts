import createSpy = jasmine.createSpy;
import SpyObj = jasmine.SpyObj;

import * as documentEvents from 'lib/dom/document-events';
import noop from 'lib/noop';
import { fireEvent } from 'test-base';

describe('document-events', () => {
  it('should start listen to click event', (done: Function) => {
    const callback: Function = (): any => {
      done();
      documentEvents.off('click', callback);
    };
    documentEvents.on('click', callback);
    fireEvent(document.body, 'click');
  });

  it('should trigger each callback added', (done: Function) => {
    let count: number = 0;
    let validate: Function = noop;

    const callback: Function = (): any => {
      validate();
    };
    const callback2: Function = (): any => {
      validate();
    };

    validate = (): any => {
      count++;
      if (count < 2) {
        return;
      }
      done();
      documentEvents.off('click', callback);
      documentEvents.off('click', callback2);
    };
    documentEvents.on('click', callback);
    documentEvents.on('click', callback2);
    fireEvent(document.body, 'click');
  });

  it('should not try to remove callback not added', () => {
    const callbackSpy: SpyObj<any> = createSpy();
    documentEvents.off('not-used-event', callbackSpy);
    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it('should remove all callbacks for an event type', () => {
    const callbackSpy: SpyObj<any> = createSpy();
    documentEvents.on('click', callbackSpy);
    documentEvents.on('click', callbackSpy);
    fireEvent(document.body, 'click');
    documentEvents.removeAll('click');
    fireEvent(document.body, 'click');
    expect(callbackSpy).toHaveBeenCalledTimes(2);
  });
});
