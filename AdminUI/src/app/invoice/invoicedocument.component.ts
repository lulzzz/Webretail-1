﻿import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from './../services/session.service';
import { CompanyService } from './../services/company.service';
import { InvoiceService } from './../services/invoice.service';
import { Invoice, MovementArticle, Company, Message } from './../shared/models';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-invoicedocument-component',
    templateUrl: 'invoicedocument.component.html'
})

export class InvoiceDocumentComponent implements OnInit, OnDestroy {
    @ViewChild('doc') doc: ElementRef;
    private sub: any;
    invoiceId: number;
    totalItems = 0;
    amount = 0.0;
    total = 0.0;
    invoice: Invoice;
    groups: any[];

    constructor(@Inject(DOCUMENT) private document: any,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private sessionService: SessionService,
                private companyService: CompanyService,
                private invoiceService: InvoiceService) {
        sessionService.title = 'Invoice';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.invoiceId = params['id'];

            this.invoiceService.getById(this.invoiceId)
                .subscribe(result => {
                    this.invoice = result;
                }, onerror => alert(onerror._body)
            );

            this.invoiceService.getMovementArticlesById(this.invoiceId)
                .subscribe(result => {
                    // let items: MovementArticle[] = [];
                    // for (let i = 0; i < 30; i++) {
                    //     items.push(result[0]);
                    // }
                    this.groups = [];
                    let array: MovementArticle[] = [];
                    let index = 0;
                    result.forEach((item) => {
                        array.push(item);
                        if (index > 11) {
                            this.groups.push(array);
                            array = [];
                            index = -1;
                        }
                        index++;
                    });
                    const lenght = 13 - array.length;
                    for (let i = 0; i < lenght; i++) {
                        array.push(new MovementArticle());
                    }
                    this.groups.push(array);

                    this.totalItems = result.map(p => p.movementArticleQuantity).reduce((sum, current) => sum + current);
                    this.total = result.map(p => p.movementArticleAmount).reduce((sum, current) => sum + current);
                    this.amount = this.total * 100 / 122;
                }, onerror => alert(onerror._body)
            );
        });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    cancelClick() {
        this.location.back();
    }

    // printClick() {
    //     window.print();
    // }

    pdfClick() {
        const model = new Message()
        model.subject = this.invoice.invoiceNumber + '.pdf';
        model.content = this.doc.nativeElement.innerHTML;

        this.companyService
            .htmlToPdf(model)
            .subscribe(
                data => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    FileSaver.saveAs(blob, model.subject);
                },
                err => console.error(err),
            () => console.log('done')
        );
    }

    sendMailClick() {
        const model = new Message()
        model.address = this.invoice.invoiceCustomer.customerEmail;
        model.subject = 'Invoice n° ' + this.invoice.invoiceNumber;
        model.content = this.doc.nativeElement.innerHTML;

        this.companyService.sendMail(model)
            .subscribe(
                result => alert(result.content),
                onerror => alert(onerror._body)
            );
    }
}
