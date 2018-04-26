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

    saveClick() {
        this.companyService
            .create(this.company)
            .subscribe(result => {
                this.company = result;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'SMTP saved'});
            }, onerror => this.messageService.add({severity: 'error', summary: 'Save SMTP', detail: onerror._body}));
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
                result => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Email successfully sent'}),
                onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
            );
    }
}
