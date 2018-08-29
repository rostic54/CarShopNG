import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feature',
  pure: false
})
/**
 * @summary feature pipe
 */
export class FeaturePipe implements PipeTransform {
  /**
   * @summary create array according to feature
   * @param value - array of product
   * @param feature - feature of product
   * @return created array
   */
  transform(value: any, feature: string): any {
    if (!value || value.length === 0 || feature === 'all') {return value; }
    return value.filter( item => item.feature === feature);
  }

}
