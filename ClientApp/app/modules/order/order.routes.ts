import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './components/orders.component';
import { OrderComponent } from './components/order.component';

const routes: Routes = [
    { path: '', component: OrdersComponent },
    { path: ':id', component: OrderComponent }
];

export const OrderRoutes = RouterModule.forChild(routes);