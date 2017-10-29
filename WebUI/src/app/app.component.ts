import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ProductService } from './services/product.service';

/**
 * The entry app for site. Routes under `accessibility` will use AccessibilityDemo component,
 * while other demos will use `DemoApp` component. Since DemoApp and AccessibilityDemo use
 * different templates (DemoApp has toolbar and sidenav), we use this EntryApp in index.html
 * as our entry point.
 */
@Component({
  moduleId: module.id,
  selector: 'app-entry',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppEntry { }

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
    AppComponent.title = 'Home';
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent implements OnInit {
  static title: string;
  navItems = [
    { name: 'Featured', route: '/products/featured/Featured' }
  ];

  get title() {
    return AppComponent.title;
  }

  constructor(
    private productService: ProductService,
    private _element: ElementRef
  ) { }

  ngOnInit() {
    this.productService.getCategories()
      .subscribe(result => {
        result.forEach(p => this.navItems.push({ name: p.categoryName, route: '/products/' + p.categoryId + '/' + p.categoryName }));
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
}
