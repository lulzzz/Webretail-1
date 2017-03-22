import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule,
    ConfirmDialogModule, ConfirmationService, PanelModule,
    ToolbarModule, ButtonModule, InputTextModule, InputSwitchModule,
    ChipsModule, SpinnerModule, InputTextareaModule, CalendarModule
} from 'primeng/primeng';
import { MovementRoutes } from './movement.routes';
import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { MovementService } from './../../services/movement.service';
import { SharedComponentModule } from './../../modules/shared/shared-component.module';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule,
        ConfirmDialogModule, ToolbarModule, ButtonModule,
        InputTextModule, InputSwitchModule, CalendarModule,
        PanelModule, ChipsModule, SpinnerModule, InputTextareaModule,
        SharedComponentModule.forRoot(),
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