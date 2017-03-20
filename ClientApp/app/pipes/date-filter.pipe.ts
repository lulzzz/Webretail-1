import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})

export class DateFilterPipe implements PipeTransform {
  transform(value: any[], arg0?: Date, arg1?: Date): any {

    if (!value) {
      return;
    }

    if (arg0 == null) {
      return value;
    }
    let dateStart = arg0;

    if (arg1 != null) {
      let dateFinish = arg1;
      return value.filter(item => new Date(item.created) >= dateStart && new Date(item.created) <= dateFinish);
    }

    return value.filter(item => new Date(item.created).toISOString() === dateStart.toISOString());
  }
}
