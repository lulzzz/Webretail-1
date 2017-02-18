import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PaginatorModule, DialogModule, InputTextModule, InputSwitchModule, ButtonModule } from 'primeng/primeng';

import { CategoryRoutes } from './category.routes';
import { CategoryComponent } from './components/category.component';
import { CategoryService } from './../../services/category.service';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule, DialogModule, InputTextModule, InputSwitchModule, ButtonModule,
        CommonModule,
        CategoryRoutes
    ],
    declarations: [
        CategoryComponent
    ],
    providers: [
        CategoryService
    ]
})

export class CategoryModule { }