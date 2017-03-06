import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    DataTableModule, SharedModule, PaginatorModule, OverlayPanelModule,
    DialogModule, InputTextModule, ButtonModule, DropdownModule, ChipsModule
} from 'primeng/primeng';

import { MovementRoutes } from './movement.routes';
import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { MovementService } from './../../services/movement.service';
import { ArticleInfoPipe } from './../../pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './../../pipes/article-filter.pipe';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, ToolbarModule,
        DataTableModule, SharedModule, ConfirmDialogModule,
        PaginatorModule, OverlayPanelModule, DialogModule, InputTextModule,
        ButtonModule, DropdownModule, ChipsModule,
        CommonModule,
        MovementRoutes
    ],
    declarations: [
        ArticleFilterPipe,
        ArticleInfoPipe,
        MovementsComponent,
        MovementComponent
    ],
    providers: [
        MovementService,
        ConfirmationService
    ]
})

export class MovementModule { }