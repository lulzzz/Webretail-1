import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { SessionService } from './../services/session.service';
import { Login } from './../shared/models';

@Component({
    selector: 'login-component',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	userform: FormGroup;
	public user = new Login('', '');
    public msgs: Message[] = [];

	constructor(
		private sessionService: SessionService,
		private fb: FormBuilder) {
		sessionService.title = 'Login';
    }

	ngOnInit() {
        this.userform = this.fb.group({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
    }

	login() {
    	this.sessionService.login(this.user)
    		.subscribe(result => {
				if (result.login === 'ok') {
		    		this.sessionService.grantCredentials(result);
		    	} else {
		    		this.msgs.push({severity: 'warn', summary: 'Authentication', detail: result.error});
				}
			}, error => this.msgs.push({severity: 'error', summary: 'Authentication', detail: error}));
    }
}
