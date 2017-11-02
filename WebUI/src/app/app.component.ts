import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BasketService } from './services/basket.service';
import { ProductService } from './services/product.service';

/**
 * Home component for welcome message in App.
 */
@Component({
  selector: 'app-home',
  template: `
    <p>&nbsp;&nbsp;Welcome to the Webretail eCommerce!</p>
    <span class="done">
    <a mat-fab routerLink="/products/featured/Featured" style="float: right"><mat-icon>shopping_cart</mat-icon></a>
  </span>
  `
})
export class HomeComponent {
  constructor() {
    AppComponent.setPage('Home', false);
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  static title = 'Webretail';
  static backButton = false;
  navItems = [
    { name: 'Featured', route: '/products/featured/Featured' }
  ];

  static setPage(title: string, backButton: boolean) {
    AppComponent.title = title;
    AppComponent.backButton = backButton;
  }

  get title(): string {
    return AppComponent.title;
  }

  get backButton(): boolean {
    return AppComponent.backButton;
  }

  get itemsCount(): number { return this.basketService.count; }

  constructor(
    private location: Location,
    private basketService: BasketService,
    private productService: ProductService,
    private _element: ElementRef
  ) { }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe(result => {
        result.forEach(p => this.navItems.push({ name: p.categoryName, route: '/products/' + p.categoryId + '/' + p.categoryName }));
      });
      this.loadBasket();
  }

	loadBasket() {
		this.basketService.get()
			.subscribe(result => {
				this.basketService.basket = result;
			});
	}

  toggleFullscreen() {
    const elem = this._element.nativeElement.querySelector('.app-content');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }

    // const element = document as any;
    // if (element.exitFullscreen) {
    //     element.exitFullscreen();
    // } else if (element.mozCancelFullScreen) {
    //     element.mozCancelFullScreen();
    // } else if (element.webkitExitFullscreen) {
    //     element.webkitExitFullscreen();
    // } else if (element.msExitFullscreen) {
    //     element.msExitFullscreen();
    // }
  }

  backClick() {
    this.location.back();
  }
}
