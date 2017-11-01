import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { BasketService } from 'app/services/basket.service';
import { Basket } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-basket',
	templateUrl: 'app.basket.html'
})

export class BasketComponent implements OnInit {

	dataSource: BasketDataSource;
	displayedColumns = ['id', 'barcode', 'quantity', 'price'];

	constructor(
		public snackBar: MatSnackBar,
		private basketService: BasketService) {

		AppComponent.setPage('Basket', true);
	}

	ngOnInit() {
		this.loadBasket();
	}

	loadBasket() {
		this.basketService.get()
			.subscribe(result => {
				this.dataSource = new BasketDataSource(result);
			},
			onerror => this.snackBar.open(onerror.status === 401 ? '401 - Unauthorized' : onerror._body, 'Close'))
	}
}

export class BasketDataSource extends DataSource<any> {

	basket: Basket[] = [];

	constructor(basket: Basket[]) {
		super();
		this.basket = basket;
	};

	connect(): Observable<Basket[]> {
	  return Observable.of(this.basket);
	}

	disconnect() {}
}

