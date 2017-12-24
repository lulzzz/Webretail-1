import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/primeng';
import { CountryService, Country } from '../services/country.service';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company, Translation, PdfDocument } from '../shared/models';
import { Helpers } from '../shared/helpers';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';

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

            'emailInfo': new FormControl('', Validators.nullValidator),
            'emailSales': new FormControl('', Validators.nullValidator),
            'emailSupport': new FormControl('', Validators.nullValidator),
            'phone': new FormControl('', Validators.nullValidator),

            'currency': new FormControl('', [Validators.nullValidator, Validators.minLength(3), Validators.maxLength(3)]),
            'utc': new FormControl('', Validators.nullValidator),
            'localeCode': new FormControl('', [Validators.nullValidator, Validators.minLength(2), Validators.maxLength(2)]),
            'localeName': new FormControl('', Validators.nullValidator),

            'host': new FormControl('', Validators.nullValidator),
            'ssl': new FormControl('', Validators.nullValidator),
            'username': new FormControl('', Validators.nullValidator),
            'password': new FormControl('', Validators.nullValidator),
            'emailTest': new FormControl('', Validators.nullValidator),

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

        this.countryService.get()
            .subscribe(result => {
                this.loadCountries(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get countries', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    loadCountries(countries: Country[]) {
        this.countries = countries.map(p => Helpers.newSelectItem(p.alpha3Code, p.alpha3Code + ' - ' + p.name));

        let current: Country;
        const names: string[] = [];
        countries.sort((n1, n2) => {
            if (n1.currencies[0].code > n2.currencies[0].code) {
                return 1;
            }
            if (n1.currencies[0].code < n2.currencies[0].code) {
                return -1;
            }
            return 0;
        }).forEach(p => {
            if (names.length > 0 && current.currencies[0].code !== p.currencies[0].code) {
                const item = Helpers.newSelectItem(current.currencies[0].code, current.currencies[0].code + ' (' + names.join(',') + ')');
                this.currencies.push(item);
                names.length = 0;
            }
            current = p;
            names.push(p.name);
        });

        names.length = 0;
        countries.sort((n1, n2) => {
            if (n1.timezones[0] > n2.timezones[0]) {
                return 1;
            }
            if (n1.timezones[0] < n2.timezones[0]) {
                return -1;
            }
            return 0;
        }).forEach(p => {
            if (names.length > 0 && current.timezones[0] !== p.timezones[0]) {
                const item = Helpers.newSelectItem(current.timezones[0], current.timezones[0] + ' (' + names.join(',') + ')');
                this.timezones.push(item);
                names.length = 0;
            }
            current = p;
            names.push(p.name);
        });

        // this.currencies = countries.map(p =>
        //     Helpers.newSelectItem(p.currencies[0].code, p.currencies[0].name + ' (' + p.name + ')'));
        // this.timezones = countries.map(p => Helpers.newSelectItem(p.timezones[0], p.timezones[0] + ' (' + p.name + ')'));

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
                Helpers.setInfos(result);
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get company', detail: onerror._body})
        );
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

    download(fileName: string) {
        this.companyService
            .downloadCsv(fileName)
            .subscribe(
                data => {
                    const blob = new Blob([data], {type: 'text/csv'});
                    FileSaver.saveAs(blob, fileName);
                },
                err => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', (e) =>
                        this.messageService.add({severity: 'error', summary: 'Error', detail: reader.result}));
                    reader.readAsText(err._body);
                }
            );
    }

    sendMailClick() {
        if (this.dataform.controls['emailTest'].invalid) {
            this.messageService.add({severity: 'warning', summary: 'Attention', detail: 'Mail address is required'});
            return;
        }

        const model = new PdfDocument()
        model.address = this.emailTest;
        model.subject = 'Test message';
        model.content = '<h1>Webretail SMTP server message</h1>';

        this.companyService.sendHtmlMail(model)
            .subscribe(
                result => this.messageService.add({severity: 'success', summary: 'Success', detail: result.content}),
                onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
            );
    }
}
