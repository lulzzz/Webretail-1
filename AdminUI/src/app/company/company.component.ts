import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/primeng';
import { CountryService, Country } from '../services/country.service';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company, Translation } from '../shared/models';
import { Helpers } from '../shared/helpers';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-company-component',
    templateUrl: 'company.component.html'
})

export class CompanyComponent implements OnInit {
    company: Company;
    dataform: FormGroup;
    header: string;
    paypalEnvs: SelectItem[];
    translation: Translation;
    countries: SelectItem[];
    currencies: SelectItem[];
    timezones: SelectItem[];

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private countryService: CountryService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
       this.header = '/Media/header.png';
       this.paypalEnvs = [
            {label: 'Sandbox', value: 'sandbox'},
            {label: 'Production', value: 'production'},
        ];
        this.countries = [];
        this.currencies = [];
        this.timezones = [];
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Company');
        this.translation = new Translation('', '');

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

            'emailInfo': new FormControl('', [Validators.nullValidator, Validators.email]),
            'emailSales': new FormControl('', [Validators.nullValidator, Validators.email]),
            'emailSupport': new FormControl('', [Validators.nullValidator, Validators.email]),
            'phone': new FormControl('', Validators.nullValidator),

            'currency': new FormControl('', [Validators.nullValidator, Validators.minLength(3), Validators.maxLength(3)]),
            'utc': new FormControl('', Validators.nullValidator),
            'localeCode': new FormControl('', [Validators.nullValidator, Validators.minLength(2), Validators.maxLength(2)]),
            'localeName': new FormControl('', Validators.nullValidator),

            'host': new FormControl('', Validators.nullValidator),
            'ssl': new FormControl('', Validators.nullValidator),
            'username': new FormControl('', Validators.nullValidator),
            'password': new FormControl('', Validators.nullValidator),

            'bankName': new FormControl('', Validators.nullValidator),
            'bankIban': new FormControl('', Validators.nullValidator),
            'paypalEnv': new FormControl('', Validators.nullValidator),
            'paypalSandbox': new FormControl('', Validators.nullValidator),
            'paypalProduction': new FormControl('', Validators.nullValidator),
            'cashOnDelivery': new FormControl('', Validators.nullValidator),

            'shippingStandard': new FormControl('', Validators.required),
            'shippingExpress': new FormControl('', Validators.required),

            'barcode': new FormControl('', Validators.required)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
                Helpers.setInfos(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get company', detail: onerror._body})
        );

        this.countryService.get()
            .subscribe(result => {
                this.loadCountries(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get countries', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    loadCountries(countries: Country[]) {
        this.countries = countries.map(p => Helpers.newSelectItem(p.alpha3Code, p.alpha3Code + ' - ' + p.name));
        this.currencies = countries.map(p =>
            Helpers.newSelectItem(p.currencies[0].code, p.currencies[0].name + ' (' + p.name + ')'));
        this.timezones = countries.map(p => Helpers.newSelectItem(p.timezones[0], p.timezones[0] + ' (' + p.name + ')'));
    }

    addClick() {
        this.company.companyLocales.push(this.translation);
        this.translation = new Translation('', '');
        this.dataform.reset();
    }

    removeClick(item: Translation) {
        const index = this.company.companyLocales.indexOf(item);
        this.company.companyLocales.splice(index, 1);
    }

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
