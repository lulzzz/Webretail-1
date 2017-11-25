import { Component, OnInit } from '@angular/core';
import { TreeNode, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import {
    Product, ProductAttribute, Attribute, Barcode,
    ProductAttributeValue, Article, ArticleAttributeValue, AttributeValue,
    ArticleForm, Packaging
} from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';
import { AttributeService } from './../services/attribute.service';
import { fail } from 'assert';

@Component({
    selector: 'app-variant',
    templateUrl: 'variant.component.html'
})

export class VariantComponent implements OnInit {

    articleForm: ArticleForm;
    totalRecords = 0;
    selected: any;
    productInfo: TreeNode[];
    selectedNode: TreeNode;
    nodesSource: TreeNode[];
    nodesTarget: TreeNode[];
    display: boolean;
    isBusy: boolean;

    constructor(private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService,
                private attributeService: AttributeService) {
    }

    get product(): Product { return this.productService.product; }

    ngOnInit() {
        this.sessionService.checkCredentials(false);
        this.createTree();
        this.createSheet();
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

    createSheet() {
        this.totalRecords = this.product.articles.length;
        this.productService.getStock(this.product.productId, '0')
            .subscribe(result => {
                this.articleForm = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    nodeSelect(event) {
        this.nodesSource = [];
        const type = this.selectedNode.type;
        switch (type) {
            case 'attributes':
                this.nodesTarget = this.productInfo.find(p => p.type === 'attributes').children;
                this.attributeService.getAll()
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data === p.attributeId) < 0) {
                                this.nodesSource.push(Helpers.newNode(p.attributeName, p.attributeId.toString(), 'attribute:0'));
                            }
                        });
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Get attributes', detail: onerror._body}));
                break;
            case (type.startsWith('attribute:') ? type : undefined):
                this.nodesTarget = this.productInfo.find(p => p.type === 'attributes')
                                                .children.find(p => p.data === this.selectedNode.data)
                                                .children;
                this.attributeService.getValueByAttributeId(this.selectedNode.data)
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data === p.attributeValueId) < 0) {
                                this.nodesSource.push(Helpers.newNode(
                                    p.attributeValueName, p.attributeValueId.toString(), 'attributeValue'));
                            }
                        });
                    },
                    onerror => this.messageService.add({severity: 'error', summary: 'Get values by attributeId', detail: onerror._body}));
                break;
            default:
                this.messageService.add({severity: 'warn', summary: 'warning', detail: 'You can not update anything to this node!'});
                return;
        }

        this.display = true;
    }

    addNodes(event: any) {
        const productAttributes: ProductAttribute[] = [];
        const productAttributeValues: ProductAttributeValue[] = [];
        const nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    const productAttribute = <ProductAttribute>{
                        productId: this.product.productId,
                        attribute: new Attribute(Number(p.data), p.label, [])
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    const productAttributeValue = <ProductAttributeValue>{
                        productAttributeId: Number(this.selectedNode.type.split(':')[1]),
                        attributeValue: new AttributeValue(0, Number(p.data), '', p.label, [])
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });

        if (productAttributes.length > 0) {
            this.productService
                .addAttributes(productAttributes)
                .subscribe(result => {
                    result.forEach((p, i) => {
                        this.nodesTarget[i].type = `attribute:${p.productAttributeId}`;
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' attributes'
                    });
                }, onerror => this.messageService.add({severity: 'error', summary: 'Add attributes', detail: onerror._body}));
        } else if (productAttributeValues.length > 0) {
            this.productService
                .addAttributeValues(productAttributeValues)
                .subscribe(result => this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' attribute values'
                    }), onerror => this.messageService.add({severity: 'error', summary: 'Add attribute values', detail: onerror._body}));
        }
    }

    removeNodes(event: any) {
        const productAttributes: ProductAttribute[] = [];
        const productAttributeValues: ProductAttributeValue[] = [];
        const nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    const productAttribute = <ProductAttribute>{
                        productId: this.product.productId,
                        attribute: new Attribute(Number(p.data), p.label, [])
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    const productAttributeValue = <ProductAttributeValue>{
                        productAttributeId: Number(this.selectedNode.type.split(':')[1]),
                        attributeValue: new AttributeValue(0, Number(p.data), '', p.label, [])
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });

        if (productAttributes.length > 0) {
            this.productService
                .removeAttributes(productAttributes)
                .subscribe(result => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + productAttributes.length + ' attributes'
                    });
                }, onerror => this.messageService.add({severity: 'error', summary: 'Remove attributes', detail: onerror._body}));
        } else if (productAttributeValues.length > 0) {
            this.productService
                .removeAttributeValues(productAttributeValues)
                .subscribe(result => this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + productAttributeValues.length + ' attribute values'
                    }), onerror => this.messageService.add({severity: 'error', summary: 'Remove attribute Values', detail: onerror._body}));
        }
    }

    closeClick() {
        this.display = false;
    }

    buildClick() {
        this.isBusy = true;
        this.productService.build(this.product.productId)
            .subscribe(result => {
                this.createSheet();
                this.isBusy = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Articles build',
                    detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                });
            }, onerror => {
                this.isBusy = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Articles build',
                    detail: onerror._body
                });
            });
    }

    saveClick() {
        let count = 0;
        this.isBusy = true;
        const length = this.articleForm.body.length - 1;
        const barcode = this.articleForm.body[length][this.articleForm.body[length].length - 1].value;
        this.articleForm.body
            .forEach(pp => {
                pp.forEach(p => {
                    if (p.id > 0) {
                        const article = new Article();
                        article.articleId = p.id;
                        article.packaging = new Packaging();
                        article.barcodes = [<Barcode>{ barcode: p.value, tags: [] }];
                        this.productService
                            .updateArticle(p.id, article)
                            .subscribe(result => {
                                count++;
                                if (result.barcodes.find(b => b.barcode === barcode)) {
                                    this.isBusy = false;
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Save barcodes',
                                        detail: count + ' barcodes successfully saved!'
                                    });
                                }
                            });
                    }
                });
            });
    }
}
