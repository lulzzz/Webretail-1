import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../shared/models';

@Pipe({
  name: 'articleInfo'
})
export class ArticleInfoPipe implements PipeTransform {
  transform(value: Product, args?: string): string {
    if (args == null) {
      return value.productName;
    }
    let barcode = args;
    let info = value.productName;
    const ids = value.articles.find(p => p.barcode == barcode).attributeValues.map(p => p.attributeValueId);

    value.attributes.map(p => p.attributeValues.forEach(b => {
        if (ids.indexOf(b.attributeValue.attributeValueId) > -1) {
          info += ` ${b.attributeValue.attributeValueName}`;
        }
    }));

    return info;
    }
  }
