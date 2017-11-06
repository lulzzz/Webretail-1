import { Component, OnInit, OnDestroy } from '@angular/core';
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

  ngOnInit() {
    this.images = [];
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  loadProduct(id: number) {
    this.productService.getByProductId(id)
        .subscribe(result => {
          this.product = result;
          AppComponent.setPage(result.productName, true);
          this.product.medias.forEach(m => {
            this.images.push({'sType': 'img', 'imgSrc': new ParseUrlPipe().transform(m.url)});
          });
        }, onerror => this.snackBar.open(onerror.status === 401 ? '401 - Unauthorized' : onerror._body, 'Close')
      );
  }

  pickerClick(event: Article) {
    const model = new Basket();
    model.basketBarcode = event.barcodes.find(p => p.primaryKey === '' && p.primaryKey === '').barcode;
    this.basketService
        .create(model)
        .subscribe(result => {
          this.snackBar
          .open(model.basketBarcode + ' added to basket!', 'Show Basket', {
            duration: 5000
          })
          .onAction()
          .subscribe(() => {
            this.router.navigate(['basket']);
          });
          this.basketService.basket.push(result);
        });
  }
}
