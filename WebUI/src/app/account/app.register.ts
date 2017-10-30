import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SessionService } from 'app/services/session.service';
import { Login } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { PasswordValidation } from 'app/shared/password.validation';

@Component({
	selector: 'app-register',
	templateUrl: 'app.register.html'
})

export class RegisterComponent implements OnInit {

	dataform: FormGroup;
	public user = new Login('', '');

	constructor(
		public snackBar: MatSnackBar,
		private sessionService: SessionService,
		private fb: FormBuilder) {
		AppComponent.setPage('Registration', true);
	}

	ngOnInit() {
		this.dataform = this.fb.group({
			'email': new FormControl('', [Validators.required, Validators.email]),
			'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
			'confirmPassword': new FormControl('', Validators.required)
			}, {
				validator: PasswordValidation.MatchPassword // your validation method
			});
	}

	register() {
		this.sessionService.register(this.user)
			.subscribe(result => {
				if (result.login === 'ok') {
					this.sessionService.grantCredentials(result);
				} else {
					this.snackBar.open(result.error, 'Close');
				}
			},
			onerror => this.snackBar.open(onerror._body, 'Close'));
	}
}
