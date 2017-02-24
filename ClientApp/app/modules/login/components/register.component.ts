import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from './../../../services/authentication.service';
import { Login } from './../../../shared/models';

@Component({
    selector: 'register-component',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

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
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

	register() {
    	this.authenticationService.register(this.user)
    		.subscribe(result => {
				if (result.login === 'ok') {
					alert(JSON.stringify(result));
		    		this.authenticationService.grantCredentials(result.token, true);
		    	} else {
		    		this.msgs.push({severity: 'warn', summary: 'Authentication', detail: result.error});
				}
			},
			error => this.msgs.push({severity: 'error', summary: 'Registration', detail: error}));
    }
}