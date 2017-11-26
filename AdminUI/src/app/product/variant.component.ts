import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { Product, Attribute, AttributeValue, AttributeForm } from './../shared/models';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';
import { AttributeService } from './../services/attribute.service';
import { ProductComponent } from './product.component';

@Component({
    selector: 'app-variant',
    templateUrl: 'variant.component.html'
})

export class VariantComponent implements OnInit {
    isBusy: boolean;
    forms: AttributeForm[];
    formsSelected: AttributeForm[];
    filteredNames: string[];

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private sessionService: SessionService,
                private productService: ProductService,
                private attributeService: AttributeService) {
    }

    get product(): Product { return this.productService.product; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        this.forms = [];
        this.formsSelected = [];

        this.product.attributes.forEach(p => {
            const values = p.attributeValues.map(v => v.attributeValue.attributeValueName);
            this.formsSelected.push(<AttributeForm>{ id: p.attribute.attributeId, name: p.attribute.attributeName, values: values });
        });

        this.attributeService.getValueAll()
            .subscribe(data => {
                this.attributeService.getAll()
                .subscribe(result => {
                    result.forEach(p => {
                        const values = data.filter(v => v.attributeId === p.attributeId).map(v => v.attributeValueName);
                        this.forms.push(<AttributeForm>{ id: p.attributeId, name: p.attributeName, values: values });
                    });
                }, onerror => this.messageService.add({severity: 'error', summary: 'Attributes', detail: onerror._body}));
            }, onerror => this.messageService.add({severity: 'error', summary: 'Attribute values', detail: onerror._body}));
    }

    filterAttributes(event) {
        this.filteredNames = [];
        this.forms.forEach(p => {
            if (event.query === ' ' || p.name.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredNames.push(p.name);
            }
        });
        this.addValue(event.query);
    }

    filterAttributeValues(event, id) {
        this.filteredNames = [];
        this.forms.filter(p => id === 0 || p.id === id)
            .forEach(v => {
                v.values.forEach(x => {
                    if (event.query === ' ' || x.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                        this.filteredNames.push(x);
                    }
                });
            });
        this.addValue(event.query);
    }

    addValue(value) {
        if (this.filteredNames.length === 0) {
            this.filteredNames.push(value);
        }
    }

    addClick() {
        this.formsSelected.push(<AttributeForm>{ id: 0, name: '', values: [] });
    }

    removeClick(name) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this attribute?',
            accept: () => {
                const index = this.formsSelected.findIndex(p => p.name === name);
                this.formsSelected.splice(index, 1);
            }
        });
    }

    openSidebarClick() {
        ProductComponent.instance.openSidebarClick('Attributes');
    }
}
