import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { CompanyService } from './../services/company.service';
import { Company } from './../shared/models';

@Component({
    selector: 'company-component',
    templateUrl: 'company.component.html'
})

export class CompanyComponent implements OnInit {
    company: Company;
	dataform: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private companyService: CompanyService,
                private fb: FormBuilder) { }

	ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'desc': new FormControl('', Validators.nullValidator),
            'site': new FormControl('', Validators.nullValidator),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl('', Validators.nullValidator),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', Validators.required),
            'country': new FormControl('', Validators.required),
            'fiscalCode': new FormControl('', Validators.nullValidator),
            'vatNumber': new FormControl('', Validators.nullValidator)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
            }, onerror => alert(onerror._body)
        );
    }

    saveClick() {
        this.companyService
            .update(this.company)
            .subscribe(result => {}, onerror => alert(onerror._body));
    }
}
