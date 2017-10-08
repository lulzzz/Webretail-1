import {Component, ElementRef, Renderer2, ViewEncapsulation} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

/**
 * The entry app for demo site. Routes under `accessibility` will use AccessibilityDemo component,
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
export class AppEntry {}

/**
 * Home component for welcome message in DemoApp.
 */
@Component({
  selector: 'app-home',
  template: `
    <p>Welcome to the development app for Angular Material!</p>
    <span class="done">
    <button mat-fab>
      <mat-icon>check circle</mat-icon>
    </button>
  </span>
  `
})
export class HomeComponent {}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent {
  title = 'Webretail';
  navItems = [
    {name: 'Products', route: '/products'},
  ];

  constructor(private _element: ElementRef) {}

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
  }
}
