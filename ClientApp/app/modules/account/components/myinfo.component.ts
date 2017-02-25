import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication.service';
import { AccountService } from './../../../services/account.service';
import { Account } from './../../../shared/models';

@Component({
    selector: 'myinfo-component',
    templateUrl: 'myinfo.component.html'
})

export class MyInfoComponent implements OnInit {
	myinfo: Account;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private accountService: AccountService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.myinfo = new Account();
        this.authenticationService.getCredentials()
            .subscribe(p => {
                this.accountService.getById(p.uniqueID)
                    .subscribe(account => {
                        JSON.stringify(account);
                        this.myinfo = account;
                    });
            });

        this.dataform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
        });

        // this.accountService.getAll()
        //     .subscribe(result => {
        //         this.accounts = result;
        //         this.totalRecords = this.accounts.length;
        //     }//, onerror => alert('ERROR\r\n' + onerror)
        // );
    }

    saveClick() {
        this.accountService
            .update(this.myinfo.uniqueID, this.myinfo)
            .subscribe(result => {
                alert(result);
            });
    }
}
