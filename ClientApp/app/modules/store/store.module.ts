import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, ButtonModule
} from 'primeng/primeng';

import { StoreRoutes } from './store.routes';
import { StoreComponent } from './components/store.component';
import { StoreService } from './../../services/store.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, ConfirmDialogModule,
        PaginatorModule, DialogModule, InputTextModule, ButtonModule,
        CommonModule,
        StoreRoutes
    ],
    declarations: [
        StoreComponent
    ],
    providers: [
        StoreService,
        ConfirmationService
    ]
})

export class StoreModule { }