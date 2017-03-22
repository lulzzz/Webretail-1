import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'account', loadChildren: './modules/account/account.module#AccountModule' },
    { path: 'store', loadChildren: './modules/store/store.module#StoreModule' },
    { path: 'brand', loadChildren: './modules/brand/brand.module#BrandModule' },
    { path: 'category', loadChildren: './modules/category/category.module#CategoryModule' },
    { path: 'attribute', loadChildren: './modules/attribute/attribute.module#AttributeModule' },
    { path: 'product', loadChildren: './modules/product/product.module#ProductModule' },
    { path: 'causal', loadChildren: './modules/causal/causal.module#CausalModule' },
    { path: 'customer', loadChildren: './modules/customer/customer.module#CustomerModule' },
    { path: 'movement', loadChildren: './modules/movement/movement.module#MovementModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
