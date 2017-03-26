import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { StockComponent } from './components/stock.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ProductsComponent },
            { path: ':id', component: ProductComponent },
            { path: ':id/stock', component: StockComponent }
        ]
    }
];

export const ProductRoutes = RouterModule.forChild(routes);