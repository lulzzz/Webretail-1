import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { SharedModule } from './modules/shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { Configuration } from './app.constants';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        SharedModule.forRoot(),
        HomeModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }