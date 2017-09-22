import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from './../services/authentication.service';
import { CompanyService } from './../services/company.service';
import { Company } from './../shared/models';

@Component({
    selector: 'company-component',
    templateUrl: 'company.component.html'
})

export class CompanyComponent implements OnInit {
    msgs: Message[] = [];
    company: Company;
    dataform: FormGroup;
    header: string;

    constructor(private authenticationService: AuthenticationService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
       authenticationService.title = 'Company';
       this.header = '/upload/header';
    }

    ngOnInit() {
        this.authenticationService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'desc': new FormControl('', Validators.nullValidator),
            'site': new FormControl('', Validators.nullValidator),
            'email': new FormControl('', Validators.required),
            'phone': new FormControl('', Validators.required),
            'address': new FormControl('', Validators.required),
            'city': new FormControl('', Validators.required),
            'zip': new FormControl('', Validators.required),
            'country': new FormControl('', Validators.required),
            'fiscalCode': new FormControl('', Validators.required),
            'vatNumber': new FormControl('', Validators.required),
            'host': new FormControl('', Validators.nullValidator),
            'ssl': new FormControl('', Validators.nullValidator),
            'username': new FormControl('', Validators.nullValidator),
            'password': new FormControl('', Validators.nullValidator),
            'barcode': new FormControl('', Validators.required)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
            }, onerror => this.msgs.push({severity: 'error', summary: 'Get company', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    saveClick() {
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    this.msgs.push({severity: 'success', summary: 'Success', detail: 'Company created'});
                }, onerror => this.msgs.push({severity: 'error', summary: 'Create company', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    this.msgs.push({severity: 'success', summary: 'Success', detail: 'Company updated'});
                }, onerror => this.msgs.push({severity: 'error', summary: 'Update company', detail: onerror._body}));
        }
    }

    onBasicUpload(event) {
        this.header = '';
        // for(let file of event.files) {
        // }
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
        this.header = '/upload/header?' + Date().length
    }
}
