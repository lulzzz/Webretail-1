import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ConfirmDialogModule, ConfirmationService,
    ToolbarModule, DataTableModule, SharedModule, PaginatorModule, ButtonModule,
    DropdownModule, SliderModule, MultiSelectModule, InputTextModule, InputSwitchModule,
    DialogModule, ChipsModule, SpinnerModule
} from 'primeng/primeng';
import { MovementRoutes } from './movement.routes';
import { MovementsComponent } from './components/movements.component';
import { MovementComponent } from './components/movement.component';
import { MovementService } from './../../services/movement.service';
import { ArticlePickerComponent } from './../shared/components/article-picker.component';
import { ArticleInfoPipe } from './../../pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './../../pipes/article-filter.pipe';
import { CategoryFilterPipe } from './../../pipes/category-filter.pipe';
import { PriceFilterPipe } from './../../pipes/price-filter.pipe';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        ConfirmDialogModule,
        ToolbarModule, DataTableModule, SharedModule, PaginatorModule, ButtonModule,
        DropdownModule, SliderModule, MultiSelectModule, InputTextModule, InputSwitchModule,
        DialogModule, ChipsModule, SpinnerModule,
        CommonModule,
        MovementRoutes
    ],
    declarations: [
        ArticleFilterPipe,
        ArticleInfoPipe,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticlePickerComponent,
        MovementsComponent,
        MovementComponent
    ],
    providers: [
        MovementService,
        ConfirmationService
    ]
})

export class MovementModule { }