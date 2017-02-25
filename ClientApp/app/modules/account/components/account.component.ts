﻿import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication.service';
import { AccountService } from './../../../services/account.service';
import { Account } from './../../../shared/models';
import { Helpers } from './../../../shared/helpers';

@Component({
    selector: 'account-component',
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    totalRecords = 0;
    accounts: Account[];
	selected: Account;
    displayDialog: boolean;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private accountService: AccountService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(true);

        this.dataform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            'isAdmin': new FormControl('', Validators.required),
        });

        this.accountService.getAll()
            .subscribe(result => {
                this.accounts = result;
                this.totalRecords = this.accounts.length;
            }//, onerror => alert('ERROR\r\n' + onerror)
        );
    }

    get isNew() : boolean { return this.selected == null || this.selected.uniqueID == ''; }

    get selectedIndex(): number { return this.accounts.indexOf(this.selected); }

    editClick(item: Account) {
        this.selected = item;
        this.displayDialog = true;
    }

    addClick() {
        this.selected = new Account();
        this.displayDialog = true;
    }

    saveClick() {
        if (this.isNew) {
            this.accountService
                .create(this.selected)
                .subscribe(result => {
                    this.accounts.push(result);
                });
        } else {
            this.accountService
                .update(this.selected.uniqueID, this.selected)
                .subscribe(result => {
                    this.accounts[this.selectedIndex] = this.selected;
                });
        }
        this.selected = null;
        this.displayDialog = false;
    }

    deleteClick() {
        this.accountService
            .delete(this.selected.uniqueID)
            .subscribe(result => {
                this.accounts.splice(this.selectedIndex, 1);
            });
        this.selected = null;
        this.displayDialog = false;
    }
}
