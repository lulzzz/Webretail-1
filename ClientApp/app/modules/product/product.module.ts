import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ConfirmDialogModule, ConfirmationService, BlockUIModule, ToolbarModule,
    DataTableModule, SharedModule, PaginatorModule, TreeModule, ButtonModule,
    DropdownModule, SliderModule, MultiSelectModule, InputTextModule, InputSwitchModule,
    PanelModule, SplitButtonModule, DialogModule, PickListModule, GrowlModule
} from 'primeng/primeng';

import { ProductRoutes } from './product.routes';
import { ProductsComponent } from './components/products.component';
import { ProductComponent } from './components/product.component';
import { CategoryFilterPipe } from './../../pipes/category-filter.pipe';
import { PriceFilterPipe } from './../../pipes/price-filter.pipe';
import { ProductService } from './../../services/product.service';


@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule, TreeModule, ButtonModule,
        DropdownModule, SliderModule, MultiSelectModule, InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, DialogModule, PickListModule, GrowlModule,
        ConfirmDialogModule, BlockUIModule, ToolbarModule,
        CommonModule,
        ProductRoutes
    ],
    declarations: [
        CategoryFilterPipe,
        PriceFilterPipe,
        ProductsComponent,
        ProductComponent
    ],
    providers: [
        ProductService,
        ConfirmationService
    ]
})

export class ProductModule { }