import { Component, OnInit  } from '@angular/core';
import { SessionService } from './../services/session.service';
import { Message, SelectItem } from 'primeng/primeng';
import { ImportService, CodartInfo, Translate, Image } from './../services/import.service';
import {
    Product, Brand, Category, ProductCategory,
    Attribute, AttributeValue, ProductAttribute, ProductAttributeValue,
    Article, ArticleAttributeValue, Media, Translation
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

    constructor(private sessionService: SessionService,
                private importService: ImportService) {
        sessionService.title = 'Import';
    }

    ngOnInit() {
        if (!this.sessionService.isAuthenticated) {
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
            .subscribe(result => {
                this.msgs.push({
                    severity: 'success',
                    summary: 'import',
                    detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                });
                this.isBusy = false;
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
        category.translations = product.category.translates.map(p => new Translation(p.code, p.value));

        let subcategory = new Category(0, product.subcategory.desc);
        subcategory.categoryIsPrimary = false;
        subcategory.translations = product.subcategory.translates.map(p => new Translation(p.code, p.value));

        // Texture
        let texture = product.producer.desc.replace('Tessilnova ', '');
        let textureAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Texture', [new Translation('IT', 'Tessuto')]),
            attributeValues: [
                <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, product.producer.id.trim(), texture, []) }
            ]
        };

        // Colors
        let colors = Helpers.distinct(product.codarts.map(p => Helpers.newSelectItem(p.colorId.trim(), p.color)));
        let colorAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Color', [new Translation('IT', 'Colore')]),
            attributeValues: colors.map(p => <ProductAttributeValue>{
                attributeValue: new AttributeValue(0, 0, p.value, p.label,
                    product.translates.filter(t => t.key === p.label).map(t => new Translation(t.code, t.value))
                )
            })
        };

        // Sizes
        let sizes = product.codarts.map(p => p.size).filter((x, i, a) => x && a.indexOf(x) === i);
        let sizeAttribute = <ProductAttribute>{
            attribute: new Attribute(0, 'Size', [new Translation('IT', 'Misura')]),
            attributeValues: sizes.map(p => <ProductAttributeValue>{ attributeValue: new AttributeValue(0, 0, p, p,
                product.translates.filter(t => t.key === p).map(t => new Translation(t.code, t.value))
            ) })
        };

        // Articles
        let articles: Article[] = [];
        product.codarts.forEach(p => {
            let article = new Article();
            article.articleBarcode = p.barcode;
            article.attributeValues = [
                <ArticleAttributeValue>{ attributeValue: new AttributeValue(0, 0, product.producer.id.trim(), texture, []) },
                <ArticleAttributeValue>{ attributeValue: new AttributeValue(0, 0, p.colorId.trim(), p.color, []) },
                <ArticleAttributeValue>{ attributeValue: new AttributeValue(0, 0, p.size, p.size, []) }
            ];
            articles.push(article);
        });

        // Medias
        let medias = product.medias.map(p => new Media(p.filename, p.url, p.number));

        // Translations
        let translations = product
            .translates.filter(p => p.key === product.id)
            .map(p => new Translation(p.code, p.value));

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
        item.articles = articles;
        item.medias = medias;
        item.translations = product.translates.filter(p => p.key === product.id).map(p => new Translation(p.code, p.value));

        return item;
    }
}
