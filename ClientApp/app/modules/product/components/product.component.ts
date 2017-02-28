import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode, Message, MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { Product, ProductCategory, Category, ProductAttribute, Attribute, ProductAttributeValue, Article, ArticleAttributeValue, AttributeValue } from './../../../shared/models';
import { FooterComponent } from './../../shared/components/footer/footer.component';
import { Helpers } from './../../../shared/helpers';
import { AuthenticationService } from './../../../services/authentication.service';
import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { AttributeService } from './../../../services/attribute.service';

@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    providers: [ CategoryService, AttributeService ]
})

export class ProductComponent implements OnInit, OnDestroy {

    private sub: any;
    msgs: Message[] = [];
    buttons: MenuItem[];
    product: Product;
    header: string[];
    articles: any[];
    totalRecords = 0;
    selected: any;
    productInfo: TreeNode[];
    selectedNode: TreeNode;
    nodesSource: TreeNode[];
    nodesTarget: TreeNode[];
    display: boolean;
    isBusy: boolean;

	constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private productService: ProductService,
                private categoryService: CategoryService,
                private attributeService: AttributeService) {}

    ngOnInit() {
        this.authenticationService.checkCredentials(false);

        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            this.productService.getProduct(id)
                .subscribe(result => {
                    this.product = result;
                    this.createTree();
                    this.createSheet();
                }//, onerror => alert('ERROR: ' + onerror)
            );
        });

        this.buttons = [{
            label: 'Build Articles', icon: 'fa-database', command: () => {
                this.buildClick();
            }
        }];
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    createTree() {
        let rootNode = Helpers.newNode(this.product.productName, this.product.productCode, 'product');
        rootNode.expanded = true;

        let producerNode = Helpers.newNode('Brand', '[]', 'brands');
        producerNode.expanded = true;
        producerNode.children.push(Helpers.newNode(this.product.brand.brandName, this.product.brand.brandId.toString(), 'brand'));
        rootNode.children.push(producerNode);

        let categoriesNode = Helpers.newNode('Categories', '[]', 'categories');
        this.product.categories.forEach(elem => {
            categoriesNode.children.push(Helpers.newNode(elem.category.categoryName, elem.category.categoryId.toString(), 'category'));
        });
        categoriesNode.expanded = categoriesNode.children.length > 0;
        rootNode.children.push(categoriesNode);

        let attributesNode = Helpers.newNode('Attributes', '[]', 'attributes');
        attributesNode.expanded = true;
        this.product.attributes.forEach(elem => {
            let node = Helpers.newNode(elem.attribute.attributeName, elem.attribute.attributeId.toString(), `attribute:${elem.productAttributeId}`);
            elem.attributeValues.forEach(e =>
                node.children.push(Helpers.newNode(e.attributeValue.attributeValueName, e.attributeValue.attributeValueId.toString(), 'attributeValue'))
            );
            node.expanded = node.children.length > 0;
            attributesNode.children.push(node);
        });
        attributesNode.expanded = attributesNode.children.length > 0;
        rootNode.children.push(attributesNode);

        this.productInfo = [rootNode];
    }

    createSheet() {
        this.totalRecords = this.product.articles.length;
        this.header = [];
        this.articles = [];
        let productAttributeValues: ProductAttributeValue[] = [];

        let lenght = this.product.attributes.length - 1;
        if (lenght > 0) {
            this.product.attributes.forEach(elem => {
                this.header.push(elem.attribute.attributeName);
                productAttributeValues = productAttributeValues.concat(elem.attributeValues);
            });
            this.header.pop();

            this.product.attributes[lenght].attributeValues.forEach(elem => {
                this.header.push(elem.attributeValue.attributeValueName);
            });
        }

        let source = Observable.from(this.product.articles)
            .groupBy(
                function (x) {
                    return x.attributeValues
                        .map(p => p.productAttributeValueId)
                        .slice(0, x.attributeValues.length - 1)
                        .join('#');
                },
                function (x) { return x; }
            );

        source.subscribe(obs => {
            let row: any[] = [];
            //console.log('Key: ' + obs.key);
            let isFirst = true;
            obs.forEach(e => {
                let qta = e.quantity;
                if (isFirst) {
                    e.attributeValues.forEach(ex => {
                        let productAttributeValue = productAttributeValues.find(
                            p => p.productAttributeValueId === ex.productAttributeValueId
                        );
                        row.push(productAttributeValue.attributeValue.attributeValueName);
                    });
                    isFirst = false;
                    row[row.length - 1] = qta;
                } else {
                    row.push(qta);
                }
            }).then(p => {
                this.articles.push(row);
            });
        }, err => this.msgs.push({severity: 'error', summary: 'Error', detail: err}));
    }

    editClick() {
        if (!this.selectedNode) {
            this.msgs.push({severity: 'warn', summary: 'Warning', detail: 'A node must be selected before editing!'});
            return;
        }

        this.nodesSource = [];

        let type = this.selectedNode.type;
        switch (type) {
            case 'categories':
                this.nodesTarget = this.productInfo[0].children.find(p => p.type == 'categories').children;
                this.categoryService.getAll()
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data == p.categoryId) < 0) {
                                this.nodesSource.push(Helpers.newNode(p.categoryName, p.categoryId.toString(), 'category'));
                            }
                        });
                    });
                break;
            case 'attributes':
                this.nodesTarget = this.productInfo[0].children.find(p => p.type == 'attributes').children;
                this.attributeService.getAll()
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data == p.attributeId) < 0) {
                                this.nodesSource.push(Helpers.newNode(p.attributeName, p.attributeId.toString(), 'attribute:0'));
                            }
                        });
                    });
                break;
            case (type.startsWith('attribute:') ? type : undefined):
                this.nodesTarget = this.productInfo[0].children.find(p => p.type == 'attributes')
                                                .children.find(p => p.data == this.selectedNode.data)
                                                .children;
                this.attributeService.getValueByAttributeId(this.selectedNode.data)
                    .subscribe(result => {
                        result.forEach(p => {
                            if (this.nodesTarget.findIndex(e => e.data == p.attributeValueId) < 0) {
                                this.nodesSource.push(Helpers.newNode(p.attributeValueName, p.attributeValueId.toString(), 'attributeValue'));
                            }
                        });
                    });
                break;
            default:
                this.msgs.push({severity: 'warn', summary: 'warning', detail: 'You can not update anything to this node!'});
                return;
        }

        this.display = true;
    }

    addNodes(event: any) {
        let productCategories: ProductCategory[] = [];
        let productAttributes: ProductAttribute[] = [];
        let productAttributeValues: ProductAttributeValue[] = [];
        let nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case 'category':
                    let productCategory = <ProductCategory>{
                        productId: this.product.productId,
                        category: new Category(p.data, p.label)
                    };
                    productCategories.push(productCategory);
                    break;
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    let productAttribute = <ProductAttribute>{
                        productId: this.product.productId,
                        attribute: new Attribute(p.data, p.label)
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    let productAttributeValue = <ProductAttributeValue>{
                        productAttributeId: Number(this.selectedNode.type.split(':')[1]),
                        attributeValue: new AttributeValue(0, p.data, '', p.label)
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });

        if (productCategories.length > 0) {
            this.productService
                .addCategories(productCategories)
                .subscribe(result => this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' categories'
                    }));
        } else if (productAttributes.length > 0) {
            this.productService
                .addAttributes(productAttributes)
                .subscribe(result => {
                    result.forEach((p, i) => {
                        this.nodesTarget[i].type = `attribute:${p.productAttributeId}`;
                    });
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' attributes'
                    });
                });
        } else if (productAttributeValues.length > 0) {
            this.productService
                .addAttributeValues(productAttributeValues)
                .subscribe(result => this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Added ' + result.length + ' attribute values'
                    }));
        }
    }

    removeNodes(event: any) {
        let productCategories: ProductCategory[] = [];
        let productAttributes: ProductAttribute[] = [];
        let productAttributeValues: ProductAttributeValue[] = [];
        let nodes: TreeNode[] = event.items;

        nodes.forEach(p => {
            switch (p.type) {
                case 'category':
                    let productCategory = <ProductCategory>{
                        productId: this.product.productId,
                        category: new Category(p.data, p.label)
                    };
                    productCategories.push(productCategory);
                    break;
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    let productAttribute = <ProductAttribute>{
                        productId: this.product.productId,
                        attribute: new Attribute(p.data, p.label)
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    let productAttributeValue = <ProductAttributeValue>{
                        productAttributeId: Number(this.selectedNode.type.split(':')[1]),
                        attributeValue: new AttributeValue(0, p.data, '', p.label)
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });

        if (productCategories.length > 0) {
            this.productService
                .removeCategories(productCategories)
                .subscribe(result => this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + result.length + ' categories'
                    }));
        } else if (productAttributes.length > 0) {
            this.productService
                .removeAttributes(productAttributes)
                .subscribe(result => {
                    this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + result.length + ' attributes'
                    });
                });
        } else if (productAttributeValues.length > 0) {
            this.productService
                .removeAttributeValues(productAttributeValues)
                .subscribe(result => this.msgs.push({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Removed ' + result.length + ' attribute values'
                    }));
        }
    }

    buildClick() {
        this.isBusy = true;
        this.productService.build(this.product.productId)
                           .subscribe(result => {
                                this.productService.getProduct(this.product.productId)
                                    .subscribe(res => {
                                        this.product = res;
                                        this.createSheet();
                                        this.isBusy = false;
                                        this.msgs.push({
                                            severity: 'success',
                                            summary: 'Articles build',
                                            detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                                        });
                                    }
                                );
                            }, onerror => {
                                this.isBusy = false;
                                this.msgs.push({
                                    severity: 'error',
                                    summary: 'Articles build',
                                    detail: onerror._body
                                });
                            });
    }
}
