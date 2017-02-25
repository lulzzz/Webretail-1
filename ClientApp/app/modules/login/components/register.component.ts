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
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
			'password2': new FormControl('', Validators.required)
        });
    }

	register() {
		if (this.userform.value.password !== this.userform.value.password2) {
			this.msgs.push({severity: 'error', summary: 'Registration', detail: 'The passwords do not match'});
			return;
		}
		this.authenticationService.register(this.user)
    		.subscribe(result => {
				if (result.login === 'ok') {
					this.authenticationService.grantCredentials(result.token, true);
		    	} else {
		    		this.msgs.push({severity: 'warn', summary: 'Authentication', detail: result.error});
				}
			},
			error => this.msgs.push({severity: 'error', summary: 'Registration', detail: error}));
    }
}