import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, ButtonModule
} from 'primeng/primeng';

import { BrandRoutes } from './brand.routes';
import { BrandComponent } from './components/brand.component';
import { BrandService } from './../../services/brand.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, ConfirmDialogModule,
        PaginatorModule, DialogModule, InputTextModule, ButtonModule,
        CommonModule,
        BrandRoutes
    ],
    declarations: [
        BrandComponent
    ],
    providers: [
        BrandService,
        ConfirmationService
    ]
})

export class BrandModule { }