import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product, Brand, ProductCategory, Category, Barcode, Article, Publication } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { BrandService } from './../services/brand.service';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { BrandComponent } from '../brand/brand.component';
import { CategoryComponent } from '../category/category.component';
import { AttributesComponent } from '../attribute/attributes.component';
import { DetailComponent } from './detail.component';
import { ArticlePickerComponent } from '../shared/article-picker.component';
import { PublicationService } from '../services/publication.service';

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit, OnDestroy {
    public static instance: ProductComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) divContainer;
    private sub: any;
    isBusy: boolean;
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
                public sessionService: SessionService,
                private productService: ProductService,
                private brandService: BrandService,
                private categoryService: CategoryService,
                private publicationService: PublicationService,
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
            'country': new FormControl('', Validators.nullValidator),
            'description': new FormControl('', Validators.nullValidator),
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
                            if (productId === 0) {
                                this.types = types.map(p => Helpers.newSelectItem(p.value));
                                this.addClick();
                            } else {
                                this.productService.getProduct(productId)
                                    .subscribe(
                                        result => {
                                            this.productService.product = result;
                                            this.types = [Helpers.newSelectItem(result.productType)];
                                            this.categoriesSelected = result.categories.map(p => p.category);
                                            const article = this.productService.product.articles.find(p => p.attributeValues.length === 0);
                                            if (article) {
                                                this.barcode = article.barcodes.find(p => p.tags.length === 0).barcode;
                                            }
                                            this.getPublication();
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
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
        this.productService.product = null;
    }

    get selected(): Product { return this.productService.product; }
    get isNew(): boolean { return this.selected == null || this.selected.productId === 0; }
    get selectedIndex(): number { return this.productService.products.indexOf(this.selected); }
    set publication(value) { this.publicationService.publication = value; }
    get publication(): Publication { return this.publicationService.publication; }

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

    getPublication() {
        this.publicationService.getByProductId(this.selected.productId)
            .subscribe(
                result => {
                    // result.productId = this.selected.productId;
                    this.publication = result;
                }, onerror => this.publication = new Publication(0)
            );
    }

    addClick() {
        this.productService.product = new Product();
        this.selected.productType = this.types[0].value;
        this.selected.productTax = this.taxes[0].value;
        this.selected.productUm = this.ums[0].value;
        this.publication = new Publication(0);
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
                component = DetailComponent
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
        this.isBusy = true;
        this.selected.categories = [];
        this.categoriesSelected.forEach(c => {
            const productCategory = <ProductCategory>{
                productId: this.selected.productId,
                category: c
            };
            this.selected.categories.push(productCategory);
        });

        const index = this.selected.articles.findIndex(p => p.attributeValues.length === 0);
        if (index >= 0) {
            this.selected.articles.slice(index, 1);
        }
        const article = new Article();
        article.barcodes.push(<Barcode>{ barcode: this.barcode });
        this.selected.articles.push(article);

        // console.log(JSON.stringify(this.selected));
        if (this.isNew) {
            this.productService.create(this.selected)
                .subscribe(result => {
                    this.productService.product = result;
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product created!'})
                    if (this.productService.products) {
                        this.productService.products.push(result);
                    }
                    if (this.publication.publicationStartAt) {
                        this.createPublication();
                    }
                    this.isBusy = false;
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.productService.update(this.selected.productId, this.selected)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product updated!'})
                    if (this.productService.products) {
                        // this.productService.product = result;
                        this.productService.products[this.selectedIndex] = result;
                    }
                    if (this.publication.publicationId > 0) {
                        this.publicationService.update()
                            .subscribe(res => {
                                this.publication = res;
                                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Publication updated!'})
                            });
                    } else {
                        this.createPublication();
                    }
                    this.isBusy = false;
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        }
    }

    createPublication() {
        this.publicationService.create(this.selected.productId)
        .subscribe(res => {
            this.publication = res;
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Publication created!'})
        });
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
