import * as moment from 'moment';

import { dateFormatHourMin, dateFormatMonthDayYear, formatToLocalTime, getKabobDate, kabobDateStringToDate } from './utils';

describe('date', () => {

  describe('formatToLocalTime()', () => {
    it('should format a date from ms since epoch time to MMM DD, YYYY format', () => {
      const date: number = 1493150004000;
      const actual: string = formatToLocalTime(date);
      const expected: string = 'Apr 25, 2017';
      expect(actual).toBe(expected);
    });

    it('should format a date from ms since epoch time to M/D/YY format', () => {
      const date: number = 1493150004000;
      const actual: string = formatToLocalTime(date, dateFormatMonthDayYear);
      const expected: string = '4/25/17';
      expect(actual).toBe(expected);
    });

    it('should format a date from ms since epoch time to h:mm A format', () => {
      const date: number = 1493150004000;
      const compareDate: any = new Date(date);
      const militaryHours: number = compareDate.getHours();
      const hour: number = militaryHours > 12
        ? militaryHours - 12
        : militaryHours;
      const abbreviation: string = militaryHours >= 12
        ? 'PM'
        : 'AM';
      const actual: string = formatToLocalTime(date, dateFormatHourMin);
      const expected: string = `${hour}:53 ${abbreviation}`;
      expect(actual).toBe(expected);
    });

  });

  describe('getKabobDate()', () => {
    it('should return a javascript date in kabob date format', () => {
      const date: Date = new Date();
      date.setFullYear(2018, 3, 23);
      const result: string = getKabobDate(date);
      expect(result).toBe('2018-04-23');
    });
  });

  describe('kabobDateStringToDate()', () => {
    it('should accept a kabob date string and output a javascript date', () => {
      const date: string = '2000-01-01';
      const result: Date = kabobDateStringToDate(date);
      expect(result).toEqual(moment('2000-01-01', 'YYYY-MM-DD').toDate());
    });
  });

});
