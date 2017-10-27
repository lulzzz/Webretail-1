import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from 'app/services/session.service';
import { CustomerService } from 'app/services/customer.service';
import { Customer } from 'app/shared/models';
import { AppComponent } from 'app/app.component';

@Component({
    selector: 'app-account',
    templateUrl: 'app.account.html'
})

export class AccountComponent implements OnInit {
    account: Customer;
    dataform: FormGroup;

    constructor(private sessionService: SessionService,
                private customerService: CustomerService,
                private fb: FormBuilder) {
        AppComponent.title = 'Account';
    }

    ngOnInit() {
        this.sessionService.checkCredentials();

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
            'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
            'confirmPassword': new FormControl('', Validators.required)
        });

        // const cutomerId = Number(localStorage.getItem('uniqueID'));
        // this.customerService
        //     .getById(cutomerId)
        //     .subscribe(result => {
        //         this.account = result;
        //     }, onerror => alert(onerror._body))
    }

    saveClick() {
        this.customerService
            .update(this.account.customerId, this.account)
            .subscribe(result => {
                this.account = result;
            }, onerror => alert(onerror._body))
    }

    deleteClick() {
        this.customerService
            .delete(this.account.customerId)
            .subscribe(result => {
                this.sessionService.removeCredentials();
            }, onerror => alert(onerror._body));
    }
}
