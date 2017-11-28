import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService, TreeNode, Message } from 'primeng/primeng';
import { Product, Attribute, AttributeValue, AttributeForm } from './../shared/models';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';
import { AttributeService } from './../services/attribute.service';
import { ProductComponent } from './product.component';
import { Helpers } from '../shared/helpers';

@Component({
    selector: 'app-variant',
    templateUrl: 'variant.component.html'
})

export class VariantComponent implements OnInit {
    totalRecords = 0;
    forms: AttributeForm[];
    formsSelected: AttributeForm[];
    filteredNames: string[];
    productInfo: TreeNode[];
    selectedNode: TreeNode;

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
        this.totalRecords = this.product.articles.filter(p => p.attributeValues.length > 0).length;

        this.product.attributes.forEach(p => {
            const values = p.attributeValues.map(v => v.attributeValue.attributeValueName);
            this.formsSelected.push(<AttributeForm>{ id: p.attribute.attributeId, name: p.attribute.attributeName, values: values });
        });

        if (this.formsSelected.length === 0) {
            this.addClick();
        }

        this.attributeService.getValueAll()
            .subscribe(data => {
                this.attributeService.getAll()
                .subscribe(result => {
                    result.forEach(p => {
                        const values = data.filter(v => v.attributeId === p.attributeId).map(v => v.attributeValueName);
                        this.forms.push(<AttributeForm>{ id: p.attributeId, name: p.attributeName, values: values });
                    });
                    this.createTree();
                }, onerror => this.messageService.add({severity: 'error', summary: 'Attributes', detail: onerror._body}));
            }, onerror => this.messageService.add({severity: 'error', summary: 'Attribute values', detail: onerror._body}));
    }

    createTree() {
        const attributesNode = Helpers.newNode('Attributes', '[]', 'attributes');
        this.product.attributes.forEach(elem => {
            const node = Helpers.newNode(
                elem.attribute.attributeName, elem.attribute.attributeId.toString(),
                `attribute:${elem.productAttributeId}`
            );
            elem.attributeValues.forEach(e =>
                node.children.push(Helpers.newNode(
                    e.attributeValue.attributeValueName,
                    e.attributeValue.attributeValueId.toString(),
                    'attributeValue')
                )
            );
            node.expanded = false; // node.children.length > 0;
            attributesNode.children.push(node);
        });
        attributesNode.expanded = attributesNode.children.length > 0;
        this.productInfo = [attributesNode];
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

    openAttributesClick() {
        ProductComponent.instance.openSidebarClick('Attributes');
    }

    nodeSelect(event) {
        ProductComponent.instance.openSidebarClick('Change for: ' + this.selectedNode.label);
    }

}
