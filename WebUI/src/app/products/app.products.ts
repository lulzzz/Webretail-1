import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductService } from './../services/product.service';
import { Product } from './../shared/models';
import { AppComponent } from 'app/app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-products',
  templateUrl: './app.products.html',
  styleUrls: ['./app.products.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private sub: any;
  products: Product[];
  fixedCols: number;
  fitListHeight: string;
  fitListWidth: string;

  constructor(
    public snackBar: MatSnackBar,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
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
      const name = params['name'];
      this.loadProducts(id, name);
    });
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
}

onResizeChanged(event: any) {
    const w = event.innerWidth;
    this.fixedCols = w < 600 ? 1 : w < 1200 ? 2 : 3;
    this.fitListWidth = (w - this.fixedCols - 1) + 'px';
    this.fitListHeight = (w / this.fixedCols * 1.2) + 'px';
  }

  loadProducts(categoryId: string, categoryName: string) {
    AppComponent.title = categoryName;
    AppComponent.setPage(categoryName, false);

    this.productService.getByCategoryId(categoryId)
        .subscribe(result => {
          this.products = result;
    },
    onerror => this.snackBar.open(onerror._body, 'Close'));
  }
}
