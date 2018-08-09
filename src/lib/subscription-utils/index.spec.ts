import { Subject } from 'rxjs';

import { createSubject } from 'lib/subscription-utils';

interface MyInterface {
  name: string;
}

describe('subscription-utils', () => {
  describe('createSubject()', () => {
    it('should create a new subject with `T` interface', (done: Function) => {
      const myObj: MyInterface = {
        name: 'John'
      };
      const subject: Subject<MyInterface> = createSubject(myObj);
      subject.subscribe((arg: MyInterface) => {
        const actual: string = arg.name;
        const expected: string = myObj.name;
        expect(actual).toBe(expected);
        done();
      });
      subject.next(myObj);
    });
  });
});
