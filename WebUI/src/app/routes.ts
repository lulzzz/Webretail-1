import { Routes } from '@angular/router';
import { ProductsComponent } from './products/app.products';
import { ProductComponent } from './products/app.product';
import { AppComponent, HomeComponent } from './app.component';
import { LoginComponent } from './account/app.login';
import { RegisterComponent } from './account/app.register';
import { AccountComponent } from './account/app.account';
import { BasketComponent } from 'app/basket/app.basket';
import { CheckoutComponent } from 'app/basket/app.checkout';

export const APP_ROUTES: Routes = [
  {path: '', component: AppComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'account', component: AccountComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products/:id/:name', component: ProductsComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'basket', component: BasketComponent},
    {path: 'checkout', component: CheckoutComponent}
  ]}
];

export const ALL_ROUTES: Routes = [
  {path: '',  component: AppComponent, children: APP_ROUTES},
];
