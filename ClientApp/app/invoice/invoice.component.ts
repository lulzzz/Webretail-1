import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { InvoiceService } from './../services/invoice.service';
import { Invoice, MovementArticle } from './../shared/models';
import { Helpers } from './../shared/helpers';
import { MovementPickerComponent } from './../shared/movement-picker.component';

@Component({
    selector: 'invoice-component',
    templateUrl: 'invoice.component.html'
})

export class InvoiceComponent implements OnInit, OnDestroy {
    @ViewChild(MovementPickerComponent) inputComponent: MovementPickerComponent;
    private sub: any;
    invoiceId: number;
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
            this.invoiceId = params['id'];
            this.invoiceService.getById(this.invoiceId)
                .subscribe(result => {
                    this.item = result;
                }, onerror => alert(onerror._body)
            );
            this.invoiceService.getMovementsById(this.invoiceId)
                .subscribe(result => {
                    this.items = result;
                    this.totalRecords = this.items.length;
                }, onerror => alert(onerror._body));
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
                .addMovement(0, this.invoiceId)
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
