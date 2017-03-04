import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})

export class PriceFilterPipe implements PipeTransform {
  transform(value: any[], args?: any): any {

    if (!value) {
      return;
    }

    if (args == null) {
      return value;
    }

    let maxPrice = args;
    return value.filter(item => item.sellingPrice <= maxPrice);
  }
}
