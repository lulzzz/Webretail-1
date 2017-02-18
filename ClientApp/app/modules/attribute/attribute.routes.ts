import { Routes, RouterModule } from '@angular/router';

import { AttributeComponent } from './components/attribute.component';

const routes: Routes = [
    { path: '', component: AttributeComponent }
];

export const AttributeRoutes = RouterModule.forChild(routes);