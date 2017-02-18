import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './components/account.component';

const routes: Routes = [
    { path: '', component: AccountComponent }
];

export const AccountRoutes = RouterModule.forChild(routes);