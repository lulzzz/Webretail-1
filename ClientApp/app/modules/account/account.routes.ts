import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './components/account.component';
import { MyInfoComponent } from './components/myinfo.component';

const routes: Routes = [
    { path: '', component: AccountComponent },
    { path: 'myinfo', component: MyInfoComponent }
];

export const AccountRoutes = RouterModule.forChild(routes);