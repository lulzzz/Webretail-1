﻿import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { CausalService } from './../../../services/causal.service';
import { MovementService } from './../../../services/movement.service';
import { Movement } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'movements-component',
    templateUrl: 'movements.component.html',
    providers: [ StoreService, CausalService ]
})

export class MovementsComponent implements OnInit {
    totalRecords = 0;
    movements: Movement[];
	selected: Movement;
    stores: SelectItem[];
    storesFiltered: SelectItem[];
    causals: SelectItem[];
    causalsFiltered: SelectItem[];
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private storeService: StoreService,
                private causalService: CausalService,
                private movementService: MovementService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'store': new FormControl('', Validators.required),
            'causal': new FormControl('', Validators.required),
            'desc': new FormControl('', Validators.required),
            'note': new FormControl('', Validators.nullValidator)
        });

        this.movementService.getAll()
            .subscribe(result => {
                this.movements = result;
                this.totalRecords = this.movements.length;
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
    }

    get isNew() : boolean { return this.selected == null || this.selected.movementId == 0; }

    get selectedIndex(): number { return this.movements.indexOf(this.selected); }

    addClick() {
        this.selected = new Movement();
        if (this.stores.length > 0) {
            this.selected.store.storeId = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.causal.causalId = this.causals[0].value;
        }
        this.displayDialog = true;
    }

    editClick() {
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.movementService.create(this.selected)
                .subscribe(result => {
                    this.movements.push(result);
                    this.selected = null;
                });
        } else {
            this.movementService.update(this.selected.movementId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayDialog = false;
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All related items will be deleted. Are you sure that you want to delete this movement?',
            accept: () => {
                this.movementService.delete(this.selected.movementId)
                    .subscribe(result => {
                        this.movements.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
                this.displayDialog = false;
            }
        });
    }

    openClick() {
        this.router.navigateByUrl('movement/' + this.selected.movementId);
    }
}