import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { Login } from './../shared/models';

@Component({
	selector: 'app-login-component',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	userform: FormGroup;
	public user = new Login('', '');

	constructor(
		private messageService: MessageService,
		private sessionService: SessionService,
		private fb: FormBuilder) {
		sessionService.title = 'Authentication';
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
					this.messageService.add({ severity: 'warn', summary: 'Authentication', detail: result.error });
				}
			}, error => this.messageService.add({ severity: 'error', summary: 'Authentication', detail: error }));
	}
}
