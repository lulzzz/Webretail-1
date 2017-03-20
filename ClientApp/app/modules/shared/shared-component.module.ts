import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule, SpinnerModule,
    MultiSelectModule, DropdownModule, SliderModule, ButtonModule, TooltipModule
} from 'primeng/primeng';
import { ArticlePickerComponent } from './components/article-picker.component';
import { CategoryFilterPipe } from './../../pipes/category-filter.pipe';
import { PriceFilterPipe } from './../../pipes/price-filter.pipe';
import { ArticleInfoPipe } from './../../pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './../../pipes/article-filter.pipe';
import { DateFilterPipe } from './../../pipes/date-filter.pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule, SpinnerModule,
        MultiSelectModule, DropdownModule, SliderModule, ButtonModule, TooltipModule
    ],
    declarations: [
        ArticlePickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe
    ],
    exports: [
        CommonModule,
        ArticlePickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe
    ]
})

export class SharedComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedComponentModule
        };
    }
}