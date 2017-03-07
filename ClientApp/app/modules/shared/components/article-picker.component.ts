import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { Product, ProductCategory } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { AuthenticationService } from './../../../services/authentication.service';
import { BrandService } from './../../../services/brand.service';
import { ProductService } from './../../../services/product.service';

@Component({
    selector: 'article-picker',
    templateUrl: 'article-picker.component.html',
    providers: [ ProductService, BrandService ]
})

export class ArticlePickerComponent implements OnInit {
    totalRecords = 0;
    products: Product[];
	selected: Product;
    categories: SelectItem[];
    allbrands: SelectItem[];
    brands: SelectItem[];
    names: SelectItem[];
    categoryValue: string;
    sliderValue: number;

    constructor(private authenticationService: AuthenticationService,
                private productService: ProductService,
                private brandService: BrandService) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);
    }

 	LoadData() {
        alert('CIAO');

        this.productService.getProducts()
            .subscribe(result => {
                this.products = result;
                this.totalRecords = this.products.length;
                this.buildFilter(result);
            }//, onerror => alert('ERROR\r\n' + onerror)
        );
    }

    buildFilter(items: Product[]) {
        this.names = items.map((item: Product) => Helpers.newSelectItem(item.productName));

        this.brands = [];
        this.brands.push({label: 'All', value: null});
        let filterBrands = Helpers.distinct(items.map((item: Product) => Helpers.newSelectItem(item.brand.brandName)));
        this.brands = this.brands.concat(filterBrands);

        this.categories = [];
        this.categories.push({label: 'All', value: null});
        let array =  items.map((p: Product) => p.categories.map((c: ProductCategory) => c.category.categoryName)).join(',');
        let filterCategories =  Helpers.distinct(array.split(',').map((item: string) => Helpers.newSelectItem(item)));
        this.categories = this.categories.concat(filterCategories);
    }

    openClick() {
        alert(this.selected.productId);
    }
}
