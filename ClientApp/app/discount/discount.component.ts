import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { SessionService } from './../services/session.service';
import { DiscountService } from './../services/discount.service';
import { Discount, DiscountProduct } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { ProductPickerComponent } from './../shared/product-picker.component';

@Component({
    selector: 'discount-component',
    templateUrl: 'discount.component.html'
})

export class DiscountComponent implements OnInit, OnDestroy {
    @ViewChild(ProductPickerComponent) inputComponent: ProductPickerComponent;
    private sub: any;
    discountId: number;
    totalRecords = 0;
    codes: string[];
    item: Discount;
    items: DiscountProduct[];
    itemsSelected: DiscountProduct[];
    articleValue: string;
    sliderValue: number;

    constructor(private activatedRoute: ActivatedRoute,
                private sessionService: SessionService,
                private discountService: DiscountService,
                private confirmationService: ConfirmationService,
                private location: Location) {
        this.codes = [];
        this.itemsSelected = [];
        sessionService.title = 'Discount';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.discountService.getById(params['id'])
                .subscribe(result => {
                    this.item = result;
                    this.discountId = result.discountId;
                    this.discountService.getItemsById(this.discountId)
                        .subscribe(res => {
                            this.items = res;
                            this.totalRecords = this.items.length;
                        }, onerror => alert(onerror._body)
                    );
                }, onerror => alert(onerror._body)
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    reloadData() {
        this.items =  this.items.map(p => p);
        this.totalRecords = this.items.length;
    }

   cancelClick() {
        this.location.back();
    }

    addCodes() {
        this.codes.forEach(code => {
            let item = new DiscountProduct();
            item.discountId = this.discountId;
            item.discountProduct.productCode = code;
            this.discountService
                .addProduct(item)
                .subscribe(result => {
                    this.items.push(result);
                    this.codes.splice(this.codes.indexOf(code), 1);
                    this.reloadData();
                }, onerror => alert(onerror._body));
        });
    }

    showPickerClick() {
        this.inputComponent.loadData();
    }

    pickerClick(event: any) {
        this.codes = this.codes.concat(event);
        this.addCodes();
    }

    removeClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this selected items?',
            accept: () => {
                this.itemsSelected.forEach(p => {
                    this.discountService
                        .removeProduct(p.discountProductId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(p), 1);
                            this.reloadData();
                        }, onerror => alert(onerror._body));
                });
            }
        });
    }
}
