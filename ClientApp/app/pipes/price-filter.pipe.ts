import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})

export class PriceFilterPipe implements PipeTransform {
  transform(value: any[], args0?: any, args1?: any): any {

    if (!value) {
      return;
    }

    if (args0 == null) {
      return value;
    }

    let maxValue = args0;
    let column = args1;

    switch (column) {
      case 'discount':
        return value.filter(item => item.price <= maxValue);
      case 'percentage':
        return value.filter(item => item.percentage <= maxValue);
      default:
        return value.filter(item => item.sellingPrice <= maxValue);
    }
  }
}
