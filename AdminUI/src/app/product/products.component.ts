import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product, ProductCategory } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { BrandService } from './../services/brand.service';
import { ProductService } from './../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: 'products.component.html'
})

export class ProductsComponent implements OnInit {
    totalRecords = 0;
    selected: Product;
    categories: SelectItem[];
    allbrands: SelectItem[];
    ums: SelectItem[];
    brands: SelectItem[];
    categoryValue: string;
    sliderValue: number;
    displayPanel: boolean;
    dataform: FormGroup;
    buttons: MenuItem[];

    constructor(private router: Router,
                private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService,
                private brandService: BrandService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        sessionService.title = 'Products';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'brand': new FormControl('', Validators.required),
            'code': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
            'name': new FormControl('', Validators.required),
            'um': new FormControl('', Validators.required),
            'selling': new FormControl('', Validators.required),
            'purchase': new FormControl('', Validators.required),
            'isActive': new FormControl('', Validators.required)
        });

        this.buttons = [
            { label: 'Stock', icon: 'fa-list-ol', command: (event) => this.stockClick() },
            { label: 'Publication', icon: 'fa-shopping-cart', command: (event) => this.publicationClick() }
        ];

        if (this.products == null) {
            this.refreshClick();
        } else {
            this.refreshControl();
        }

        this.brandService.getAll()
            .subscribe(result => {
                this.allbrands = result.map(p => Helpers.newSelectItem(p, p.brandName));
                this.ums = Helpers.getUnitOfMeasure();
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));

    }

    set products(value) { this.productService.products = value; }
    get products(): Product[] { return this.productService.products; }

    get isNew(): boolean { return this.selected == null || this.selected.productId === 0; }

    get selectedIndex(): number { return this.products.indexOf(this.selected); }

    buildFilter(items: Product[]) {
        this.brands = [];
        this.brands.push({label: 'All', value: null});
        const filterBrands = Helpers.distinct(items.map((item: Product) => Helpers.newSelectItem(item.brand.brandName)));
        this.brands = this.brands.concat(filterBrands);

        this.categories = [];
        this.categories.push({label: 'All', value: null});
        const array = items.map((p: Product) => p.categories.map((c: ProductCategory) => c.category.categoryName)).join(',');
        const filterCategories = Helpers.distinct(array.split(',').map((item: string) => Helpers.newSelectItem(item)));
        this.categories = this.categories.concat(filterCategories);
    }

    refreshClick() {
        this.products = null;
        this.productService.getProducts()
            .subscribe(result => {
                this.products = result;
                this.refreshControl();
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
        );
    }

    private refreshControl() {
        this.totalRecords = this.products.length;
        this.buildFilter(this.products);
    }

    openClick() {
        this.router.navigateByUrl('product/' + this.selected.productId);
    }

    stockClick() {
        this.router.navigateByUrl('product/' + this.selected.productId + '/stock');
    }

    publicationClick() {
        this.router.navigateByUrl('product/' + this.selected.productId + '/publication');
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
        this.buildFilter(this.products);
    }

    saveClick() {
        if (this.isNew) {
            this.productService.create(this.selected)
                .subscribe(result => {
                    this.selected = result;
                    this.products.push(this.selected);
                    this.totalRecords++;
                    this.openClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.productService.update(this.selected.productId, this.selected)
                .subscribe(result => {
                    this.products[this.selectedIndex] = result;
                    this.closeClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
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
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }
}
