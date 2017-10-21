import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from './../services/session.service';
import { MovementService } from './../services/movement.service';
import { CompanyService } from './../services/company.service';
import { Movement, MovementArticle, Company, PdfDocument } from './../shared/models';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-document-component',
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit, OnDestroy {
    @ViewChild('doc') doc: ElementRef;
    private sub: any;
    movementId: number;
    totalItems = 0;
    amount = 0.0;
    total = 0.0;
    movement: Movement;
    groups: any[];
    isBusy: boolean;

    constructor(@Inject(DOCUMENT) private document: any,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private sessionService: SessionService,
                private companyService: CompanyService,
                private movementService: MovementService) {
        sessionService.title = 'Document';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.movementId = params['id'];
            this.isBusy = true;

            this.movementService.getById(this.movementId)
                .subscribe(result => {
                    this.movement = result;
                }, onerror => alert(onerror._body)
            );

            this.movementService.getItemsById(this.movementId)
                .subscribe(
                    result => {
                        // let items: MovementArticle[] = [];
                        // for (let i = 0; i < 30; i++) {
                        //     items.push(result[0]);
                        // }
                        this.groups = [];
                        let array: MovementArticle[] = [];
                        let index = 0;
                        result.forEach((item) => {
                            array.push(item);
                            if (index > 21) {
                                this.groups.push(array);
                                array = [];
                                index = -1;
                            }
                            index++;
                        });
                        const lenght = 23 - array.length;
                        for (let i = 0; i < lenght; i++) {
                            array.push(new MovementArticle());
                        }
                        this.groups.push(array);

                        this.totalItems = result.map(p => p.movementArticleQuantity).reduce((sum, current) => sum + current);
                        this.total = result.map(p => p.movementArticleAmount).reduce((sum, current) => sum + current);
                        this.amount = this.total * 100 / 122;
                    },
                    onerror => alert(onerror._body),
                    () => this.isBusy = false
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
        this.isBusy = true;

        const model = new PdfDocument()
        model.subject = this.movement.movementNumber + '.pdf';
        model.content = this.doc.nativeElement.innerHTML;

        this.companyService
            .htmlToPdf(model)
            .subscribe(
                data => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    FileSaver.saveAs(blob, model.subject);
                    // const url = window.URL.createObjectURL(blob);
                    // window.location.href = url;
                },
                err => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', (e) => alert(reader.result));
                    reader.readAsText(err._body);
                },
                () => this.isBusy = false
            );
    }

    sendMailClick() {
        this.isBusy = true;

        const model = new PdfDocument()
        model.address = this.movement.movementCustomer.customerEmail;
        model.subject = 'Document_' + this.movement.movementNumber + '.pdf';
        model.content = this.doc.nativeElement.innerHTML;
        model.zoom = '0.53';

        this.companyService.sendMail(model)
            .subscribe(
                result => alert(result.content),
                onerror => alert(onerror._body),
                () => this.isBusy = false
            );
    }
}
