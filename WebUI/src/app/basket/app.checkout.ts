import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { BasketService } from 'app/services/basket.service';
import { Basket } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';
import { AccountComponent } from 'app/account/app.account';

@Component({
	selector: 'app-checkout',
	templateUrl: 'app.checkout.html',
	styleUrls: ['app.checkout.scss']
})

export class CheckoutComponent implements OnInit {
    @ViewChild('account') component: AccountComponent;
	amount = 0.0;
	count = 0.0;
	shippingCost = 10.0;
	paymentMethod = '';

	constructor(
		public snackBar: MatSnackBar,
		private router: Router,
		private dialogsService: DialogService,
		private sessionService: SessionService,
		private basketService: BasketService) {

		AppComponent.setPage('Checkout', true);
	}

	ngOnInit() {
		if (!this.sessionService.checkCredentials()) { return; }

		this.setTotals();
	}

	get isValidPayment(): Boolean { return this.paymentMethod !== ''; }
	get isValidAccount(): Boolean { return this.component.account != null && this.component.account.customerId > 0; }

    set basket(value) { this.basketService.basket = value; }
    get basket(): Basket[] { return this.basketService.basket; }

	setTotals() {
		if (this.basket.length > 0) {
			this.count = this.basket.map(p => p.basketQuantity).reduce((sum, current) => sum + current);
			this.amount = this.basket.map(p => p.basketQuantity * p.basketPrice).reduce((sum, current) => sum + current);
		} else {
			this.count = 0.0;
			this.amount = 0.0;
		}
	}

	confirmClick() {
        this.dialogsService
			.confirm('Confirm order', 'Are you sure you want to confirm this order?')
			.subscribe(res => {
				if (res) {
					this.basketService
						.commit()
						.subscribe(p => {
							this.snackBar
							.open('Successfully registered order n.' + p.movementNumber, 'Show Orders', {
								duration: 5000
							})
							.onAction()
							.subscribe(() => {
								this.router.navigate(['orders']);
							});
					});
				}
			});
	}
}
