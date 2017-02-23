import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

export const LoginRoutes = RouterModule.forChild(routes);
