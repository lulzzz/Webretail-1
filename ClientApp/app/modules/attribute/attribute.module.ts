import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, ButtonModule
} from 'primeng/primeng';

import { AttributeRoutes } from './attribute.routes';
import { AttributeComponent } from './components/attribute.component';
import { AttributeService } from './../../services/attribute.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, ToolbarModule,
        ButtonModule, DataTableModule, SharedModule,
        PaginatorModule, DialogModule, InputTextModule, ConfirmDialogModule,
        CommonModule,
        AttributeRoutes
    ],
    declarations: [
        AttributeComponent
    ],
    providers: [
        AttributeService,
        ConfirmationService
    ]
})

export class AttributeModule { }