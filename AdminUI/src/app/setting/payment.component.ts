import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/primeng';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company } from '../shared/models';
import { Helpers } from '../shared/helpers';

@Component({
    selector: 'app-payment-component',
    templateUrl: 'payment.component.html'
})

export class PaymentComponent implements OnInit {
    company: Company;
    dataform: FormGroup;
    paypalEnvs: SelectItem[];

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
       this.paypalEnvs = [
           Helpers.newSelectItem('sandbox', 'Sandbox'),
           Helpers.newSelectItem('production', 'Production')
        ];
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Payment');

        this.dataform = this.fb.group({
            'bankName': new FormControl('', Validators.nullValidator),
            'bankIban': new FormControl('', Validators.nullValidator),
            'paypalEnv': new FormControl('', Validators.nullValidator),
            'paypalSandbox': new FormControl('', Validators.nullValidator),
            'paypalProduction': new FormControl('', Validators.nullValidator),
            'cashOnDelivery': new FormControl('', Validators.nullValidator)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get payment', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    saveClick() {
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Payment created'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Create payment', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Payment updated'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Update payment', detail: onerror._body}));
        }
    }
}
