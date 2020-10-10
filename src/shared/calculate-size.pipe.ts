import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'calculateSize'
})
export class CalculateSizePipe implements PipeTransform {
  transform(value: any, ...args): number {
    return +(value / 1024 / 1024).toFixed(2);
  }
}
