import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

import { ALL_ROUTES } from './routes';

import { SessionService } from './services/session.service';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';

import { AppComponent, HomeComponent, AppEntry } from './app.component';
import { AccountComponent } from './account/app.account';
import { LoginComponent } from './account/app.login';
import { RegisterComponent } from './account/app.register';
import { ProductsComponent } from './products/app.products';

@NgModule({
  declarations: [
    AppEntry,
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent
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
    SessionService,
    CustomerService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
