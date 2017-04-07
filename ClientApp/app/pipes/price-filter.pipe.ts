import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})

export class PriceFilterPipe implements PipeTransform {
  transform(value: any[], args0?: any, args1?: any, args2?: any): any {

    if (!value) {
      return;
    }

    let type = args1;
    if (type == 'movement' && args0 == null && args2 == null) { return value; }
    else if (args0 == null) { return value; }

    let maxValue = args0;

    switch (type) {
      case 'discounts':
        return value.filter(item => (item.discountPercentage > 0 ? item.discountPercentage : item.discountPrice) <= maxValue);
      case 'discount':
        let item = args2;
        return value.filter(data => (item.discountPercentage == 0 ? ((data.discountProduct.productSellingPrice - item.discountPrice) / data.discountProduct.productSellingPrice * 100.0) : data.discountProduct.productSellingPrice - (data.discountProduct.productSellingPrice * item.discountPercentage / 100)) <= maxValue);
      case 'movements':
        return value.filter(data => data.movementAmount <= maxValue);
      case 'movement':
        let maxAmount = args2;
        if (args2 == null) {
          return value.filter(data => data.movementArticlePrice <= maxValue);
        }
        if (args0 == null) {
          return value.filter(data => data.movementArticleAmount <= maxAmount);
        }
        return value.filter(data => data.movementArticlePrice <= maxValue && data.movementArticleAmount <= maxAmount);
      case 'invoices':
        return value.filter(data => data.invoiceAmount <= maxValue);
      default:
        return value.filter(item => (item.discount ? item.discount.discountPrice : item.productSellingPrice) <= maxValue);
    }
  }
}
