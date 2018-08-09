import { Injectable, Pipe, PipeTransform } from '@angular/core';
import prettyPrice from 'lib/pretty-price';

@Pipe({
  name: 'formatIntoPrice'
})
@Injectable()
export class FormatIntoPricePipe implements PipeTransform {
  /**
   * Formats the price.
   *
   * @param  {string}  value
   * @param  {boolean} isInput If true; won't format the decimal.
   * @return {string}
   */
  public transform(value: string | number, isInput: boolean = false): string {
    return prettyPrice(value, isInput);
  }
}
