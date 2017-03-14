import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    DataTableModule, SharedModule, PaginatorModule, PanelModule,
    InputTextModule, InputSwitchModule, ButtonModule
} from 'primeng/primeng';

import { CategoryRoutes } from './category.routes';
import { CategoryComponent } from './components/category.component';
import { CategoryService } from './../../services/category.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, ToolbarModule,
        DataTableModule, SharedModule, PaginatorModule, ConfirmDialogModule,
        PanelModule, InputTextModule, InputSwitchModule, ButtonModule,
        CommonModule,
        CategoryRoutes
    ],
    declarations: [
        CategoryComponent
    ],
    providers: [
        CategoryService,
        ConfirmationService
    ]
})

export class CategoryModule { }