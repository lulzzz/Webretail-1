import { Component, OnInit, Input } from '@angular/core';
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
    status: SelectItem[];
    statusFiltered: SelectItem[];
    displayPanel: boolean;
	committed: boolean;
	dataform: FormGroup;
    buttons: MenuItem[];
    newNumber: number;
    dateValue: Date;

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

        this.orderService.getStatus()
            .subscribe(result => {
                this.status = result.map(p => Helpers.newSelectItem(p.value));
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
                this.customers = result.map(p => Helpers.newSelectItem(p, p.customerName));
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
        let filterCustomer = Helpers.distinct(items.map((item: Order) => Helpers.newSelectItem(item.customer.customerName)));
        this.customersFiltered = this.customersFiltered.concat(filterCustomer);

        this.statusFiltered = [];
        this.statusFiltered.push({label: 'All', value: null});
        let filterStatus = Helpers.distinct(items.map((item: Order) => Helpers.newSelectItem(item.orderStatus)));
        this.statusFiltered = this.statusFiltered.concat(filterStatus);
    }

    get isNew() : boolean { return this.selected == null || this.selected.orderId == 0; }

    get selectedIndex(): number { return this.orders.indexOf(this.selected); }

    addClick() {
        this.selected = new Order();
        this.committed = false;
        this.selected.orderNumber = this.orders.length > 0 ? Math.max.apply(this, this.orders.map(p => p.orderNumber)) + 1 : 1000;
        if (this.stores.length > 0) {
            this.selected.store = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.causal = this.causals[0].value;
        }
        if (this.customers.length > 0) {
            this.selected.customer = this.customers[0].value;
        }
        if (this.status.length > 0) {
            this.selected.orderStatus = this.status[0].value;
        }
        this.displayPanel = true;
    }

    editClick() {
        if (!this.selected) {
            return;
        }
        this.committed = this.selected.orderStatus !== 'New';
        this.selected.orderDate = new Date(this.selected.orderDate);
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
        this.committed = false;
    }

    saveClick() {
        if (this.isNew) {
            this.orderService.create(this.selected)
                .subscribe(result => {
                    this.orders.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.orderService.update(this.selected.orderId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
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
                        this.closeClick();
                    }, onerror => alert(onerror._body));
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
