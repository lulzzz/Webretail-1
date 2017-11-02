import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { CustomerService } from 'app/services/customer.service';
import { Movement } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-orders',
	templateUrl: 'app.orders.html'
})

export class OrdersComponent implements OnInit {

	dataSource: OrderDataSource;
	displayedColumns = ['number', 'date', 'amount', 'payment', 'status'];

	constructor(
		public snackBar: MatSnackBar,
		private customerService: CustomerService) {

		AppComponent.setPage('Orders', true);
	}

	ngOnInit() {
		this.loadOrders();
	}

	loadOrders() {
		this.customerService.getOrders()
			.subscribe(result => {
				this.dataSource = new OrderDataSource(result);
			},
			onerror => this.snackBar.open(onerror.status === 401 ? '401 - Unauthorized' : onerror._body, 'Close'))
	}
}

export class OrderDataSource extends DataSource<any> {

	orders: Movement[] = [];

	constructor(orders: Movement[]) {
		super();
		this.orders = orders;
	};

	connect(): Observable<Movement[]> {
	  return Observable.of(this.orders);
	}

	disconnect() {}
}