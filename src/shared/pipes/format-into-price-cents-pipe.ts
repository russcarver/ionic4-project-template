import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIntoPriceCents'
})
@Injectable()
export class FormatIntoPriceCentsPipe implements PipeTransform {
  /**
   * Performs string split and returns element at elementIndex from array .
   *
   * @param  {string}  value
   * @param  {string}  separator
   * @param  {number}  elementIndex
   * @return {string}
   */
  public transform(value: string, separator: string, elementIndex: number): string {
    if (elementIndex < 0) {
      return '';
    }
    const arr: Array<string> = value.split(separator);
    if (arr.length > elementIndex) {
      if (elementIndex > 0) {
        return separator + arr[elementIndex];
      } else {
        return arr[elementIndex];
      }
    } else {
      return '';
    }
  }
}
