import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule
} from 'primeng/primeng';
import { ArticlePickerComponent } from './components/article-picker.component';
import { CategoryFilterPipe } from './../../pipes/category-filter.pipe';
import { PriceFilterPipe } from './../../pipes/price-filter.pipe';
import { ArticleInfoPipe } from './../../pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './../../pipes/article-filter.pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule
    ],
    declarations: [
        ArticlePickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe
    ],
    exports: [
        CommonModule,
        ArticlePickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe
    ]
})

export class SharedComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedComponentModule
        };
    }
}