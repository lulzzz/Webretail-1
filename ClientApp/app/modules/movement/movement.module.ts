import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule,
    ConfirmDialogModule, ConfirmationService, PanelModule,
    ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule, InputSwitchModule,
    ChipsModule, SpinnerModule, InputTextareaModule, CalendarModule, ContextMenuModule
} from 'primeng/primeng';
import { MovementRoutes } from './movement.routes';
import { MovementService } from './../../services/movement.service';
import { SharedComponentModule } from './../../modules/shared/shared-component.module';
import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { DocumentComponent } from './components/document.component';
import { BarcodeComponent } from './components/barcode.component';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule,
        ConfirmDialogModule, ToolbarModule, ButtonModule, SplitButtonModule,
        InputTextModule, InputSwitchModule, CalendarModule, ContextMenuModule,
        PanelModule, ChipsModule, SpinnerModule, InputTextareaModule,
        SharedComponentModule.forRoot(),
        CommonModule,
        MovementRoutes
    ],
    declarations: [
        MovementsComponent,
        MovementComponent,
        DocumentComponent,
        BarcodeComponent
    ],
    providers: [
        MovementService,
        ConfirmationService
    ]
})

export class MovementModule { }