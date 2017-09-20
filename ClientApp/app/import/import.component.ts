import { Component, OnInit  } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { ImportService, CodartInfo } from './../services/import.service';

@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html'
})

export class ImportComponent implements OnInit  {

    dataform: FormGroup;
    productName: String;
    product: CodartInfo;

    constructor(private authenticationService: AuthenticationService,
                private importService: ImportService,
                private fb: FormBuilder) {
        authenticationService.title = 'Import';
    }

    ngOnInit() {
        if (!this.authenticationService.isAuthenticated) {
            return;
        }

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required)
        });
     }

     importClick() {
        this.importService.getProductByName(this.productName)
        .subscribe(res => {
            // alert(JSON.stringify(res));
            this.product = res;
        });
    }
}
