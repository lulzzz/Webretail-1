import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/primeng';
import {
    Product, ProductCategory, Category, ProductAttribute, Attribute,
    ProductAttributeValue, Article, ArticleAttributeValue, AttributeValue, ArticleForm
} from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { AuthenticationService } from './../../../services/authentication.service';
import { ProductService } from './../../../services/product.service';
import { StoreService } from './../../../services/store.service';

@Component({
    selector: 'stock',
    templateUrl: 'stock.component.html'
})

export class StockComponent implements OnInit, OnDestroy {
    private sub: any;
    stores: SelectItem[];
    product: Product;
    articleForm: ArticleForm;
    totalRecords = 0;

	constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private productService: ProductService,
                private storeService: StoreService,
                private location: Location) {}

    ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            this.productService.getProduct(id)
                .subscribe(result => {
                    this.product = result;
                    this.createSheet('0');
                }, onerror => alert(onerror._body)
            );
        });

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p.storeId, p.storeName));
            }, onerror => alert(onerror._body)
        );
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    cancelClick() {
        this.location.back();
    }

    createSheet(storeIds: string) {
        if (storeIds == '') {
            storeIds = '0';
        }
        this.totalRecords = this.product.articles.length;
        this.productService.getArticles(this.product.productId, storeIds)
            .subscribe(result => {
                this.articleForm = result;
            }, onerror => alert(onerror._body));
    }

    onStoreChanged(event: any) {
        alert(event.value.join(','));
    }
}
