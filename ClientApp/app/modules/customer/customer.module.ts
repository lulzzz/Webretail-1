import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    DataTableModule, SharedModule, PaginatorModule,
    DialogModule, InputTextModule, InputSwitchModule, ButtonModule
} from 'primeng/primeng';

import { CustomerRoutes } from './customer.routes';
import { CustomerService } from './../../services/customer.service';
import { CustomerComponent } from './components/customer.component';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, ToolbarModule,
        DataTableModule, SharedModule, PaginatorModule, ConfirmDialogModule,
        DialogModule, InputTextModule, InputSwitchModule, ButtonModule,
        CommonModule,
        CustomerRoutes
    ],
    declarations: [
        CustomerComponent
    ],
    providers: [
        CustomerService,
        ConfirmationService
    ]
})

export class CustomerModule { }