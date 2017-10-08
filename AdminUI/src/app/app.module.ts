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
    SelectButtonModule, ChipsModule, InputTextareaModule,
    ContextMenuModule, TooltipModule, CalendarModule,
    FileUploadModule, ChartModule, CarouselModule,
    SpinnerModule, StepsModule
} from 'primeng/primeng';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation.component';
import { FooterComponent } from './shared/footer.component';
import { ArticlePickerComponent } from './shared/article-picker.component';
import { ProductPickerComponent } from './shared/product-picker.component';
import { MovementPickerComponent } from './shared/movement-picker.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
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
import { ImportComponent } from './product/import.component';
import { StockComponent } from './product/stock.component';
import { PublicationComponent } from './product/publication.component';
import { MovementsComponent } from './movement/movements.component';
import { MovementComponent } from './movement/movement.component';
import { DocumentComponent } from './movement/document.component';
import { DiscountsComponent } from './discount/discounts.component';
import { DiscountComponent } from './discount/discount.component';
import { InvoicesComponent } from './invoice/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDocumentComponent } from './invoice/invoicedocument.component';
import { DeviceComponent } from './device/device.component';
import { ReportReceiptsComponent } from './report/receipts.component';
import { ReportSalesComponent } from './report/sales.component';
import { StatisticsComponent } from './report/statistics.component';

import { SessionService } from './services/session.service';
import { CompanyService } from './services/company.service';
import { AccountService } from './services/account.service';
import { AttributeService } from './services/attribute.service';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { CausalService } from './services/causal.service';
import { CustomerService } from './services/customer.service';
import { StoreService } from './services/store.service';
import { DeviceService } from './services/device.service';
import { ProductService } from './services/product.service';
import { MovementService } from './services/movement.service';
import { DiscountService } from './services/discount.service';
import { InvoiceService } from './services/invoice.service';
import { StatisticService } from './services/statistic.service';
import { PublicationService } from './services/publication.service';
import { ImportService } from './services/import.service';

import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { ArticleInfoPipe } from './pipes/articleinfo.pipe';
import { ArticleFilterPipe } from './pipes/article-filter.pipe';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { PeriodFilterPipe } from './pipes/period-filter.pipe';

@NgModule({
    imports: [
        CommonModule, RouterModule, HttpModule, BrowserModule, BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule,
        MultiSelectModule, DropdownModule, SliderModule, TreeModule,
        ButtonModule, InputTextModule, InputSwitchModule,
        PanelModule, SplitButtonModule, PickListModule, GrowlModule,
        ConfirmDialogModule, ToolbarModule, SelectButtonModule,
        ChipsModule, InputTextareaModule, FileUploadModule,
        ContextMenuModule, TooltipModule, CalendarModule, ChartModule,
        CarouselModule, SpinnerModule, StepsModule,
        AppRoutes
    ],
    declarations: [
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe,
        PeriodFilterPipe,
        AppComponent,
        NavigationComponent,
        FooterComponent,
        ArticlePickerComponent,
        ProductPickerComponent,
        MovementPickerComponent,
        HomeComponent,
        CompanyComponent,
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
        PublicationComponent,
        MovementsComponent,
        MovementComponent,
        DocumentComponent,
        DiscountsComponent,
        DiscountComponent,
        InvoicesComponent,
        InvoiceComponent,
        InvoiceDocumentComponent,
        DeviceComponent,
        ReportReceiptsComponent,
        ReportSalesComponent,
        StatisticsComponent,
        ImportComponent
    ],
    providers: [
        SessionService,
        CompanyService,
        AccountService,
        AttributeService,
        BrandService,
        CategoryService,
        CausalService,
        CustomerService,
        StoreService,
        DeviceService,
        ProductService,
        MovementService,
        DiscountService,
        InvoiceService,
        ConfirmationService,
        StatisticService,
        PublicationService,
        ImportService
    ],
    exports: [
        ArticlePickerComponent,
        ProductPickerComponent,
        MovementPickerComponent,
        CategoryFilterPipe,
        PriceFilterPipe,
        ArticleInfoPipe,
        ArticleFilterPipe,
        DateFilterPipe,
        PeriodFilterPipe
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }