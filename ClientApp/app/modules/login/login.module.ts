import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GrowlModule, InputTextModule, ButtonModule } from 'primeng/primeng';

import { LoginRoutes } from './login.routes';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        GrowlModule, InputTextModule, ButtonModule,
        CommonModule,
        LoginRoutes
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})

export class LoginModule { }