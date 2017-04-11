import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { CashRegisterService } from './../services/cashregister.service';
import { StoreService } from './../services/store.service';
import { CashRegister } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'cashregister-component',
    templateUrl: 'cashregister.component.html'
})

export class CashRegisterComponent implements OnInit {
    totalRecords = 0;
    items: CashRegister[];
	selected: CashRegister;
    stores: SelectItem[];
    displayPanel: boolean;
	dataform: FormGroup;
    
    constructor(private authenticationService: AuthenticationService,
                private cashRegisterService: CashRegisterService,
                private storeService: StoreService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'store': new FormControl('', Validators.required),
            'join': new FormControl('', Validators.required)
        });

        this.cashRegisterService
            .getAll()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
            }, onerror => alert(onerror._body)
        );

        this.storeService.getAll()
            .subscribe(result => {
                this.stores = result.map(p => Helpers.newSelectItem(p, p.storeName));
            }, onerror => alert(onerror._body)
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.cashRegisterId == 0; }

    get selectedIndex(): number { return this.items.indexOf(this.selected); }

    addClick() {
        this.selected = new CashRegister();
        this.selected.store = this.stores.length > 0 ? this.stores[0].value : null;
        this.displayPanel = true;
    }

    onRowSelect(event: any) {
        this.displayPanel = true;
    }

    closeClick() {
        if (this.dataform.controls.join.value === true) {
            localStorage.setItem("cashRegister", JSON.stringify(this.selected));
        }
        this.displayPanel = false;
        this.selected = null;
    }

    saveClick() {
        if (this.isNew) {
            this.cashRegisterService
                .create(this.selected)
                .subscribe(result => {
                    this.items.push(result);
                    this.closeClick();
                }, onerror => alert(onerror._body));
        } else {
            this.cashRegisterService
                .update(this.selected.cashRegisterId, this.selected)
                .subscribe(result => {
                    this.closeClick();
                }, onerror => alert(onerror._body));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All related products will be deleted. Are you sure that you want to delete this cash register?',
            accept: () => {
                this.cashRegisterService
                    .delete(this.selected.cashRegisterId)
                    .subscribe(result => {
                        this.items.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.closeClick();
                    }, onerror => alert(onerror._body));
            }
        });
    }
}
