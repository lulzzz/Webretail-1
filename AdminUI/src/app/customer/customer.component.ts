﻿import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, Paginator } from 'primeng/primeng';
import { SessionService } from './../services/session.service';
import { CustomerService } from './../services/customer.service';
import { Customer } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html'
})

export class CustomerComponent implements OnInit {
    totalRecords = 0;
    customers: Customer[];
    selected: Customer;
    displayPanel: boolean;
    dataform: FormGroup;

    constructor(private sessionService: SessionService,
                private customerService: CustomerService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
       sessionService.title = 'Customers';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl('', Validators.nullValidator),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', Validators.required),
            'country': new FormControl('', Validators.required),
            'fiscalCode': new FormControl('', Validators.nullValidator),
            'vatNumber': new FormControl('', Validators.nullValidator)
        });

        this.customerService.getAll()
            .subscribe(result => {
                this.customers = result;
                this.totalRecords = this.customers.length;
            }, onerror => alert(onerror._body)
        );
    }

    get isNew(): boolean { return this.selected == null || this.selected.customerId === 0; }

    get selectedIndex(): number { return this.customers.indexOf(this.selected); }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    addClick() {
        this.selected = new Customer();
        this.displayPanel = true;
    }

    saveClick() {
        if (this.isNew) {
            this.customerService
                .create(this.selected)
                .subscribe(result => {
                    this.customers.push(result);
                    this.totalRecords++;
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.customerService
                .update(this.selected.customerId, this.selected)
                .subscribe(result => {
                    this.customers[this.selectedIndex] = this.selected;
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this customer?',
            accept: () => {
                this.customerService
                    .delete(this.selected.customerId)
                    .subscribe(result => {
                        this.customers.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}