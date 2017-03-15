import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule,
    ConfirmDialogModule, ConfirmationService, BlockUIModule, ToolbarModule,
    TreeModule, ButtonModule, InputTextModule, InputSwitchModule,
    PanelModule, SplitButtonModule, PickListModule, GrowlModule
} from 'primeng/primeng';
import { ProductRoutes } from './product.routes';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { ProductService } from './../../services/product.service';
import { SharedComponentModule } from './../../modules/shared/shared-component.module';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule,
        TreeModule, ButtonModule,
        InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, PickListModule, GrowlModule,
        ConfirmDialogModule, BlockUIModule, ToolbarModule,
        SharedComponentModule.forRoot(),
        CommonModule,
        ProductRoutes
    ],
    declarations: [
        ProductsComponent,
        ProductComponent
    ],
    providers: [
        ProductService,
        ConfirmationService
    ]
})

export class ProductModule { }