import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, ButtonModule, SelectButtonModule
} from 'primeng/primeng';

import { CausalRoutes } from './causal.routes';
import { CausalComponent } from './components/causal.component';
import { CausalService } from './../../services/causal.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, ConfirmDialogModule,
        PaginatorModule, DialogModule, InputTextModule,
        ButtonModule, SelectButtonModule,
        CommonModule,
        CausalRoutes
    ],
    declarations: [
        CausalComponent
    ],
    providers: [
        CausalService,
        ConfirmationService
    ]
})

export class CausalModule { }