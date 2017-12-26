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

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

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
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Shipping created'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Create shipping', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Shipping updated'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Update shipping', detail: onerror._body}));
        }
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
