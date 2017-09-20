import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { Message, SelectItem } from 'primeng/primeng';
import { ImportService, CodartInfo, Translate } from './../services/import.service';
import {
    Product, Brand, Category, ProductCategory,
    Attribute, AttributeValue, ProductAttribute, ProductAttributeValue,
    Article, ArticleAttributeValue
} from './../shared/models';
import { Helpers } from '../shared/helpers';

@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html'
})

export class ImportComponent implements OnInit  {

    msgs: Message[] = [];
    isBusy: boolean;
    productCode: String;
    product: Product;
    products: SelectItem[];

    constructor(private authenticationService: AuthenticationService,
                private importService: ImportService) {
        authenticationService.title = 'Import';
    }

    ngOnInit() {
        if (!this.authenticationService.isAuthenticated) {
            return;
        }

        this.getProducts();
     }

     getProducts() {
        this.isBusy = true;
        this.importService.getProducts()
        .subscribe(res => {
            this.products = res.map(p => Helpers.newSelectItem(p.id, `${p.id} : ${p.key}`));
            this.isBusy = false;
        }, onerror => this.showError(onerror._body));
     }

     importClick() {
        this.isBusy = true;
        this.importService.getProductById(this.productCode)
        .subscribe(res => {
            this.product = this.convertProduct(res);
            this.importService.create(this.product)
            .subscribe(response => {
                this.product.productId = response.productId;
                this.msgs.push({severity: 'success', summary: 'create', detail: `Added product ${this.product.productName} id: ${this.product.productId}`});
                this.importService.build(this.product.productId)
                .subscribe(result => {
                    this.msgs.push({severity: 'success', summary: 'build', detail: `Added ${result.added} articles`});
                    this.isBusy = false;
                }, onerror => this.showError(onerror._body));
            }, onerror => this.showError(onerror._body));
        }, onerror => this.showError(onerror._body));
    }

    showError(error: any) {
        this.msgs.push({severity: 'error', summary: 'import', detail: error});
        this.isBusy = false;
    }

    convertProduct(product: CodartInfo): Product {
        // Brand
        let brand = new Brand();
        brand.brandName = 'Tessilnova';

        // Categories
        let category = new Category(0, product.category.desc);
        category.categoryIsPrimary = true;
        let subcategory = new Category(0, product.subcategory.desc);
        subcategory.categoryIsPrimary = false;

        // Texture
        let texture = product.producer.desc.replace('Tessilnova ', '');
        let textureAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Texture'),
            attributeValues: [
                <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, product.producer.id, texture) }
            ]
        };

        // Colors
        let colors = product.codarts.map(p => p.color).filter((x, i, a) => x && a.indexOf(x) === i);
        let colorAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Color'),
            attributeValues: colors.map(p => <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, p, p) })
        };

        // Sizes
        let sizes = product.codarts.map(p => p.size).filter((x, i, a) => x && a.indexOf(x) === i);
        let sizeAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Size'),
            attributeValues: sizes.map(p => <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, p, p) })
        };

        // // Articles
        // let articles: Article[]
        // product.codarts.forEach(p => {
        //     let article = new Article();
        //     article.articleBarcode = p.id.toString();
        //     article.attributeValues = [
        //         <ArticleAttributeValue>{ attributeValue: new AttributeValue(0, 0, p.color, p.color) },
        //         <ArticleAttributeValue>{ attributeValue: new AttributeValue(0, 0, p.size, p.size) }
        //     ];
        //     articles.push(article);
        // });

        // Product
        let item = new Product();
        item.productCode = product.id;
        item.productName = product.name;
        item.productUm = 'QT';
        item.productSellingPrice = product.price;
        item.brand = brand;
        item.categories = [
            <ProductCategory>{ productId: 0, category: category },
            <ProductCategory>{ productId: 0, category: subcategory }
        ];
        item.attributes = [ textureAttribute, colorAttribute, sizeAttribute ];
        // item.articles = articles;

        return item;
    }
}
