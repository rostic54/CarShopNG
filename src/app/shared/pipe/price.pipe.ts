import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {

  transform(value: any, priceStart: number, priceFinish: number): any {
    if (!value || value.length === 0) {
      return value;
    }
    return value.filter(item => {
      if (item.price >= priceStart && item.price <= priceFinish) {
        return item;
      }
    });
  }
}