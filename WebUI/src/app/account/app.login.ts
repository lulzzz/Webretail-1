import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SessionService } from 'app/services/session.service';
import { BasketService } from 'app/services/basket.service';
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
		public snackBar: MatSnackBar,
		private sessionService: SessionService,
		private basketService: BasketService,
		private fb: FormBuilder) {
		AppComponent.setPage('Login');
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
					this.loadBasket();
				} else {
					this.snackBar.open(result.error, 'Close');
				}
			}, onerror => this.snackBar.open(JSON.stringify(onerror), 'Close'))
	}

	loadBasket() {
		this.basketService.get()
			.subscribe(result => {
				this.basketService.basket = result;
			});
	}
}
