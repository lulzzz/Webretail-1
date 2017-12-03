import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSelectionList } from '@angular/material';
import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { BasketService } from 'app/services/basket.service';
import { Basket } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-basket',
	templateUrl: 'app.basket.html',
	styleUrls: ['app.basket.scss']
})

export class BasketComponent implements OnInit, OnDestroy {
	private sub: any;

	constructor(
		public snackBar: MatSnackBar,
		private dialogsService: DialogService,
		private sessionService: SessionService,
		private basketService: BasketService,
		private activatedRoute: ActivatedRoute) {

		AppComponent.setPage('Basket', false);
	}

	ngOnInit() {
		this.sub = this.activatedRoute.params.subscribe(params => {
			const barcode = params['barcode'];
			if (barcode) {
				localStorage.setItem('barcode', barcode);
			}
			if (this.sessionService.checkCredentials()) {
				if (barcode) {
					this.addClick(barcode);
				}
			}
		});
	}

	ngOnDestroy() {
		// Clean sub to avoid memory leak
		this.sub.unsubscribe();
	}

	get basket(): Basket[] { return this.basketService.basket; }
	get count(): number {
		return this.basket.length > 0
		? this.basket.map(p => p.basketQuantity).reduce((sum, current) => sum + current)
		: 0;
	}
	get amount(): number {
		return this.basket.length > 0
		? this.basket.map(p => p.basketQuantity * p.basketPrice).reduce((sum, current) => sum + current)
		: 0;
	}

	addClick(barcode: string) {
		const model = new Basket();
		model.basketBarcode = barcode;
		this.basketService
			.create(model)
			.subscribe(result => {
			  this.snackBar
				.open(model.basketBarcode + ' added to basket!', 'Close', {
					duration: 5000
				});
				const basket = this.basketService.basket.find(p => p.basketBarcode === model.basketBarcode);
				if (basket) {
					basket.basketQuantity = result.basketQuantity;
				} else {
					this.basketService.basket.push(result);
				}
				localStorage.removeItem('barcode');
			},
			onerror => this.snackBar.open(onerror._body, 'Close'));
	}

	updateClick(item: Basket) {
		this.basketService
			.update(item.basketId, item)
			.subscribe(result => {
				const index = this.basket.indexOf(item);
				this.basketService.basket[index] = item;
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
						});
					});
				}
			});
	}
}
