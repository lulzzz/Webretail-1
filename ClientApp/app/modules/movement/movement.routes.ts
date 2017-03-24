import { Routes, RouterModule } from '@angular/router';

import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { DocumentComponent } from './components/document.component';
import { BarcodeComponent } from './components/barcode.component';

const routes: Routes = [
    { path: '', component: MovementsComponent },
    { path: ':id', component: MovementComponent },
    { path: 'document/:id', component: DocumentComponent },
    { path: 'barcode/:id', component: BarcodeComponent }
];

export const MovementRoutes = RouterModule.forChild(routes);