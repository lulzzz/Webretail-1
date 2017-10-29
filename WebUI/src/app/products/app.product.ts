import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductService } from './../services/product.service';
import { Product } from './../shared/models';
import { AppComponent } from 'app/app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: './app.product.html',
  styleUrls: ['./app.product.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  fitHeight: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.onResizeChanged(window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.onResizeChanged(event.target);
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  onResizeChanged(event: any) {
    this.fitHeight = event.innerHeight - 100;
  }

  loadProduct(id: number) {
    this.productService.getByProductId(id)
        .subscribe(result => {
          this.product = result;
          AppComponent.title = result.productName;
        },
        onerror => this.snackBar.open(onerror._body, 'Undo'));
  }
}
