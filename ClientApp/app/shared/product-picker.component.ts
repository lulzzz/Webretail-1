import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { DataTable, SelectItem, MenuItem } from 'primeng/primeng';
import { Product, ProductCategory, ProductAttributeValue, ArticleForm, ArticleItem } from './models';
import { Helpers } from './helpers';
import { ProductService } from './../services/product.service';

@Component({
    selector: 'product-picker',
    templateUrl: 'product-picker.component.html',
    outputs: ['onPicked']
})

export class ProductPickerComponent {
    @ViewChild('dt') datatable: DataTable;
    totalRecords = 0;
    products: Product[];
	selected: Product[];
    categories: SelectItem[];
    allbrands: SelectItem[];
    brands: SelectItem[];
    names: SelectItem[];
    categoryValue: string;
    sliderValue: number;
    onPicked = new EventEmitter();
    public isOpen: boolean;

    constructor(private productService: ProductService) {
        this.isOpen = false;
    }

    public loadData() {
        this.isOpen = true;
        if (!this.products) {
            this.productService
                .getProducts()
                .subscribe(result => {
                    this.products = result;
                    this.totalRecords = this.products.length;
                    this.buildFilter(result);
                }, onerror => alert(onerror._body)
            );
        }
    }

    hidePickerClick() {
        this.isOpen = false;
    }

    pickerClick() {
        let data: string[] = [];
        this.selected.forEach(e => data.push(e.productCode));
        this.onPicked.emit(data);
        this.isOpen = false;
    }

    buildFilter(items: Product[]) {
        this.names = items.map((item: Product) => Helpers.newSelectItem(item.productName));

        this.brands = [];
        this.brands.push({label: 'All', value: null});
        let filterBrands = Helpers.distinct(items.map((item: Product) => Helpers.newSelectItem(item.brand.brandName)));
        this.brands = this.brands.concat(filterBrands);

        this.categories = [];
        this.categories.push({label: 'All', value: null});
        let array = items.map((p: Product) => p.categories.map((c: ProductCategory) => c.category.categoryName)).join(',');
        let filterCategories = Helpers.distinct(array.split(',').map((item: string) => Helpers.newSelectItem(item)));
        this.categories = this.categories.concat(filterCategories);
    }
}
