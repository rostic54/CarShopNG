import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feature',
  pure: false
})
export class FeaturePipe implements PipeTransform {

  transform(value: any, feature: string): any {
    if (!value || value.length === 0 || feature === 'all') {return value; }
    return value.filter( item => item.feature === feature);
  }

}
