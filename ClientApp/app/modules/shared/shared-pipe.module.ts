import { NgModule, ModuleWithProviders } from '@angular/core';
import { CategoryFilterPipe } from './../../pipes/category-filter.pipe';
import { PriceFilterPipe } from './../../pipes/price-filter.pipe';

@NgModule({
    declarations: [
        CategoryFilterPipe,
        PriceFilterPipe
    ],
    exports: [
        CategoryFilterPipe,
        PriceFilterPipe
    ]
})

export class SharedPipeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedPipeModule
        };
    }
}