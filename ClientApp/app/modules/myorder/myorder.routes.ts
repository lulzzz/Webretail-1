import { Routes, RouterModule } from '@angular/router';

import { MyOrdersComponent } from './components/myorders.component';
import { MyOrderComponent } from './components/myorder.component';

const routes: Routes = [
    { path: '', component: MyOrdersComponent },
    { path: ':id', component: MyOrderComponent }
];

export const MyOrderRoutes = RouterModule.forChild(routes);