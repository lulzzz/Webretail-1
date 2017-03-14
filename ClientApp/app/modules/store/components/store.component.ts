﻿import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { StoreService } from './../../../services/store.service';
import { Store } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'store-component',
    templateUrl: 'store.component.html'
})

export class StoreComponent implements OnInit {
    totalRecords = 0;
    stores: Store[];
	selected: Store;
    displayPanel: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private storeService: StoreService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'address': new FormControl('', Validators.nullValidator),
            'city': new FormControl('', Validators.nullValidator),
            'zip': new FormControl('', [Validators.nullValidator, Validators.minLength(5), Validators.maxLength(5)]),
            'country': new FormControl('', Validators.nullValidator)
        });

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result;
                this.totalRecords = this.stores.length;
            }
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.storeId == 0; }

    get selectedIndex(): number { return this.stores.indexOf(this.selected); }

    addClick() {
        this.selected = new Store();
        this.displayPanel = true;
    }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.storeService.create(this.selected)
                .subscribe(result => {
                    this.stores.push(result);
                    this.selected = null;
                });
        } else {
            this.storeService.update(this.selected.storeId, this.selected)
                .subscribe(result => {
                    this.selected = null;
                });
        }
        this.displayPanel = false;
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All related articles stocks will be deleted. Are you sure that you want to delete this store?',
            accept: () => {
                this.storeService.delete(this.selected.storeId)
                    .subscribe(result => {
                        this.stores.splice(this.selectedIndex, 1);
                        this.selected = null;
                    });
            }
        });
    }
}
