import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'color',
  pure: false
})
/**
 * @summary color Pipe
 */
export class ColorPipe implements PipeTransform {

  /**
   * @summary create array according to color
   * @param value - array of products
   * @param color - needed color
   * @return created array
   */
  transform(value: any, color: string): any {
    if (!value || value.length === 0 || color === 'all') {return value; }
    return value.filter(item => item.color === color);
  }
}
