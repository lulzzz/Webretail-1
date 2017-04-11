import { Routes, RouterModule } from '@angular/router';
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
import { StockComponent } from './product/stock.component';
import { MovementsComponent } from './movement/movements.component';
import { MovementComponent } from './movement/movement.component';
import { DocumentComponent } from './movement/document.component';
import { BarcodeComponent } from './movement/barcode.component';
import { DiscountsComponent } from './discount/discounts.component';
import { DiscountComponent } from './discount/discount.component';
import { InvoicesComponent } from './invoice/invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDocumentComponent } from './invoice/invoicedocument.component';
import { CashRegisterComponent } from './cashregister/cashregister.component';
import { ReportCashRegisterComponent } from './report/cashregister.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/register', component: RegisterComponent },
    { path: 'account', component: AccountComponent },
    { path: 'myinfo', component: MyInfoComponent },
    { path: 'store', component: StoreComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'attribute', component: AttributeComponent },
    { path: 'causal', component: CausalComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'product/:id/stock', component: StockComponent },
    { path: 'movement', component: MovementsComponent },
    { path: 'movement/:id', component: MovementComponent },
    { path: 'movement/document/:id', component: DocumentComponent },
    { path: 'movement/barcode/:id', component: BarcodeComponent },
    { path: 'discount', component: DiscountsComponent },
    { path: 'discount/:id', component: DiscountComponent },
    { path: 'invoice', component: InvoicesComponent },
    { path: 'invoice/:id', component: InvoiceComponent },
    { path: 'invoice/document/:id', component: InvoiceDocumentComponent },
    { path: 'cashregister', component: CashRegisterComponent },
    { path: 'report/cashregister', component: ReportCashRegisterComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
