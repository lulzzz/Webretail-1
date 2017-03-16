import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})

export class DateFilterPipe implements PipeTransform {
  transform(value: any[], args?: Date): any {

    if (!value) {
      return;
    }

    if (args == null) {
      return value;
    }

    let date = args;
    return value.filter(item => new Date(item.orderDate).toISOString() === date.toISOString());
  }
}
