import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { AttributeService } from './../services/attribute.service';
import { Attribute, AttributeValue } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'app-attribute',
    templateUrl: 'attribute.component.html'
})

export class AttributeComponent implements OnInit {
    totalRecords = 0;
    attributes: Attribute[];
    displayPanel: boolean;
    dataform: FormGroup;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private attributeService: AttributeService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        sessionService.title = 'Attributes';
    }

    set selected(value) { this.attributeService.selected = value; }
    get selected(): Attribute { return this.attributeService.selected; }
    get isNew(): boolean { return this.selected == null || this.selected.attributeId === 0; }
    get selectedIndex(): number { return this.attributes.indexOf(this.selected); }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.dataform = this.fb.group({
            'name': new FormControl('', Validators.required)
        });

        this.attributeService
            .getAll()
            .subscribe(result => {
                this.attributes = result;
                this.totalRecords = this.attributes.length;
            }
        );
    }

    onRowSelect(event: any) {
        this.attributeService.values = [];
        this.attributeService
            .getValueByAttributeId(this.selected.attributeId)
            .subscribe(result => {
                this.attributeService.values = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    addClick() {
        this.selected = new Attribute(0, '', []);
        this.displayPanel = true;
    }

    editClick() {
        this.displayPanel = true;
    }

    closeClick() {
        this.displayPanel = false;
    }

    saveClick() {
        if (this.isNew) {
            this.attributeService
                .create(this.selected)
                .subscribe(result => {
                    this.attributes.push(result);
                    this.displayPanel = false;
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.attributeService
                .update(this.selected.attributeId, this.selected)
                .subscribe(result => {
                    this.displayPanel = false;
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        }
    }

    deleteClick() {
        this.confirmationService.confirm({
            message: 'All values of this attribute and related articles will be deleted. Are you sure to delete this attribute?',
            accept: () => {
                this.attributeService
                    .delete(this.selected.attributeId)
                    .subscribe(result => {
                        this.attributes.splice(this.selectedIndex, 1);
                        this.totalRecords--;
                        this.selected = null;
                        this.attributeService.values.length = 0;
                        this.displayPanel = false;
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }
}
