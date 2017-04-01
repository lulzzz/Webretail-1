import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})

export class PriceFilterPipe implements PipeTransform {
  transform(value: any[], args0?: any, args1?: any, args2?: any): any {

    if (!value) {
      return;
    }

    if (args0 == null) {
      return value;
    }

    let maxValue = args0;
    let type = args1;

    switch (type) {
      case 'discounts':
        return value.filter(item => (item.percentage > 0 ? item.percentage : item.price) <= maxValue);
      case 'discount':
        let item = args2;
        return value.filter(data => (item.percentage == 0 ? ((data.product.sellingPrice - item.price) / data.product.sellingPrice * 100.0) : data.product.sellingPrice - (data.product.sellingPrice * item.percentage / 100)) <= maxValue);
      case 'movement':
        let maxAmount = args2;
        return value.filter(data => data.price <= maxValue || data.amount <= maxAmount);
      default:
        return value.filter(item => (item.discount ? item.discount.price : item.sellingPrice) <= maxValue);
    }
  }
}
