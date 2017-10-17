import { Routes } from '@angular/router';
import { ProductsComponent } from './products/app.products';
import { AppComponent, HomeComponent } from './app.component';

export const APP_ROUTES: Routes = [
  {path: '', component: AppComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'products/:id/:name', component: ProductsComponent},
  ]}
];

export const ALL_ROUTES: Routes = [
  {path: '',  component: AppComponent, children: APP_ROUTES},
];
