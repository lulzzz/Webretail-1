import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from '../services/session.service';
import { CompanyService } from '../services/company.service';
import { Company, PdfDocument } from '../shared/models';

@Component({
    selector: 'app-smtp-component',
    templateUrl: 'smtp.component.html'
})

export class SmtpComponent implements OnInit {
    company: Company;
    dataform: FormGroup;
    emailTest: string;

    constructor(private sessionService: SessionService,
                private messageService: MessageService,
                private companyService: CompanyService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('SMTP');

        this.dataform = this.fb.group({
            'host': new FormControl('', Validators.nullValidator),
            'ssl': new FormControl('', Validators.nullValidator),
            'username': new FormControl('', Validators.nullValidator),
            'password': new FormControl('', Validators.nullValidator),
            'emailTest': new FormControl('', Validators.nullValidator)
        });

        this.companyService.get()
            .subscribe(result => {
                this.company = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Get SMTP', detail: onerror._body})
        );
    }

    get isNew(): boolean { return this.company == null || this.company.companyId === 0; }

    saveClick() {
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'SMTP created'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Create SMTP', detail: onerror._body}));
        } else {
            this.companyService
                .update(this.company)
                .subscribe(result => {
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'SMTP updated'});
                }, onerror => this.messageService.add({severity: 'error', summary: 'Update SMTP', detail: onerror._body}));
        }
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
