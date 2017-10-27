import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from 'app/services/session.service';
import { Login } from 'app/shared/models';
import { AppComponent } from 'app/app.component';

@Component({
	selector: 'app-login',
	templateUrl: 'app.login.html'
})

export class LoginComponent implements OnInit {
	dataform: FormGroup;
	public user = new Login('', '');

	constructor(
		private sessionService: SessionService,
		private fb: FormBuilder) {
		AppComponent.title = 'Login';
	}

	ngOnInit() {
		this.dataform = this.fb.group({
			'email': new FormControl('', [Validators.required, Validators.email]),
			'password': new FormControl('', Validators.required)
		});
	}

	login() {
		this.sessionService.login(this.user)
			.subscribe(result => {
				if (result.login === 'ok') {
					this.sessionService.grantCredentials(result);
				} else {
					alert(result.error);
				}
			}, onerror => alert(onerror._body))
	}
}
