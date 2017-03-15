﻿import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { CausalService } from './../../../services/causal.service';
import { CustomerService } from './../../../services/customer.service';
import { OrderService } from './../../../services/order.service';
import { Order } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'orders-component',
    templateUrl: 'orders.component.html',
    providers: [ StoreService, CausalService, CustomerService ]
})

export class OrdersComponent implements OnInit {
    totalRecords = 0;
    orders: Order[];
	selected: Order;
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    customers: SelectItem[];
    customersFiltered: SelectItem[];
    displayPanel: boolean;
	dataform: FormGroup;
    buttons: MenuItem[];

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private storeService: StoreService,
                private causalService: CausalService,
                private customerService: CustomerService,
                private orderService: OrderService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'store': new FormControl('', Validators.required),
            'causal': new FormControl('', Validators.required),
            'customer': new FormControl('', Validators.required),
            'number': new FormControl('', Validators.required),
            'date': new FormControl('', Validators.required),
            'status': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.nullValidator)
        });

        this.orderService.getAll()
            .subscribe(result => {
                this.orders = result;
                this.totalRecords = this.orders.length;
                this.buildFilter(result);
            }
        );

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p, p.storeName));
            }
        );

        this.causalService.getAll()
            .subscribe(result => {
                this.causals = result.map(p => Helpers.newSelectItem(p, p.causalName));
            }
        );

        this.customerService.getAll()
            .subscribe(result => {
                this.customers = result.map(p => Helpers.newSelectItem(p, p.customerLastname + ' ' + p.customerFirstname));
            }
        );
    }

    buildFilter(items: Order[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: Order) => Helpers.newSelectItem(item.store.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: Order) => Helpers.newSelectItem(item.causal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);

        this.customersFiltered = [];
        this.customersFiltered.push({label: 'All', value: null});
        let filterCustomer = Helpers.distinct(items.map((item: Order) => Helpers.newSelectItem(item.customer.customerLastname + ' ' + item.customer.customerFirstname)));
        this.customersFiltered = this.customersFiltered.concat(filterCustomer);
    }

    get isNew() : boolean { return this.selected == null || this.selected.orderId == 0; }

    get selectedIndex(): number { return this.orders.indexOf(this.selected); }

    addClick() {
        this.selected = new Order();
        if (this.stores.length > 0) {
            this.selected.store = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.causal = this.causals[0].value;
        }
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
            this.orderService.create(this.selected)
                .subscribe(result => {
                    this.orders.push(result);
                    this.selected = null;
                });
        } else {
            this.orderService.update(this.selected.orderId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayPanel = false;
    }

    deleteClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'All related items will be deleted. Are you sure that you want to delete this order?',
            accept: () => {
                this.orderService.delete(this.selected.orderId)
                    .subscribe(result => {
                        this.orders.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }

    commitClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Commit',
            message: 'All related items will be booked. Are you sure that you want to "commit" this order?',
            accept: () => {
                this.orderService.commit(this.selected.orderId)
                    .subscribe(result => {
                        this.orders.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }

    roolbackClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Roolback',
            message: 'All related items will be removed from booking. Are you sure that you want to "uncommit" this order?',
            accept: () => {
                this.orderService.roolback(this.selected.orderId)
                    .subscribe(result => {
                        this.orders.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }

    openClick() {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('order/' + this.selected.orderId);
    }
}
