import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import {
    Product, Article, Barcode, GroupItem, Packaging
} from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';

@Component({
    selector: 'app-grouped',
    templateUrl: 'grouped.component.html'
})

export class GroupedComponent implements OnInit {

    articleForm: [GroupItem];
    totalRecords = 0;
    display: boolean;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private sessionService: SessionService,
                private productService: ProductService) {
    }

    get product(): Product { return this.productService.product; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.productService.getGroup(this.product.productId)
            .subscribe(result => {
                this.articleForm = result;
                this.totalRecords = this.articleForm.length;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    addClick() {
        this.display = true;
    }

    pickerClick(data) {
        data.forEach(element => {
            const array = element.split('#');
            const barcode = array[0];
            const article = new Article();
            article.packaging = new Packaging();
            article.barcodes = [<Barcode>{ barcode: barcode, tags: [] }];
            this.productService
                .addArticle(article)
                .subscribe(result => {
                    this.articleForm.push(result);
                    this.totalRecords++;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Product',
                        detail: 'Added successfully!'
                    });
                });
        });
        this.display = false;
    }

    removeClick(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this article?',
            accept: () => {
                this.productService
                .removeArticle(id)
                .subscribe(result => {
                    const index = this.articleForm.findIndex(p => p.id === id);
                    this.articleForm.splice(index, 1);
                    this.totalRecords--;
                });
            }
        });
    }
}
