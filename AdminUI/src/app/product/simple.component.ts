import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product, Barcode, Article, Packaging, ArticleItem } from './../shared/models';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';

@Component({
    selector: 'app-simple',
    templateUrl: 'simple.component.html'
})

export class SimpleComponent implements OnInit {

    articleItem: ArticleItem;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService) {
    }

    get product(): Product { return this.productService.product; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.createSheet();
    }

    createSheet() {
        this.productService.getArticles(this.product.productId, '0')
            .subscribe(result => {
                this.articleItem = result.body[0][0];
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    saveClick() {
        if (this.articleItem.id > 0) {
            const article = new Article();
            article.articleId = this.articleItem.id;
            article.packaging = new Packaging();
            article.barcodes = [<Barcode>{ barcode: this.articleItem.value, tags: [] }];
            this.productService
                .updateArticle(this.articleItem.id, article)
                .subscribe(result => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Barcode',
                        detail: 'Updated successfully!'
                    });
                });
        } else {
            this.messageService.add({
                severity: 'warning',
                summary: 'Barcode',
                detail: 'Save product before update barcode!'
            });
        }
    }
}
