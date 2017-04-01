import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodFilter'
})

export class PeriodFilterPipe implements PipeTransform {
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
      return value.filter(item => this.getDate(item) >= dateStart && this.getDate(item) <= dateFinish);
    }

    return value.filter(item => this.getDate(item).toISOString() === dateStart.toISOString());
  }

  getDate(item: any) : Date {
    return new Date(item.movementDate);
  }
}
