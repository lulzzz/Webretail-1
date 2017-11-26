import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product, Brand, ProductCategory, Category, Barcode, Article } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { BrandService } from './../services/brand.service';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { BrandComponent } from '../brand/brand.component';
import { CategoryComponent } from '../category/category.component';
import { AttributesComponent } from '../attribute/attributes.component';
import { AttributeValueComponent } from '../attribute/attributevalue.component';
import { ArticlePickerComponent } from '../shared/article-picker.component';
import { join } from 'path';

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit, OnDestroy {
    public static instance: ProductComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) divContainer;
    private sub: any;
    barcode: string;
    dataform: FormGroup;
    types: SelectItem[];
    taxes: SelectItem[];
    ums: SelectItem[];
    packagings: SelectItem[];
    brands: Brand[];
    brandsFiltered: Brand[];
    categories: Category[];
    categoriesFiltered: Category[];
    categoriesSelected: Category[];
    visibleSidebar: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService,
                private brandService: BrandService,
                private categoryService: CategoryService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder,
                private location: Location) {
        ProductComponent.instance = this;
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Product');

        this.dataform = this.fb.group({
            'code': new FormControl('', Validators.required),
            'barcode': new FormControl('', Validators.required),
            'name': new FormControl('', Validators.required),
            'type': new FormControl('', Validators.required),
            'brand': new FormControl('', Validators.required),
            'categories': new FormControl('', Validators.nullValidator),
            'um': new FormControl('', Validators.required),
            'tax': new FormControl('', Validators.required),
            'selling': new FormControl('', Validators.required),
            'purchase': new FormControl('', Validators.required),
            'weight': new FormControl('', Validators.required),
            'length': new FormControl('', Validators.required),
            'width': new FormControl('', Validators.required),
            'height': new FormControl('', Validators.required),
            'isActive': new FormControl('', Validators.required)
        });

        this.sub = this.activatedRoute.params.subscribe(params => {
            const productId = Number(params['id']);
            this.ums = Helpers.getUnitOfMeasure();
            this.productService.getTaxes()
                .subscribe(taxes => {
                    this.taxes = taxes.map(p => Helpers.newSelectItem(p, p.name));
                    this.productService.getTypes()
                        .subscribe(types => {
                            this.types = types.map(p => Helpers.newSelectItem(p.value));
                            if (productId === 0) {
                                this.addClick();
                            } else {
                                this.productService.getProduct(productId)
                                    .subscribe(
                                        result => {
                                            this.productService.product = result;
                                            this.categoriesSelected = result.categories.map(p => p.category);
                                            const article = this.productService.product.articles.find(p => p.attributeValues.length === 0);
                                            if (article) {
                                                this.barcode = article.barcodes.find(p => p.tags.length === 0).barcode;
                                            }
                                        },
                                        onerror => this.messageService.add({
                                            severity: 'error', summary: 'get product', detail: onerror._body
                                        })
                                    );
                            }
                            this.getBrands();
                            this.getCategories();
                        });
                });
        });

        // this.productService.getArticles(this.product.productId)
        //     .subscribe(result => {
        //         this.productService.product.articles = result;
        //     }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));

    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
        this.productService.product = null;
    }

    get selected(): Product { return this.productService.product; }
    get isNew(): boolean { return this.selected == null || this.selected.productId === 0; }
    get selectedIndex(): number { return this.productService.products.indexOf(this.selected); }

    getBrands() {
        this.brandService.getAll()
            .subscribe(result => {
                this.brands = result;
            });
    }

    getCategories() {
        this.categoryService.getAll()
            .subscribe(result => {
                this.categories = result;
            });
    }

    addClick() {
        this.productService.product = new Product();
        this.selected.productTax = this.taxes[0].value;
        this.selected.productUm = this.ums[0].value;
    }

    closeClick() {
        this.location.back();
    }

    openSidebarClick($event): any {
        this.sessionService.titleSidebar = $event;
        this.divContainer.clear();
        let component: any;
        switch ($event) {
            case 'Brands':
                component = BrandComponent
                break;
            case 'Categories':
                component = CategoryComponent
                break;
            case 'Attributes':
                component = AttributesComponent
                break;
            case 'Articles':
                component = ArticlePickerComponent
                break;
            default:
                component = AttributeValueComponent
                break;
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        return this.divContainer.createComponent(factory);
    }

    closeSidebarClick(event) {
        switch (this.sessionService.titleSidebar) {
            case 'Brands':
                this.getBrands();
                break;
            case 'Categories':
                this.getCategories();
                break;
        }
        this.sessionService.titleSidebar = '';
    }

    saveClick() {
        this.selected.categories = [];
        this.categoriesSelected.forEach(c => {
            const productCategory = <ProductCategory>{
                productId: this.selected.productId,
                category: c
            };
            this.selected.categories.push(productCategory);
        });

        let article = this.selected.articles.find(p => p.attributeValues.length === 0);
        if (!article) {
            article = new Article();
            article.barcodes.push(<Barcode>{ barcode: this.barcode });
        } else {
            const barcode = article.barcodes.find(p => p.tags.length === 0);
            barcode.barcode = this.barcode;
        }
        console.log(JSON.stringify(this.selected));
        /*
        if (this.isNew) {
            this.productService.create(this.selected)
                .subscribe(result => {
                    this.productService.product = result;
                    this.productService.products.push(result);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product created!'})
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.productService.update(this.selected.productId, this.selected)
                .subscribe(result => {
                    this.productService.products[this.selectedIndex] = result;
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product updated!'})
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        }
        */
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All information related to this product will be deleted. Are you sure that you want to delete this product?',
            accept: () => {
                this.productService.delete(this.selected.productId)
                    .subscribe(result => {
                        this.productService.products.splice(this.selectedIndex, 1);
                        this.closeClick();
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }

    filterBrands(event) {
        this.brandsFiltered = [];
        this.brands.forEach(p => {
            if (event.query === ' ' || p.brandName.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.brandsFiltered.push(p);
            }
        });
        if (this.brandsFiltered.length === 0) {
            const brand = new Brand();
            brand.brandName = event.query;
            this.brandsFiltered.push(brand);
        }
    }

    filterCategories(event) {
        this.categoriesFiltered = [];
        this.categories.forEach(p => {
            if (event.query === ' ' || p.categoryName.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.categoriesFiltered.push(p);
            }
        });
        if (this.categoriesFiltered.length === 0) {
            const category = new Category(0, event.query);
            this.categoriesFiltered.push(category);
        }
    }
}
