import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DataTableModule, SharedModule, PaginatorModule,
    MultiSelectModule, DropdownModule, SliderModule,
    ConfirmDialogModule, ConfirmationService, ToolbarModule,
    TreeModule, ButtonModule, InputTextModule, InputSwitchModule,
    PanelModule, SplitButtonModule, PickListModule, GrowlModule,
    SelectButtonModule, ChipsModule, SpinnerModule, InputTextareaModule,
    ContextMenuModule, TooltipModule, CalendarModule
} from 'primeng/primeng';

import { Configuration } from './app.constants';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation.component';
import { FooterComponent } from './shared/footer.component';
import { ArticlePickerComponent } from './shared/article-picker.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { AccountComponent } from './account/account.component';
import { MyInfoComponent } from './account/myinfo.component';
import { AttributeComponent } from './attribute/attribute.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { CausalComponent } from './causal/causal.component';
import { CustomerComponent } from './customer/customer.component';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './product/products.component';
import { ProductComponent } from './product/product.component';
import { StockComponent } from './product/stock.component';
import { MovementsComponent } from './movement/movements.component';
import { MovementComponent } from './movement/movement.component';
import { DocumentComponent } from './movement/document.component';
import { BarcodeComponent } from './movement/barcode.component';
import { DiscountsComponent } from './discount/discounts.component';

import { AuthenticationService } from './services/authentication.service';
import { AccountService } from './services/account.service';
import { AttributeService } from './services/attribute.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { CausalService } from './services/causal.service';
import { CustomerService } from './services/customer.service';
import { StoreService } from './services/store.service';
import { ProductService } from './services/product.service';
import { MovementService } from './services/movement.service';
import { DiscountService } from './services/discount.service';

import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { ArticleInfoPipe } from './pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './pipes/article-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';

@NgModule({
    imports: [
        CommonModule, RouterModule, HttpModule, BrowserModule, BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule, TreeModule, 
        ButtonModule, InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, PickListModule, GrowlModule,
        ConfirmDialogModule, ToolbarModule, SelectButtonModule,
        ChipsModule, SpinnerModule, InputTextareaModule,
        ContextMenuModule, TooltipModule, CalendarModule,
        AppRoutes
    ],
    declarations: [
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe,
        AppComponent,
        NavigationComponent,
        FooterComponent,
        ArticlePickerComponent,
        CategoryFilterPipe,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent,
        MyInfoComponent,
        AttributeComponent,
        BrandComponent,
        CategoryComponent,
        CausalComponent,
        CustomerComponent,
        StoreComponent,
        ProductsComponent,
        ProductComponent,
        StockComponent,
        MovementsComponent,
        MovementComponent,
        DocumentComponent,
        BarcodeComponent,
        DiscountsComponent
    ],
    providers: [
        AuthenticationService,
        AccountService,
        AttributeService,
        BrandService,
        CategoryService,
        CausalService,
        CustomerService,
        StoreService,
        ProductService,
        MovementService,
        DiscountService,
        ConfirmationService,
        Configuration
    ],
    exports: [
        ArticlePickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }