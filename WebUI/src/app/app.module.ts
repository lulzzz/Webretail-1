import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

import { ALL_ROUTES } from 'app/routes';

import { DialogService } from 'app/services/dialog.service';
import { SessionService } from 'app/services/session.service';
import { CustomerService } from 'app/services/customer.service';
import { ProductService } from 'app/services/product.service';

import { TranslatePipe } from 'app/pipes/translate.pipe';
import { ArticlePicker } from 'app/shared/article.picker';
import { ConfirmDialog } from 'app/shared/confirm.dialog';
import { ImageSlider, SafeHtmlPipe } from 'app/shared/image.slider';

import { AppComponent, HomeComponent } from 'app/app.component';
import { AccountComponent } from 'app/account/app.account';
import { LoginComponent } from 'app/account/app.login';
import { RegisterComponent } from 'app/account/app.register';
import { ProductsComponent } from 'app/products/app.products';
import { ProductComponent } from 'app/products/app.product';

@NgModule({
  declarations: [
    TranslatePipe,
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
    ProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ALL_ROUTES),
    MaterialModule,
    LayoutModule
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    DialogService,
    SessionService,
    CustomerService,
    ProductService
  ],
  exports: [
    ArticlePicker,
    ConfirmDialog,
    SafeHtmlPipe,
    TranslatePipe,
    ImageSlider
  ],
  entryComponents: [
    ConfirmDialog
  ],
bootstrap: [AppComponent]
})
export class AppModule { }
