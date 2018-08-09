import * as sort from 'lib/collection/sort';

describe('collection/sort', () => {
  describe('asc()', () => {
    it('should sort a number array in ascending order', () => {
      const actual: number[] = [5, 1, 9, 3, 7, 1].sort(sort.asc);
      const expected: number[] = [1, 1, 3, 5, 7, 9];
      expect(actual).toEqual(expected);
    });

    it('should sort a string array in ascending order', () => {
      const actual: string[] = ['b', 'a', 'd', 'c'].sort(sort.asc);
      const expected: string[] = ['a', 'b', 'c', 'd'];
      expect(actual).toEqual(expected);
    });
  });

  describe('desc()', () => {
    it('should sort a number array in descending order', () => {
      const actual: number[] = [5, 1, 9, 3, 7, 1].sort(sort.desc);
      const expected: number[] = [9, 7, 5, 3, 1, 1];
      expect(actual).toEqual(expected);
    });

    it('should sort a string array in descending order', () => {
      const actual: string[] = ['b', 'a', 'd', 'c'].sort(sort.desc);
      const expected: string[] = ['d', 'c', 'b', 'a'];
      expect(actual).toEqual(expected);
    });
  });

  describe('byKey()', () => {
    it('should sort an array in ascending order', () => {
      const actual: any[] = [{ v: 5 }, { v: 3 }, { v: 7 }, { v: 1 }, { v: 9 }].sort(sort.byKey('v', sort.asc));
      const expected: any[] = [{ v: 1 }, { v: 3 }, { v: 5 }, { v: 7 }, { v: 9 }];
      expect(actual).toEqual(expected);
    });

    it('should sort an array in descending order', () => {
      const actual: any[] = [{ v: 5 }, { v: 3 }, { v: 7 }, { v: 1 }, { v: 9 }].sort(sort.byKey('v', sort.desc));
      const expected: any[] = [{ v: 9 }, { v: 7 }, { v: 5 }, { v: 3 }, { v: 1 }];
      expect(actual).toEqual(expected);
    });
  });
});
