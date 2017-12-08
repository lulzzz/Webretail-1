import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { CompanyService } from './../services/company.service';
import { Company } from './../shared/models';
import { SelectItem } from 'primeng/primeng';
import { Helpers } from '../shared/helpers';

@Component({
    selector: 'app-company-component',
    templateUrl: 'company.component.html'
})

export class CompanyComponent implements OnInit {
    company: Company;
    dataform: FormGroup;
    header: string;
    paypalEnvs: SelectItem[];

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
       this.header = '/Media/header.png';
       this.paypalEnvs = [
            {label: 'Sandbox', value: 'sandbox'},
            {label: 'Production', value: 'production'},
        ];
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Company');

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
            'currency': new FormControl('', Validators.required),
            'utc': new FormControl('', Validators.required),
            'host': new FormControl('', Validators.nullValidator),
            'ssl': new FormControl('', Validators.nullValidator),
            'username': new FormControl('', Validators.nullValidator),
            'password': new FormControl('', Validators.nullValidator),
            'paypalenv': new FormControl('', Validators.nullValidator),
            'paypalsandbox': new FormControl('', Validators.nullValidator),
            'paypalproduction': new FormControl('', Validators.nullValidator),
            'barcode': new FormControl('', Validators.required)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
                Helpers.currency = result.companyCurrency;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get company', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    saveClick() {
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company created'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Create company', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company updated'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Update company', detail: onerror._body}));
        }
    }

    onBasicUpload(event) {
        this.header = '';
        // for(let file of event.files) {
        // }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        this.header = '/Media/header.png?' + Date().length
    }
}
