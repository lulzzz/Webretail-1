import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SessionService } from 'app/services/session.service';
import { Login } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { PasswordValidation } from 'app/shared/password.validation';

@Component({
	selector: 'app-register',
	templateUrl: 'app.register.html'
})

export class RegisterComponent implements OnInit {

	userform: FormGroup;
	public user = new Login('', '');

	constructor(
		private sessionService: SessionService,
		private fb: FormBuilder) {
		AppComponent.title = 'Registration';
	}

	ngOnInit() {
		this.userform = this.fb.group({
			'email': new FormControl('', [Validators.required, Validators.email]),
			'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
			'confirmPassword': new FormControl('', Validators.required)
			}, {
				validator: PasswordValidation.MatchPassword // your validation method
			});
	}

	register() {
		// if (this.userform.value.password !== this.userform.value.password2) {
		// 	alert('The passwords do not match');
		// 	return;
		// }
		this.sessionService.register(this.user)
			.subscribe(result => {
				if (result.login === 'ok') {
					this.sessionService.grantCredentials(result);
				} else {
					alert(result.error);
				}
			},
			onerror => alert(onerror._body));
	}
}
