import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule,
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    TreeModule, ButtonModule, InputTextModule, InputSwitchModule,
    PanelModule, SplitButtonModule, PickListModule, GrowlModule
} from 'primeng/primeng';
import { ProductRoutes } from './product.routes';
import { ProductService } from './../../services/product.service';
import { StoreService } from './../../services/store.service';
import { SharedComponentModule } from './../../modules/shared/shared-component.module';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { StockComponent } from './components/stock.component';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule,
        TreeModule, ButtonModule,
        InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, PickListModule, GrowlModule,
        ConfirmDialogModule, ToolbarModule,
        SharedComponentModule.forRoot(),
        CommonModule,
        ProductRoutes
    ],
    declarations: [
        ProductsComponent,
        ProductComponent,
        StockComponent
    ],
    providers: [
        ProductService,
        StoreService,
        ConfirmationService
    ]
})

export class ProductModule { }