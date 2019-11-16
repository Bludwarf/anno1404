import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'building'
})
export class BuildingPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? Math.ceil(value) : 0;
  }

}
