﻿import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { InvoiceService } from './../services/invoice.service';
import { CustomerService } from './../services/customer.service';
import { Invoice } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'app-invoices-component',
    templateUrl: 'invoices.component.html'
})

export class InvoicesComponent implements OnInit {
    totalRecords = 0;
    items: Invoice[];
    selected: Invoice;
    customers: SelectItem[];
    customersFiltered: SelectItem[];
    payments: SelectItem[];
    buttons: MenuItem[];
    displayPanel: boolean;
    dataform: FormGroup;
    dateStartValue: Date;
    dateFinishValue: Date;
    amountValue: number;

    constructor(private router: Router,
                private messageService: MessageService,
                private sessionService: SessionService,
                private invoiceService: InvoiceService,
                private customerService: CustomerService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        sessionService.title = 'Invoices';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'number': new FormControl('', Validators.required),
            'date': new FormControl('', Validators.required),
            'customer': new FormControl('', Validators.required),
            'payment': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.nullValidator)
        });

        this.invoiceService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
                this.customersFiltered = [];
                this.customersFiltered.push({label: 'All', value: null});
                let filterCustomer = Helpers.distinct(result.map((item: Invoice) => Helpers.newSelectItem(item.invoiceCustomer.customerName)));
                this.customersFiltered = this.customersFiltered.concat(filterCustomer);
             }
        );

        this.customerService
            .getAll()
            .subscribe(result => {
                this.customers = [];
                this.customers.push({label: '', value: null});
                this.customers = this.customers.concat(result.map(p => Helpers.newSelectItem(p, p.customerName)));
            }
        );

        this.invoiceService
            .getPayments()
            .subscribe(result => {
                this.payments = result.map(p => Helpers.newSelectItem(p.value));
            }
        );

        this.buttons = [
            { label: 'Document', icon: 'fa-print', command: (event) => this.openClick('document/') }
        ];
    }

    get isNew(): boolean { return this.selected.invoiceId === 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addClick() {
        this.selected = new Invoice();
        this.selected.invoicePayment = this.payments[0].value;
        this.displayPanel = true;
    }

    editClick() {
        if (!this.selected) {
            return;
        }
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.invoiceService.create(this.selected)
                .subscribe(result => {
                    this.selected = result;
                    this.totalRecords++;
                    this.openClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.invoiceService.update(this.selected.invoiceId, this.selected)
                .subscribe(result => {
                    this.items[this.selectedIndex] = result;
                    this.closeClick();
                }, onerror => {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body});
                });
        }
    }

    deleteClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'Are you sure that you want to delete this invoice?',
            accept: () => {
                this.invoiceService.delete(this.selected.invoiceId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }

    openClick(detail = '') {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('invoice/' + detail + this.selected.invoiceId);
    }
}
