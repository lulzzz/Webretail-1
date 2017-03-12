import { Component, Input, EventEmitter } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { Product, ProductCategory, ProductAttributeValue } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { BrandService } from './../../../services/brand.service';
import { ProductService } from './../../../services/product.service';

@Component({
    selector: 'article-picker',
    templateUrl: 'article-picker.component.html',
    providers: [ ProductService, BrandService ],
    outputs: ['onPicked']
})

export class ArticlePickerComponent {
    totalRecords = 0;
    products: Product[];
	selected: Product;
    categories: SelectItem[];
    allbrands: SelectItem[];
    brands: SelectItem[];
    names: SelectItem[];
    categoryValue: string;
    sliderValue: number;
    header: string[];
    articles: any[];
    onPicked = new EventEmitter();

    constructor(private productService: ProductService,
                private brandService: BrandService) { }

    pickedClick(picked: string) {
        if (picked.indexOf('#') > 0) {
            this.onPicked.emit(picked.split('#')[1]);
        }
    }

    public loadData() {
        if (!this.products) {
            this.productService.getProducts()
                .subscribe(result => {
                    this.products = result;
                    this.totalRecords = this.products.length;
                    this.buildFilter(result);
                }
            );
        }
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

    onRowExpanded(expandedItem: any) {
        this.productService.getProduct(expandedItem.data.productId)
            .subscribe(result => {
                this.selected = result;
                this.getArticles();
            });
    }

    getArticles() {
        /// from server
        // this.productService.getArticles(this.selected.productId)
        //     .subscribe(result => {
        //         this.header = result[0];
        //         result.splice(0, 1);
        //         this.articles = result;
        //     });
        /// or from client
        this.header = [];
        this.articles = [];
        let productAttributeValues: ProductAttributeValue[] = [];

        let lenght = this.selected.attributes.length - 1;
        if (lenght > 0) {
            this.selected.attributes.forEach(elem => {
                this.header.push(elem.attribute.attributeName);
                productAttributeValues = productAttributeValues.concat(elem.attributeValues);
            });
            this.header.pop();

            this.selected.attributes[lenght].attributeValues.forEach(elem => {
                this.header.push(elem.attributeValue.attributeValueName);
            });
        }

        let source = Observable.from(this.selected.articles)
            .groupBy(
                function (x) {
                    return x.attributeValues
                        .map(p => p.attributeValueId)
                        .slice(0, x.attributeValues.length - 1)
                        .join('#');
                },
                function (x) { return x; }
            );

        source.subscribe(obs => {
            let row: any[] = [];
            let isFirst = true;
            obs.forEach(e => {
                let qta = `${e.quantity}#${e.barcode}`;
                if (isFirst) {
                    e.attributeValues.forEach(ex => {
                        let productAttributeValue = productAttributeValues.find(
                            p => p.attributeValue.attributeValueId === ex.attributeValueId
                        );
                        row.push(productAttributeValue.attributeValue.attributeValueName);
                    });
                    isFirst = false;
                    row[row.length - 1] = qta;
                } else {
                    row.push(qta);
                }
            }).then(p => {
                this.articles.push(row);
            });
        });
    }
}
