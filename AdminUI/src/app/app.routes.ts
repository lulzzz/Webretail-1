import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './login/register.component';
import { AccountComponent } from './account/account.component';
import { MyInfoComponent } from './account/myinfo.component';
import { AttributeComponent } from './attribute/attribute.component';
import { TagComponent } from './tag/tag.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { CausalComponent } from './causal/causal.component';
import { RegistryComponent } from './registry/registry.component';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './product/products.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './product/detail.component';
import { ImportComponent } from './product/import.component';
import { StockComponent } from './product/stock.component';
import { PublicationComponent } from './product/publication.component';
import { MovementsComponent } from './movement/movements.component';
import { MovementComponent } from './movement/movement.component';
import { DocumentComponent } from './movement/document.component';
import { BarcodeComponent } from './movement/barcode.component';
import { DiscountsComponent } from './discount/discounts.component';
import { DiscountComponent } from './discount/discount.component';
import { InvoicesComponent } from './invoice/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDocumentComponent } from './invoice/invoicedocument.component';
import { DeviceComponent } from './device/device.component';
import { ReportReceiptsComponent } from './report/receipts.component';
import { ReportSalesComponent } from './report/sales.component';
import { StatisticsComponent } from './report/statistics.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'login/register', component: RegisterComponent },
    { path: 'account', component: AccountComponent },
    { path: 'myinfo', component: MyInfoComponent },
    { path: 'store', component: StoreComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'attribute', component: AttributeComponent },
    { path: 'tag', component: TagComponent },
    { path: 'causal', component: CausalComponent },
    { path: 'registry', component: RegistryComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'product/:id/detail', component: DetailComponent },
    { path: 'product/:id/stock', component: StockComponent },
    { path: 'product/:id/publication', component: PublicationComponent },
    { path: 'movement', component: MovementsComponent },
    { path: 'movement/:id', component: MovementComponent },
    { path: 'movement/document/:id', component: DocumentComponent },
    { path: 'movement/barcode/:id', component: BarcodeComponent },
    { path: 'discount', component: DiscountsComponent },
    { path: 'discount/:id', component: DiscountComponent },
    { path: 'invoice', component: InvoicesComponent },
    { path: 'invoice/:id', component: InvoiceComponent },
    { path: 'invoice/document/:id', component: InvoiceDocumentComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'report/receipts', component: ReportReceiptsComponent },
    { path: 'report/sales', component: ReportSalesComponent },
    { path: 'report/statistics', component: StatisticsComponent },
    { path: 'import', component: ImportComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
