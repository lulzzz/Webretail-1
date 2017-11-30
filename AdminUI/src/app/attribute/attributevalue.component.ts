import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { SessionService } from './../services/session.service';
import { AttributeService } from './../services/attribute.service';
import { Attribute, AttributeValue } from './../shared/models';
import { Helpers } from './../shared/helpers';

@Component({
    selector: 'app-attributevalue',
    templateUrl: 'attributevalue.component.html'
})

export class AttributeValueComponent implements OnInit {
    totalValues = 0;
    selectedValue: AttributeValue;
    displayPanelValue: boolean;
    dataformValue: FormGroup;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private attributeService: AttributeService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
    }

    get selected(): Attribute { return this.attributeService.selected; }
    set values(value) { this.attributeService.values = value; }
    get values(): AttributeValue[] { return this.attributeService.values; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.sessionService.setTitle('Attribute values');

        this.dataformValue = this.fb.group({
            'code': new FormControl('', [Validators.required, Validators.maxLength(6)]),
            'name': new FormControl('', Validators.required)
        });

        if (!this.selected) {
            return;
        }

        this.attributeService
            .getValueByAttributeId(this.selected.attributeId)
            .subscribe(result => {
                this.values = result;
                this.totalValues = this.values.length;
            }
        );
    }

    get isNewValue(): boolean { return this.selectedValue == null || this.selectedValue.attributeValueId === 0; }

    get selectedValueIndex(): number { return this.values.indexOf(this.selectedValue); }

    onRowValueSelect(event: any) {
        this.displayPanelValue = true;
    }

    addValueClick() {
        if (this.selected && this.selected.attributeId > 0) {
            this.selectedValue = new AttributeValue(this.selected.attributeId, 0, '', '', []);
            this.displayPanelValue = true;
        } else {
            alert('Select a attribute before add value!');
        }
    }

    editValueClick() {
        this.displayPanelValue = true;
    }

    closeValueClick() {
        this.displayPanelValue = false;
        this.selectedValue = null;
    }

    saveValueClick() {
        if (this.isNewValue) {
            this.attributeService
                .createValue(this.selectedValue)
                .subscribe(result => {
                    this.values.push(result);
                    this.closeValueClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        } else {
            this.attributeService
                .updateValue(this.selectedValue.attributeValueId, this.selectedValue)
                .subscribe(result => {
                    this.closeValueClick();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
        }
    }

    deleteValueClick() {
        this.confirmationService.confirm({
            message: 'All related articles of this attribute value will be deleted. Are you sure to delete this attribute value?',
            accept: () => {
                this.attributeService
                    .deleteValue(this.selectedValue.attributeValueId)
                    .subscribe(result => {
                        this.values.splice(this.selectedValueIndex, 1);
                        this.totalValues--;
                        this.closeValueClick();
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
            }
        });
    }
}
