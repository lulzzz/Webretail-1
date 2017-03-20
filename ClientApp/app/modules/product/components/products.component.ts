import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { Product, ProductCategory } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { AuthenticationService } from './../../../services/authentication.service';
import { BrandService } from './../../../services/brand.service';
import { ProductService } from './../../../services/product.service';

@Component({
    selector: 'products',
    templateUrl: 'products.component.html',
    providers: [BrandService]
})

export class ProductsComponent implements OnInit {
    totalRecords = 0;
    products: Product[];
	selected: Product;
    categories: SelectItem[];
    allbrands: SelectItem[];
    ums: SelectItem[];
    brands: SelectItem[];
    names: SelectItem[];
    categoryValue: string;
    sliderValue: number;
    displayPanel: boolean;
	dataform: FormGroup;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private productService: ProductService,
                private brandService: BrandService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'brand': new FormControl('', Validators.required),
            'code': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
            'name': new FormControl('', Validators.required),
            'um': new FormControl('', Validators.required),
            'selling': new FormControl('', Validators.required),
            'purchase': new FormControl('', Validators.required),
            'isActive': new FormControl('', Validators.required)
        });

        this.productService.getProducts()
            .subscribe(result => {
                this.products = result;
                this.totalRecords = this.products.length;
                this.buildFilter(result);
            }, onerror => alert(onerror._body)
        );

        this.brandService.getAll()
            .subscribe(result => {
                this.allbrands = result.map(p => Helpers.newSelectItem(p, p.brandName));
                this.ums = Helpers.getUnitOfMeasure();
            }, onerror => alert(onerror._body));
    }

    get isNew() : boolean { return this.selected == null || this.selected.productId == 0; }

    get selectedIndex(): number { return this.products.indexOf(this.selected); }

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

    openClick() {
        this.router.navigateByUrl('product/' + this.selected.productId);
    }

    addClick() {
        this.selected = new Product();
        this.selected.brand = this.allbrands.length > 0 ? this.allbrands[0].value : null;
        this.selected.productUm =  this.ums[0].value;
        this.displayPanel = true;
    }

    editClick() {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.productService.create(this.selected)
                .subscribe(result => {
                    result.brand = this.selected.brand;
                    this.products.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.productService.update(this.selected.productId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All information related to this product will be deleted. Are you sure that you want to delete this product?',
            accept: () => {
                this.productService.delete(this.selected.productId)
                    .subscribe(result => {
                        this.products.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}
