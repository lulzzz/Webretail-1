import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { BasketService } from 'app/services/basket.service';
import { Basket } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-basket',
	templateUrl: 'app.basket.html',
	styleUrls: ['app.basket.scss']
})

export class BasketComponent implements OnInit {

	basket: Basket[] = [];
	amount = 0.0;
	count = 0.0;

	constructor(
		public snackBar: MatSnackBar,
		private dialogsService: DialogService,
		private sessionService: SessionService,
		private basketService: BasketService) {

		AppComponent.setPage('Basket', true);
	}

	ngOnInit() {
		if (!this.sessionService.checkCredentials()) { return; }

		this.loadBasket();
	}

	loadBasket() {
		this.basketService.get()
			.subscribe(result => {
				this.basket = result;
				this.setTotals();
			},
			onerror => {
				if (onerror.status === 401) {
					this.sessionService.logout();
				}
				this.snackBar.open(onerror._body, 'Close');
			});
	}

	setTotals() {
		if (this.basket.length > 0) {
			this.count = this.basket.map(p => p.basketQuantity).reduce((sum, current) => sum + current);
			this.amount = this.basket.map(p => p.basketQuantity * p.basketPrice).reduce((sum, current) => sum + current);
		} else {
			this.count = 0.0;
			this.amount = 0.0;
		}
	}

	updateClick(item: Basket) {
		this.basketService
			.update(item.basketId, item)
			.subscribe(result => {
				this.setTotals();
			});
	}

	deleteClick(items: MatSelectionList) {
        this.dialogsService
			.confirm('Confirm delete', 'Are you sure you want to delete selected items?')
			.subscribe(res => {
				if (res) {
					items.selectedOptions.selected.forEach(item => {
						this.basketService
						.delete(item.value.basketId)
						.subscribe(result => {
							const index = this.basket.indexOf(item.value);
							this.basket.splice(index, 1);
							this.setTotals();
						});
					});
				}
			});
	}
}
