import { Routes, RouterModule } from '@angular/router';

import { CausalComponent } from './components/causal.component';

const routes: Routes = [
    { path: '', component: CausalComponent }
];

export const CausalRoutes = RouterModule.forChild(routes);