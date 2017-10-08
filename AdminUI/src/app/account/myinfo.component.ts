import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from './../services/session.service';
import { AccountService } from './../services/account.service';
import { Account } from './../shared/models';

@Component({
    selector: 'myinfo-component',
    templateUrl: 'myinfo.component.html'
})

export class MyInfoComponent implements OnInit {
    public myinfo: Account;
    dataform: FormGroup;

    constructor(private sessionService: SessionService,
                private accountService: AccountService,
                private fb: FormBuilder) {
       sessionService.title = 'My Info';
    }

    ngOnInit() {
        this.sessionService.getCredentials()
            .subscribe(p => {
                this.accountService.getById(p.uniqueID)
                    .subscribe(account => {
                        this.myinfo = account;
                    });
            }, onerror => alert(onerror));

        this.dataform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
        });
    }

    saveClick() {
        this.accountService
            .update(this.myinfo.uniqueID, this.myinfo)
            .subscribe(result => { });
    }
}
