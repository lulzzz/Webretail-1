import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { Login } from './../shared/models';

@Component({
    selector: 'app-register-component',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

	userform: FormGroup;
   	public user = new Login('', '');

	constructor(
		private messageService: MessageService,
		private sessionService: SessionService,
		private fb: FormBuilder) {
    }

	ngOnInit() {
        this.sessionService.setTitle('Register');
        this.userform = this.fb.group({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
			'password2': new FormControl('', Validators.required)
        });
    }

	register() {
		if (this.userform.value.password !== this.userform.value.password2) {
			this.messageService.add({severity: 'error', summary: 'Registration', detail: 'The passwords do not match'});
			return;
		}
		// this.sessionService.register(this.user)
    	// 	.subscribe(result => {
		// 		if (result.login === 'ok') {
		// 			this.sessionService.grantCredentials(result);
		//     	} else {
		//     		this.messageService.add({severity: 'warn', summary: 'Authentication', detail: result.error});
		// 		}
		// 	},
		// 	error => this.messageService.add({severity: 'error', summary: 'Registration', detail: error}));
    }
}
