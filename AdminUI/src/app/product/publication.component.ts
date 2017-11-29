import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Publication } from './../shared/models';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';
import { PublicationService } from '../services/publication.service'

@Component({
    selector: 'app-publication',
    templateUrl: 'publication.component.html'
})

export class PublicationComponent implements OnInit {

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private publicationService: PublicationService,
                private productService: ProductService) {
    }

    get publication(): Publication { return this.publicationService.publication; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        const productId = this.productService.product.productId;
        this.publicationService.getPublication(productId)
            .subscribe(
                res => {
                    res.productId = productId;
                    this.publicationService.publication = res;
                },
                onerror => this.messageService.add({
                    severity: 'error', summary: 'get publication', detail: onerror._body
                })
            );
    }
}
