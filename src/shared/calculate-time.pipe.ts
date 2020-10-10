import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'calculateTime'
})
export class CalculateTimePipe implements PipeTransform {
  transform(value: any, ...args): number {
    return +(value / 1024 / 1024).toFixed(2);
  }
}
