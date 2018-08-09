import * as moment from 'moment';

export const dateFormatDefault: string = 'MMM D, YYYY';
export const dateFormatDayMonth: string = 'MMM D';
export const dateFormatFullYearMonthDayKabob: string = 'YYYY-MM-DD';
export const dateFormatMonthDayYear: string = 'M/D/YY';
export const dateFormatHourMin: string = 'h:mm A';

export const formatToLocalTime: Function = (date: number, format?: string): string =>
  moment(date).local().format(format || dateFormatDefault);

export const getKabobDate: Function = (date: Date): string =>
  moment(date).format(dateFormatFullYearMonthDayKabob);

export function kabobDateStringToDate(dateAsString: string): Date {
  return moment(dateAsString, dateFormatFullYearMonthDayKabob).toDate();
}
