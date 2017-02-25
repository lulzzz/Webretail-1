import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PaginatorModule, DialogModule, InputTextModule, InputSwitchModule, ButtonModule } from 'primeng/primeng';

import { AccountRoutes } from './account.routes';
import { AccountService } from './../../services/account.service';
import { AccountComponent } from './components/account.component';
import { MyInfoComponent } from './components/myinfo.component';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DataTableModule, SharedModule, PaginatorModule, DialogModule, InputTextModule, InputSwitchModule, ButtonModule,
        CommonModule,
        AccountRoutes
    ],
    declarations: [
        AccountComponent,
        MyInfoComponent
    ],
    providers: [
        AccountService
    ]
})

export class AccountModule { }