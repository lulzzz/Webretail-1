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
import { OrderRoutes } from './order.routes';
import { OrdersComponent } from './components/orders.component';
import { OrderComponent } from './components/order.component';
import { OrderService } from './../../services/order.service';
import { SharedComponentModule } from './../../modules/shared/shared-component.module';
import { DateFilterPipe } from './../../pipes/date-filter.pipe';

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
        OrderRoutes
    ],
    declarations: [
        OrdersComponent,
        OrderComponent,
        DateFilterPipe
    ],
    providers: [
        OrderService,
        ConfirmationService
    ]
})

export class OrderModule { }