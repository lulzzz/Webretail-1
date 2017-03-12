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
import { ProductService } from './../../services/product.service';
import { SharedPipeModule } from './../../modules/shared/shared-pipe.module';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule, TreeModule, ButtonModule,
        DropdownModule, SliderModule, MultiSelectModule, InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, DialogModule, PickListModule, GrowlModule,
        ConfirmDialogModule, BlockUIModule, ToolbarModule,
        SharedPipeModule.forRoot(),
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