import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { OrderService } from './../../../services/order.service';
import { Order, OrderArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { ArticlePickerComponent } from './../../shared/components/article-picker.component';

@Component({
    selector: 'order-component',
    templateUrl: 'order.component.html'
})

export class OrderComponent implements OnInit, OnDestroy {
    @ViewChild(ArticlePickerComponent) inputComponent: ArticlePickerComponent;
    private sub: any;
    orderId: number;
    totalRecords = 0;
    totalItems = 0;
    totalAmount = 0.0;
    barcodes: string[];
    order: Order;
    items: OrderArticle[];
    articleValue: string;
    committed: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private orderService: OrderService,
                private confirmationService: ConfirmationService,
                private location: Location) {
        this.barcodes = [];
        this.committed = false;
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.orderId = params['id'];
            this.orderService.getById(this.orderId)
                .subscribe(result => {
                    this.order = result;
                    this.committed = result.orderStatus != 'New';
                }
            );
            this.orderService.getItemsById(this.orderId)
                .subscribe(result => {
                    this.items = result;
                    this.updateTotals();
                }
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    cancelClick() {
        this.location.back();
    }

    updateTotals() {
        this.totalRecords = this.items.length;
        this.totalItems = this.items.map(p => p.quantity).reduce((sum, current) => sum + current);
        this.totalAmount = this.items.map(p => p.amount).reduce((sum, current) => sum + current);
    }

    addBarcode() {
        this.barcodes.forEach(barcode => {
            let item = this.items.find(p => p.barcode === barcode);
            if (item) {
                item.quantity += 1.0;
                this.orderService
                    .updateItem(item.orderArticleId, item)
                    .subscribe(result => {
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                        this.updateTotals();
                    });
            } else {
                item = new OrderArticle();
                item.orderId = this.orderId;
                item.barcode = barcode;
                this.orderService
                    .createItem(item)
                    .subscribe(result => {
                        this.items.push(result);
                        this.barcodes.splice(this.barcodes.indexOf(barcode), 1);
                        this.updateTotals();
                    });
            }
        });
    }

    showPickerClick() {
        this.inputComponent.loadData();
    }

    pickerClick(event: any) {
        this.barcodes.push(event);
        this.addBarcode();
    }

    onUpdate(data: OrderArticle) {
        if (data.quantity > 0) {
            this.orderService.updateItem(data.orderArticleId, data)
                .subscribe(result => {
                    data.amount = result.amount;
                    this.updateTotals();
                });
        } else {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this item?',
                accept: () => {
                    this.orderService.deleteItem(data.orderArticleId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(data), 1);
                            this.updateTotals();
                        });
                }
            });
        }
    }
}
