import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductService } from './../services/product.service';
import { Product } from './../shared/models';
import { AppComponent } from 'app/app.component';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'app-products',
  templateUrl: './app.products.html',
  styleUrls: ['./app.products.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // @ViewChild('content') private content: ElementRef;
  private sub: any;
  products: Product[];
  filtered: Product[];
  filter: string;
  filtering: Boolean;
  fixedCols: number;
  fitListHeight: string;
  fitListWidth: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(even) {
    const number = this.document.body.scrollTop;
    if (number < 1) {
      this.filtering = true;
    }
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
    this.filtering = false;
    this.productService.getByCategoryName(categoryName)
        .subscribe(result => {
          this.filtered = result;
          this.products = result;
        }, onerror => this.snackBar.open(onerror.status === 401 ? '401 - Unauthorized' : onerror._body, 'Close'));
  }

  onFilterChange(filter: string) {
    if (filter === '') {
      this.filtered = [];
      this.filtered = this.products;
      return;
    }
    this.filtered = this.products.filter(p => p.productName.indexOf(filter) >= 0);
  }

  toggleSearch() {
    this.filtering = !this.filtering;
  }
}
