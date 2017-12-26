import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/primeng';
import { CountryService, Country } from '../services/country.service';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company } from '../shared/models';
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
    countries: SelectItem[];
    emailTest: string;

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private countryService: CountryService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
       this.header = '/media/header.png';
       this.paypalEnvs = [
            {label: 'Sandbox', value: 'sandbox'},
            {label: 'Production', value: 'production'},
        ];
        this.countries = [];
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Company');

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.nullValidator),
            'desc': new FormControl('', Validators.nullValidator),
            'site': new FormControl('', Validators.nullValidator),
            'address': new FormControl('', Validators.nullValidator),
            'city': new FormControl('', Validators.nullValidator),
            'zip': new FormControl('', [Validators.nullValidator, Validators.minLength(5), Validators.maxLength(5)]),
            'province': new FormControl('', [Validators.nullValidator, Validators.minLength(2), Validators.maxLength(2)]),
            'country': new FormControl('', [Validators.nullValidator, Validators.minLength(3), Validators.maxLength(3)]),
            'vatNumber': new FormControl('', [Validators.nullValidator, Validators.minLength(11), Validators.maxLength(11)]),

            'emailInfo': new FormControl('', Validators.nullValidator),
            'emailSales': new FormControl('', Validators.nullValidator),
            'emailSupport': new FormControl('', Validators.nullValidator),
            'phone': new FormControl('', Validators.nullValidator),

            'barcode': new FormControl('', Validators.required)
        });

        this.countryService.get()
            .subscribe(result => {
                this.loadCountries(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get countries', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    loadCountries(countries: Country[]) {
        this.countries = countries.map(p => Helpers.newSelectItem(p.alpha3Code, p.alpha3Code + ' - ' + p.name));

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
                Helpers.setInfos(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get company', detail: onerror._body})
        );
    }

    saveClick() {
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    Helpers.setInfos(result);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company created'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Create company', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    Helpers.setInfos(result);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Company updated'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Update company', detail: onerror._body}));
        }
    }

    onBasicUpload(event) {
        this.header = '';
        // for(let file of event.files) {
        // }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        this.header = '/media/header.png?' + Date().length
    }
}
