import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { MwsRequest, MwsConfig } from './../shared/models';
import { AmazonService } from '../services/amazon.service';

@Component({
    selector: 'app-amazon-component',
    templateUrl: 'amazon.component.html'
})

export class AmazonComponent implements OnInit {
    totalRecords = 0;
    items: MwsRequest[];
    config: MwsConfig;
    displayPanel: boolean;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private amazonService: AmazonService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Amazon');
        this.refreshClick();
    }

    refreshClick() {
        this.amazonService
            .get()
            .subscribe(result => {
                this.items = result;
                this.totalRecords = this.items.length;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
        );
    }

    editClick() {
        this.amazonService
            .getConfig()
            .subscribe(result => {
                this.config = result;
                this.displayPanel = true;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
        );
    }

    closeClick() {
        this.displayPanel = false;
    }

    saveClick() {
        this.amazonService
            .updateConfig(this.config)
            .subscribe(result => {
                this.config = result;
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully saved!'});
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body})
        );
    }

    deleteClick(requestSubmissionId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to cancel this request?',
            accept: () => {
                this.amazonService
                    .delete(requestSubmissionId)
                    .subscribe(result => {
                        // this.items.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }
}
