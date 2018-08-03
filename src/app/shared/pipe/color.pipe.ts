import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'color',
  pure: false
})
export class ColorPipe implements PipeTransform {

  transform(value: any, color: string): any {
    if (!value || value.length === 0 || color === 'all') {return value; }
    return value.filter(item => item.color === color);
  }
}
