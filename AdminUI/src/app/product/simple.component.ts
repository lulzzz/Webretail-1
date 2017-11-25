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

    item: Article;
    barcode: string;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService) {
    }

    get product(): Product { return this.productService.product; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.productService.getArticles(this.product.productId)
            .subscribe(result => {
                this.item = result[0];
                this.barcode = this.item.barcodes.find(p => p.tags.length === 0).barcode;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    saveClick() {
        const article = new Article();
        article.articleId = this.item.articleId;
        article.packaging = new Packaging();
        article.barcodes = [<Barcode>{ barcode: this.barcode, tags: [] }];
        this.productService
            .updateArticle(this.item.articleId, article)
            .subscribe(result => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Barcode',
                    detail: 'Updated successfully!'
                });
            });
    }
}
