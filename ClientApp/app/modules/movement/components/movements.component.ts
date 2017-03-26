﻿import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem, MenuItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { CausalService } from './../../../services/causal.service';
import { CustomerService } from './../../../services/customer.service';
import { MovementService } from './../../../services/movement.service';
import { Movement } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'movements-component',
    templateUrl: 'movements.component.html',
    providers: [ StoreService, CausalService, CustomerService ]
})

export class MovementsComponent implements OnInit {
    totalRecords = 0;
    items: Movement[];
	selected: Movement;
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    customers: SelectItem[];
    customersFiltered: SelectItem[];
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
                private customerService: CustomerService,
                private movementService: MovementService,
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

        this.buttons = [
            { label: 'Document', icon: 'fa-print', command: (event) => this.openClick('document/') },
            { label: 'Barcode', icon: 'fa-barcode', command: (event) => this.openClick('barcode/') },
            { label: 'Create copy', icon: 'fa-clone', command: (event) => this.cloneClick() }
        ];

        this.movementService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
                this.buildFilter(result);
             }
        );

        this.movementService
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

        this.customerService
            .getAll()
            .subscribe(result => {
                this.customers = result.map(p => Helpers.newSelectItem(p, p.customerName));
            }
        );
    }

    buildFilter(items: Movement[]) {
        this.storesFiltered = [];
        this.storesFiltered.push({label: 'All', value: null});
        let filterStores = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.store.storeName)));
        this.storesFiltered = this.storesFiltered.concat(filterStores);

        this.causalsFiltered = [];
        this.causalsFiltered.push({label: 'All', value: null});
        let filterCusals = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.causal.causalName)));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);

        this.customersFiltered = [];
        this.customersFiltered.push({label: 'All', value: null});
        let filterCustomer = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.customer.customerName)));
        this.customersFiltered = this.customersFiltered.concat(filterCustomer);

        this.statusFiltered = [];
        this.statusFiltered.push({label: 'All', value: null});
        let filterStatus = Helpers.distinct(items.map((item: Movement) => Helpers.newSelectItem(item.movementStatus)));
        this.statusFiltered = this.statusFiltered.concat(filterStatus);
    }

    get isNew() : boolean { return this.selected == null || this.selected.movementId == 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    get getStatus() : SelectItem[] {
        if (this.selected.movementId == 0) {
            return this.status.slice(0, 1);
        }
        let index = this.status.findIndex(p => p.label === this.selected.movementStatus);
        return this.status.slice(index, 5);
    }

    addClick() {
        this.selected = new Movement();
        this.currentStatus = this.selected.movementStatus;
        //this.selected.movementNumber = this.items.length > 0 ? Math.max.apply(this, this.items.map(p => p.movementNumber)) + 1 : 1000;
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
            this.selected.movementStatus = this.status[0].value;
        }
        this.displayPanel = true;
    }

    editClick() {
        if (!this.selected) {
            return;
        }
        this.currentStatus = this.selected.movementStatus;
        this.selected.movementDate = new Date(this.selected.movementDate);
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
        this.currentStatus = null;
        this.buildFilter(this.items);
    }

    saveClick() {
        if (this.isNew) {
            this.movementService.create(this.selected)
                .subscribe(result => {
                    this.selected = result;
                    this.openClick();
                }, onerror => alert(onerror._body));
        } else {
            this.movementService.update(this.selected.movementId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => {
                    this.selected.movementStatus = this.currentStatus;
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
            message: 'All related items will be deleted. Are you sure that you want to delete this movement?',
            accept: () => {
                this.movementService.delete(this.selected.movementId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.totalRecords = this.items.length;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    cloneClick() {
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation copy',
            message: 'Are you sure that you want to create a copy of this movement?',
            accept: () => {
                this.movementService.clone(this.selected.movementId)
                    .subscribe(result => {
                        this.selected = result;
                        this.items.push(this.selected);
                        this.editClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }

    openClick(detail = '') {
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('movement/' + detail + this.selected.movementId);
    }
}
