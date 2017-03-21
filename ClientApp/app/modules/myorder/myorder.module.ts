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
import { MyOrderRoutes } from './myorder.routes';
import { MyOrdersComponent } from './components/myorders.component';
import { MyOrderComponent } from './components/myorder.component';
import { MyOrderService } from './../../services/myorder.service';
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
        MyOrderRoutes
    ],
    declarations: [
        MyOrdersComponent,
        MyOrderComponent
    ],
    providers: [
        MyOrderService,
        ConfirmationService
    ]
})

export class MyOrderModule { }