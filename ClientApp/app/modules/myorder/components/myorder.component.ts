import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { MyOrderService } from './../../../services/myorder.service';
import { MyOrder, MyOrderArticle } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';
import { ArticlePickerComponent } from './../../shared/components/article-picker.component';

@Component({
    selector: 'myorder-component',
    templateUrl: 'myorder.component.html'
})

export class MyOrderComponent implements OnInit, OnDestroy {
    @ViewChild(ArticlePickerComponent) inputComponent: ArticlePickerComponent;
    private sub: any;
    orderId: number;
    totalRecords = 0;
    totalItems = 0;
    totalAmount = 0.0;
    barcodes: string[];
    order: MyOrder;
    items: MyOrderArticle[];
    articleValue: string;
    committed: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private myOrderService: MyOrderService,
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
            this.myOrderService.getById(this.orderId)
                .subscribe(result => {
                    this.order = result;
                    this.committed = result.myOrderStatus != 'New';
                }, onerror => alert(onerror._body)
            );
            this.myOrderService.getItemsById(this.orderId)
                .subscribe(result => {
                    this.items = result;
                    this.updateTotals();
                }, onerror => alert(onerror._body)
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
        if (!this.items || this.items.length === 0) {
            return;
        }
        this.totalRecords = this.items.length;
        this.totalItems = this.items.map(p => p.quantity).reduce((sum, current) => sum + current);
        this.totalAmount = this.items.map(p => p.amount).reduce((sum, current) => sum + current);
    }

    addBarcode() {
        this.barcodes.forEach(data => {
            let array = data.split('#');
            let barcode = array[0];
            let quantity = array.length === 2 ? Number(array[1]) : 1.0;
            let item = this.items.find(p => p.barcode === barcode);
            if (item) {
                item.quantity += quantity;
                this.myOrderService
                    .updateItem(item.myOrderArticleId, item)
                    .subscribe(result => {
                        this.barcodes.splice(this.barcodes.indexOf(data), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            } else {
                item = new MyOrderArticle();
                item.myOrderId = this.orderId;
                item.barcode = barcode;
                item.quantity = quantity;
                this.myOrderService
                    .createItem(item)
                    .subscribe(result => {
                        this.items.push(result);
                        this.barcodes.splice(this.barcodes.indexOf(data), 1);
                        this.updateTotals();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    showPickerClick() {
        this.inputComponent.loadData();
    }

    pickerClick(event: any) {
        this.barcodes = this.barcodes.concat(event);
        this.addBarcode();
    }

    onUpdate(data: MyOrderArticle) {
        if (data.quantity > 0) {
            this.myOrderService.updateItem(data.myOrderArticleId, data)
                .subscribe(result => {
                    data.amount = result.amount;
                    this.updateTotals();
                }, onerror => alert(onerror._body));
        } else {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this item?',
                accept: () => {
                    this.myOrderService.deleteItem(data.myOrderArticleId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(data), 1);
                            this.updateTotals();
                        }, onerror => alert(onerror._body));
                }
            });
        }
    }
}
