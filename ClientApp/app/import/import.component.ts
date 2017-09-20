import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { ImportService, CodartInfo, Translate } from './../services/import.service';
import {
    Product, Brand, Category, ProductCategory,
    Attribute, AttributeValue, ProductAttribute, ProductAttributeValue,
    Article, ArticleAttributeValue
} from './../shared/models';

@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html'
})

export class ImportComponent implements OnInit  {

    isBusy: boolean;
    productCode: String;
    product: Product;
    products: Translate[];

    constructor(private authenticationService: AuthenticationService,
                private importService: ImportService) {
        authenticationService.title = 'Import';
    }

    ngOnInit() {
        if (!this.authenticationService.isAuthenticated) {
            return;
        }
        this. productCode = '1000284';
     }

     productsClick() {
        this.isBusy = true;
        this.importService.getProducts()
        .subscribe(res => {
            this.products = res;
            this.isBusy = false;
        }, onerror => alert(JSON.stringify(onerror)));
     }

     importClick() {
        this.isBusy = true;
        this.importService.getProductById(this.productCode)
        .subscribe(res => {
            this.product = this.convertProduct(res);
            this.importService.create(this.product)
            .subscribe(response => {
                this.product.productId = response.productId;
                this.isBusy = false;
            }, onerror => alert(JSON.stringify(onerror)));
        }, onerror => alert(JSON.stringify(onerror)));
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
        let textureAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Texture'),
            attributeValues: [ <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, product.producer.id, product.producer.desc) } ]
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
