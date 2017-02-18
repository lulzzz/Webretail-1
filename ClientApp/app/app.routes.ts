import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'account', loadChildren: './modules/account/account.module#AccountModule' },
    { path: 'brand', loadChildren: './modules/brand/brand.module#BrandModule' },
    { path: 'category', loadChildren: './modules/category/category.module#CategoryModule' },
    { path: 'attribute', loadChildren: './modules/attribute/attribute.module#AttributeModule' },
    { path: 'product', loadChildren: './modules/product/product.module#ProductModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
