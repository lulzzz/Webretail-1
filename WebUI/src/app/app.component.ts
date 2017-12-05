import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BasketService } from './services/basket.service';
import { ProductService } from './services/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  private static title = 'Webretail';
  private static backButton = false;
  private static menuActive = true;
  isIframe = false;
  navItems = [];

  static setPage(title: string, backButton = false, menuActive = true) {
    AppComponent.title = title;
    AppComponent.backButton = backButton;
    AppComponent.menuActive = menuActive;
  }

  static inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
  }

  get title(): string {
    return AppComponent.title;
  }

  get backButton(): boolean {
    return AppComponent.backButton;
  }

  get menuActive(): boolean {
    return AppComponent.menuActive;
  }

  get itemsCount(): number { return this.basketService.count; }

  constructor(
    private location: Location,
    private basketService: BasketService,
    private productService: ProductService,
    private _element: ElementRef
  ) { }

  ngOnInit() {
    this.isIframe = AppComponent.inIframe();
    if (!this.isIframe) {
      this.loadBasket();
      this.navItems.push({ name: 'Home', route: '/home' });
      this.productService.getCategories()
        .subscribe(result => {
          result.forEach(p => this.navItems.push({ name: p.categoryName, route: '/products/' + p.categoryName }));
        });
    }
  }

	loadBasket() {
    const uniqueID = localStorage.getItem('uniqueID');
    if (uniqueID == null) {
      return;
    }
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
