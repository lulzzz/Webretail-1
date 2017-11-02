import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

import { ALL_ROUTES } from 'app/routes';

import { UrlInterceptor } from 'app/services/url.interceptor';
import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { CustomerService } from 'app/services/customer.service';
import { ProductService } from 'app/services/product.service';
import { BasketService } from 'app/services/basket.service';

import { ParseUrlPipe } from 'app/pipes/parseurl.pipe';
import { TranslatePipe } from 'app/pipes/translate.pipe';
import { ArticleInfoPipe } from 'app/pipes/articleinfo.pipe';
import { ArticlePicker } from 'app/shared/article.picker';
import { ConfirmDialog } from 'app/shared/confirm.dialog';
import { ImageSlider, SafeHtmlPipe } from 'app/shared/image.slider';

import { AppComponent, HomeComponent } from 'app/app.component';
import { AccountComponent } from 'app/account/app.account';
import { LoginComponent } from 'app/account/app.login';
import { RegisterComponent } from 'app/account/app.register';
import { ProductsComponent } from 'app/products/app.products';
import { ProductComponent } from 'app/products/app.product';
import { BasketComponent } from 'app/basket/app.basket';
import { CheckoutComponent } from 'app/basket/app.checkout';

@NgModule({
  declarations: [
    ParseUrlPipe,
    TranslatePipe,
    ArticleInfoPipe,
    SafeHtmlPipe,
    ArticlePicker,
    ConfirmDialog,
    ImageSlider,
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProductComponent,
    BasketComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ALL_ROUTES),
    MaterialModule,
    LayoutModule
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    DialogService,
    SessionService,
    CustomerService,
    ProductService,
    BasketService
  ],
  exports: [
    ArticlePicker,
    ConfirmDialog,
    ParseUrlPipe,
    SafeHtmlPipe,
    TranslatePipe,
    ArticleInfoPipe,
    ImageSlider
  ],
  entryComponents: [
    ConfirmDialog
  ],
bootstrap: [AppComponent]
})
export class AppModule { }
