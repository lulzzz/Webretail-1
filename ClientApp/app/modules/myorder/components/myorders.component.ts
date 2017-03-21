import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { CausalService } from './../../../services/causal.service';
import { MyOrderService } from './../../../services/myorder.service';
import { MyOrder } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'myorders-component',
    templateUrl: 'myorders.component.html',
    providers: [ StoreService, CausalService ]
})

export class MyOrdersComponent implements OnInit {
    totalRecords = 0;
    orders: MyOrder[];
	selected: MyOrder;
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    status: SelectItem[];
    statusFiltered: SelectItem[];
    currentStatus: string;
	displayPanel: boolean;
	dataform: FormGroup;
    buttons: MenuItem[];
    newNumber: number;
    dateStartValue: Date;
    dateFinishValue: Date;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private storeService: StoreService,
                private causalService: CausalService,
                private myOrderService: MyOrderService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'store': new FormControl('', Validators.required),
            'causal': new FormControl('', Validators.required),
            'supplier': new FormControl('', Validators.required),
            'number': new FormControl('', Validators.required),
            'date': new FormControl('', Validators.required),
            'status': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.nullValidator)
        });

        this.myOrderService
            .getAll()
            .subscribe(result => {
                this.orders = result;
                this.totalRecords = this.orders.length;
                this.buildFilter(result);
             }
        );

        this.myOrderService
            .getStatus()
            .subscribe(result => {
                this.status = result.map(p => Helpers.newSelectItem(p.value));
            }
        );

        this.storeService
            .getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p, p.storeName));
            }
        );

        this.causalService
            .getAll()
            .subscribe(result => {
                this.causals = result.map(p => Helpers.newSelectItem(p, p.causalName));
            }
        );
    }

    buildFilter(items: MyOrder[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: MyOrder) => Helpers.newSelectItem(item.store.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: MyOrder) => Helpers.newSelectItem(item.causal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);

        this.statusFiltered = [];
        this.statusFiltered.push({label: 'All', value: null});
        let filterStatus = Helpers.distinct(items.map((item: MyOrder) => Helpers.newSelectItem(item.myOrderStatus)));
        this.statusFiltered = this.statusFiltered.concat(filterStatus);
    }

    get isNew() : boolean { return this.selected == null || this.selected.myOrderId == 0; }

    get selectedIndex(): number { return this.orders.indexOf(this.selected); }

    get getStatus() : SelectItem[] {
        let index = this.status.findIndex(p => p.label === this.selected.myOrderStatus);
        return this.status.slice(index, 5);
    }

    addClick() {
        this.selected = new MyOrder();
        this.currentStatus = this.selected.myOrderStatus;
        this.selected.myOrderNumber = this.orders.length > 0 ? Math.max.apply(this, this.orders.map(p => p.myOrderNumber)) + 1 : 1000;
        if (this.stores.length > 0) {
            this.selected.store = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.causal = this.causals[0].value;
        }
        if (this.status.length > 0) {
            this.selected.myOrderStatus = this.status[0].value;
        }
        this.displayPanel = true;
    }

    editClick() {
        if (!this.selected) {
            return;
        }
        this.currentStatus = this.selected.myOrderStatus;
        this.selected.myOrderDate = new Date(this.selected.myOrderDate);
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
        this.currentStatus = null;
    }

    saveClick() {
        if (this.isNew) {
            this.myOrderService.create(this.selected)
                .subscribe(result => {
                    this.orders.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.myOrderService.update(this.selected.myOrderId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => {
                    this.selected.myOrderStatus = this.currentStatus;
                    alert(onerror._body);
                });
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
                this.myOrderService.delete(this.selected.myOrderId)
                    .subscribe(result => {
                        this.orders.splice(this.selectedIndex, 1);
                        this.totalRecords = this.orders.length;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    openClick() {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('myorder/' + this.selected.myOrderId);
    }
}
