import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, ButtonModule, DropdownModule
} from 'primeng/primeng';

import { MovementRoutes } from './movement.routes';
import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { MovementService } from './../../services/movement.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, ConfirmDialogModule,
        PaginatorModule, DialogModule, InputTextModule,
        ButtonModule, DropdownModule,
        CommonModule,
        MovementRoutes
    ],
    declarations: [
        MovementsComponent,
        MovementComponent
    ],
    providers: [
        MovementService,
        ConfirmationService
    ]
})

export class MovementModule { }