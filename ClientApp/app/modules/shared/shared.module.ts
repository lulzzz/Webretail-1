import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuration } from './../../app.constants';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthenticationService } from './../../services/authentication.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpModule
    ],
    declarations: [
        NavigationComponent,
        FooterComponent
    ],
    exports: [
        NavigationComponent,
        FooterComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthenticationService,
                Configuration
            ]
        };
    }
}