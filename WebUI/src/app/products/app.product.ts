import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'app/services/product.service';
import { Product, Article } from 'app/shared/models';
import { AppComponent } from 'app/app.component';
import { ArticlePicker } from 'app/shared/article.picker';

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: 'app.product.html',
  styleUrls: ['app.product.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild(ArticlePicker) inputComponent: ArticlePicker;
  private sub: any;
  product: Product;
  images: Array<any>;

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private productService: ProductService,
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
          AppComponent.title = result.productName;
          this.product.medias.forEach(m => {
            this.images.push({'sType': 'img', 'imgSrc': m.url});
          });
        },
        onerror => this.snackBar.open(onerror._body, 'Close')
      );
  }

  pickerClick(event: Article) {
    if (event.quantity === 0) {
      this.snackBar.open('Sorry, but the item is not available.', 'Close')
      return;
    }

    this.snackBar.open(event.articleBarcode, 'Close')
  }

  cancelClick() {
    this.location.back();
  }
}
