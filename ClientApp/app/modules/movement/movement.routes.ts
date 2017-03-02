import { Routes, RouterModule } from '@angular/router';

import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';

const routes: Routes = [
    { path: '', component: MovementsComponent },
    { path: ':id', component: MovementComponent }
];

export const MovementRoutes = RouterModule.forChild(routes);