import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'utilization'
})
export class UtilizationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return computeUtilization(value);
  }

}

export function computeUtilization(value: any): number {
  if (!value) {
    return 0;
  }
  const ceil = Math.ceil(value);
  return value / ceil;
}
