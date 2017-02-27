import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './components/store.component';

const routes: Routes = [
    { path: '', component: StoreComponent }
];

export const StoreRoutes = RouterModule.forChild(routes);