import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TreeNode, Message, MenuItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import {
    Product, ProductCategory, Category, ProductAttribute, Attribute,
    ProductAttributeValue, Article, ArticleAttributeValue, AttributeValue, ArticleForm
} from './../shared/models';
import { Helpers } from './../shared/helpers';
import { SessionService } from './../services/session.service';
import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import { AttributeService } from './../services/attribute.service';

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit, OnDestroy {

    private sub: any;
    buttons: MenuItem[];
    product: Product;
    articleForm: ArticleForm;
    totalRecords = 0;
    selected: any;
    productInfo: TreeNode[];
    selectedNode: TreeNode;
    nodesSource: TreeNode[];
    nodesTarget: TreeNode[];
    display: boolean;
    isBusy: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                private sessionService: SessionService,
                private productService: ProductService,
                private categoryService: CategoryService,
                private attributeService: AttributeService,
                private location: Location) {
        sessionService.title = 'Product';
    }

    ngOnInit() {
        this.sessionService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            const productId = Number(params['id']);
            this.productService.getProduct(productId)
                .subscribe(result => {
                    this.product = result;
                }, onerror => this.messageService.add({severity: 'error', summary: 'Get product', detail: onerror._body})
            );
        });

        this.buttons = [
            { label: 'Generate items', icon: 'fa-database', command: () => this.buildClick() },
            { label: 'Save barcodes', icon: 'fa-barcode', command: () => this.saveClick() }
        ];
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    cancelClick() {
        this.location.back();
    }

    closeClick() {
        this.display = false;
        this.selectedNode = null;
    }

    createTree() {
        const rootNode = Helpers.newNode(this.product.productName, this.product.productCode, 'product');
        rootNode.expanded = true; // this.product.articles.length === 0;

        // let producerNode = Helpers.newNode('Brand', '[]', 'brands');
        // producerNode.expanded = true;
        // producerNode.children.push(Helpers.newNode(this.product.brand.brandName, this.product.brand.brandId.toString(), 'brand'));
        // rootNode.children.push(producerNode);

        const categoriesNode = Helpers.newNode('Categories', '[]', 'categories');
        this.product.categories.forEach(elem => {
            categoriesNode.children.push(Helpers.newNode(elem.category.categoryName, elem.category.categoryId.toString(), 'category'));
        });
        categoriesNode.expanded = categoriesNode.children.length > 0;
        rootNode.children.push(categoriesNode);

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
        rootNode.children.push(attributesNode);

        this.productInfo = [rootNode];
    }

    createSheet() {
        this.totalRecords = this.product.articles.length;
        this.productService.getArticles(this.product.productId, '0')
            .subscribe(result => {
                this.articleForm = result;
            }, onerror => this.messageService.add({severity: 'error', summary: 'Error', detail: onerror._body}));
    }

    editClick() {
        if (!this.selectedNode) {
            this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'A node must be selected before editing!'});
            return;
        }

        this.nodesSource = [];

        const type = this.selectedNode.type;
        switch (type) {
            case 'categories':
                this.nodesTarget = this.productInfo[0].children.find(p => p.type === 'categories').children;
                this.categoryService.getAll()
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data === p.categoryId) < 0) {
                                this.nodesSource.push(Helpers.newNode(p.categoryName, p.categoryId.toString(), 'category'));
                            }
                        });
                    }, onerror => this.messageService.add({severity: 'error', summary: 'Get categories', detail: onerror._body}));
                break;
            case 'attributes':
                this.nodesTarget = this.productInfo[0].children.find(p => p.type === 'attributes').children;
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
                this.nodesTarget = this.productInfo[0].children.find(p => p.type === 'attributes')
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
        const productCategories: ProductCategory[] = [];
        const productAttributes: ProductAttribute[] = [];
        const productAttributeValues: ProductAttributeValue[] = [];
        const nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case 'category':
                    const productCategory = <ProductCategory>{
                        productId: this.product.productId,
                        category: new Category(Number(p.data), p.label)
                    };
                    productCategories.push(productCategory);
                    break;
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

        if (productCategories.length > 0) {
            this.productService
                .addCategories(productCategories)
                .subscribe(result => this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' categories'
                    }), onerror => this.messageService.add({severity: 'error', summary: 'Add categories', detail: onerror._body}));
        } else if (productAttributes.length > 0) {
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
        const productCategories: ProductCategory[] = [];
        const productAttributes: ProductAttribute[] = [];
        const productAttributeValues: ProductAttributeValue[] = [];
        const nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case 'category':
                    const productCategory = <ProductCategory>{
                        productId: this.product.productId,
                        category: new Category(Number(p.data), p.label)
                    };
                    productCategories.push(productCategory);
                    break;
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

        if (productCategories.length > 0) {
            this.productService
                .removeCategories(productCategories)
                .subscribe(result => this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + productCategories.length + ' categories'
                    }), onerror => this.messageService.add({severity: 'error', summary: 'Remove categories', detail: onerror._body}));
        } else if (productAttributes.length > 0) {
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

    buildClick() {
        this.isBusy = true;
        this.productService.build(this.product.productId)
            .subscribe(result => {
                this.productService.getProduct(this.product.productId)
                    .subscribe(res => {
                        this.product = res;
                        this.productInfo[0].expanded = false;
                        this.createSheet();
                        this.isBusy = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Articles build',
                            detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                        });
                    }
                );
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
                        article.articleBarcode = p.value;
                        this.productService
                            .updateArticle(p.id, article)
                            .subscribe(result => {
                                count++;
                                if (result.articleBarcode === barcode) {
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
