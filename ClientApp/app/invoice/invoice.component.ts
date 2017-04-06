import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { InvoiceService } from './../services/invoice.service';
import { Invoice, Movement } from './../shared/models';
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
    items: Movement[];
    itemsSelected: Movement[];
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    dateStartValue: Date;
    dateFinishValue: Date;

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
                    this.buildFilter(this.items);
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

    buildFilter(items: Movement[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.movementStore.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.movementCausal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
    }

    showPickerClick() {
        this.inputComponent.loadData(this.item.invoiceCustomer.customerId);
    }

    pickerClick(event: any) {
        event.forEach(id => {
            this.invoiceService
                .addMovement(this.invoiceId, Number(id))
                .subscribe(result => {
                    this.invoiceService.getMovementsById(this.invoiceId)
                                       .subscribe(result => { 
                                           this.items = result;
                                           this.totalRecords = this.items.length; 
                                       });
                }, onerror => alert(onerror._body));
        });
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
