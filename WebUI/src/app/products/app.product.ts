import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'app/services/product.service';
import { BasketService } from 'app/services/basket.service';
import { Product, Article, Basket } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { ParseUrlPipe } from 'app/pipes/parseurl.pipe';

@Component({
	moduleId: module.id,
	selector: 'app-product',
	templateUrl: 'app.product.html',
	styleUrls: ['app.product.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
	private sub: any;
	product: Product;
	images: Array<any>;

	constructor(
		private router: Router,
		private snackBar: MatSnackBar,
		private productService: ProductService,
		private basketService: BasketService,
		private activatedRoute: ActivatedRoute
	) { }

	get isIframe(): boolean { return AppComponent.inIframe(); }

	ngOnInit() {
		this.images = [];
		if (localStorage.getItem('barcode')) {
			this.pickerClick(null);
		}
		this.sub = this.activatedRoute.params.subscribe(params => {
			const name = params['name'];
			this.loadProduct(name);
		});
	}

  ngOnDestroy() {
		// Clean sub to avoid memory leak
		this.sub.unsubscribe();
  }

  loadProduct(name: string) {
		this.productService.getByProductName(name)
			.subscribe(result => {
				this.product = result;
				AppComponent.setPage(result.productName, !this.isIframe, !this.isIframe);
				if (!this.isIframe) {
					this.product.medias.forEach(m => {
						this.images.push({ 'sType': 'img', 'imgSrc': new ParseUrlPipe().transform([m]) });
					});
				}
			}, onerror => this.snackBar.open(onerror.status === 401 ? '401 - Unauthorized' : onerror._body, 'Close'));
  }

pickerClick(event: Article) {
	const model = new Basket();
	if (event !== null) {
		model.basketBarcode = event.barcodes.find(p => p.tags.length === 0).barcode;
		localStorage.setItem('barcode', model.basketBarcode);
	} else {
		model.basketBarcode = localStorage.getItem('barcode');
	}
	this.basketService
      .create(model)
      .subscribe(result => {
			localStorage.removeItem('barcode');
			this.snackBar
					.open(model.basketBarcode + ' added to basket!', 'Show Basket', {
						duration: 5000
					})
			.onAction()
			.subscribe(() => {
            if (this.isIframe) {
					window.parent.postMessage('basket', '*');
            } else {
              	this.router.navigate(['basket']);
            }
			});

        	if (!this.isIframe) {
          	const basket = this.basketService.basket.find(p => p.basketBarcode === model.basketBarcode);
          	if (basket) {
					basket.basketQuantity += 1.0;
          	} else {
            	this.basketService.basket.push(result);
				}
        	} else {
				window.parent.postMessage('token:' + localStorage.getItem('token'), '*');
			}
		}, onerror => this.snackBar.open(onerror.status === 401 ? 'You must login before adding to basket' : onerror._body, 'Login')
		.onAction()
		.subscribe(() => {
			localStorage.setItem('origin', this.router.url);
			this.router.navigate(['login']);
		}));
  }
}
