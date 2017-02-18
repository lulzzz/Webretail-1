import { Routes, RouterModule } from '@angular/router';

import { BrandComponent } from './components/brand.component';

const routes: Routes = [
    { path: '', component: BrandComponent }
];

export const BrandRoutes = RouterModule.forChild(routes);