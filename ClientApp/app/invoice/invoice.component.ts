import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { InvoiceService } from './../services/invoice.service';
import { Invoice, MovementArticle } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { ProductPickerComponent } from './../shared/product-picker.component';

@Component({
    selector: 'invoice-component',
    templateUrl: 'invoice.component.html'
})

export class InvoiceComponent implements OnInit, OnDestroy {
    @ViewChild(ProductPickerComponent) inputComponent: ProductPickerComponent;
    private sub: any;
    discountId: number;
    totalRecords = 0;
    codes: string[];
    item: Invoice;
    items: MovementArticle[];
    itemsSelected: MovementArticle[];
    articleValue: string;
    sliderValue: number;

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private invoiceService: InvoiceService,
                private confirmationService: ConfirmationService,
                private location: Location) {
        this.codes = [];
        this.itemsSelected = [];
    }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.discountId = params['id'];
            this.invoiceService.getById(this.discountId)
                .subscribe(result => {
                    this.item = result;
                    // this.invoiceService.getItemsById(this.discountId)
                    //     .subscribe(result => {
                    //         this.items = result;
                    //         this.totalRecords = this.items.length;
                    //     }, onerror => alert(onerror._body));
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

    addCodes() {
        this.codes.forEach(code => {
            this.invoiceService
                .addMovement(0, 1)
                .subscribe(result => {
                    this.items.push(result);
                    this.codes.splice(this.codes.indexOf(code), 1);
                    this.totalRecords = this.items.length;
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
                this.itemsSelected.forEach(p =>{
                    this.invoiceService
                        .removeMovement(p.movementId)
                        .subscribe(result => {
                            this.items.splice(this.items.indexOf(p), 1);
                            this.totalRecords = this.items.length;
                        }, onerror => alert(onerror._body));
                });
            }
        });
    }
}
