import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    if (!value) { return; }
    if (!args) { return value; }

    let category = args;
    return value.filter(item => this.contain(item.categories, category));
  }

  contain(items: any[], value: string): boolean {
    if (!value) { return true; }
    for (let i = 0; i < items.length; i++) {
        if (items[i].category.categoryName === value) {
            return true;
        }
    }
    return false;
  }
}
