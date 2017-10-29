import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: number, args0?: string): string {
    const timeReferenceDate = new Date('2001-01-01').getTime();
    const timeIntervalSinceReferenceDate = value * 1000;
    const format = args0 != null ? args0 : 'yyyy-MM-dd HH:mm:ss';
    const datePipe = new DatePipe('UTC');
    return datePipe.transform(timeReferenceDate + timeIntervalSinceReferenceDate, format);
  }
}
