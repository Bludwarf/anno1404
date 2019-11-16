import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '-';
    }
    return (value * 100).toFixed(0) + '%';
  }

}
