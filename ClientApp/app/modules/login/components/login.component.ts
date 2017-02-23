import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { Login } from './../../../shared/models';

@Component({
    selector: 'login-component',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

	userform: FormGroup;
   	public user = new Login('', '');
    public msgs: Message[] = [];

	constructor(
		private authenticationService: AuthenticationService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
        this.userform = this.fb.group({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
    }

	login() {
    	this.authenticationService.login(this.user)
    		.subscribe(result => {
				if (result.login === 'ok') {
		    		this.authenticationService.grantCredentials(result.token, this.user.username);
		    	} else {
		    		this.msgs.push({severity: 'warn', summary: 'Authentication', detail: result.error});
				}
			},
			error => this.msgs.push({severity: 'error', summary: 'Authentication', detail: error}));
    }
}