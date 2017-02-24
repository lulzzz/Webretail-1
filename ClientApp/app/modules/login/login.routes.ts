import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

export const LoginRoutes = RouterModule.forChild(routes);
