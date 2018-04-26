import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company } from '../shared/models';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-shipping-component',
    templateUrl: 'shipping.component.html'
})

export class ShippingComponent implements OnInit {
    company: Company;
    dataform: FormGroup;

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Shipping');

        this.dataform = this.fb.group({
            'shippingStandard': new FormControl('', Validators.required),
            'shippingExpress': new FormControl('', Validators.required)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get shipping', detail: onerror._body})
        );
    }

    saveClick() {
        this.companyService
            .create(this.company)
            .subscribe(result => {
                this.company = result;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Shipping saved'});
            }, onerror => this.messageService.add({severity: 'error', summary: 'Save shipping', detail: onerror._body}));
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
}
