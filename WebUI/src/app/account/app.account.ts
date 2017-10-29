import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { CustomerService } from 'app/services/customer.service';
import { Customer } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { PasswordValidation } from 'app/shared/password.validation';

@Component({
    selector: 'app-account',
    templateUrl: 'app.account.html'
})

export class AccountComponent implements OnInit {
    account: Customer;
    dataform: FormGroup;

    constructor(public snackBar: MatSnackBar,
                private dialogsService: DialogService,
                private sessionService: SessionService,
                private customerService: CustomerService,
                private fb: FormBuilder) {
        AppComponent.title = 'Account';
    }

    ngOnInit() {
        if (!this.sessionService.checkCredentials()) { return; }

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'phone': new FormControl('', Validators.nullValidator),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
            'country': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
            'fiscalCode': new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
            'vatNumber': new FormControl('', [Validators.nullValidator, Validators.minLength(11), Validators.maxLength(11)]),
            'password': new FormControl('', [Validators.nullValidator, Validators.minLength(8), Validators.maxLength(20)]),
			'confirmPassword': new FormControl('', Validators.nullValidator)
        }, {
            validator: PasswordValidation.MatchPassword
        });

        const cutomerId = Number(localStorage.getItem('uniqueID'));
        this.customerService
            .getById(cutomerId)
            .subscribe(result => {
                this.account = result;
            }, onerror => this.snackBar.open(onerror._body, 'Undo'));
    }

    saveClick() {
        this.account.customerPassword = '';
        this.updateClick();
    }

    updateClick() {
        this.customerService
            .update(this.account.customerId, this.account)
            .subscribe(result => {
                this.account.updatedAt = result.updatedAt;
            }, onerror => this.snackBar.open(onerror._body, 'Undo'));
    }

    deleteClick() {
        this.dialogsService
            .confirm('Confirm delete', 'Are you sure you want to delete your account?')
            .subscribe(res => {
                if (res) {
                    this.customerService
                    .delete(this.account.customerId)
                    .subscribe(result => {
                        this.sessionService.removeCredentials();
                    }, onerror => this.snackBar.open(onerror._body, 'Undo'));
                }
            });
    }

    logoutClick() {
        this.sessionService.logout();
    }
}
