import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'price',
  pure: false
})
/**
 * @summary Price pipe
 */
export class PricePipe implements PipeTransform {

  /**
   * @summary create array according to feature
   * @param value - array of product
   * @param priceStart - low price
   * @param priceFinish - high price
   * @return created array
   */
  transform(value: any, priceStart: number, priceFinish: number): any {
    if (!value || value.length === 0) {
      return value;
    }
    return value.filter(item => {
      if ( +item.price >= priceStart && +item.price <= priceFinish) {
        return item;
      }
    });
  }
}