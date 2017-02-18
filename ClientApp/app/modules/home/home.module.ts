import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutes } from './home.routes';
import { HomeComponent } from './components/home.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutes
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})

export class HomeModule { }