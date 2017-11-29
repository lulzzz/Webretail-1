import { Component, OnInit } from '@angular/core';
import { Product } from './../shared/models';
import { ProductService } from './../services/product.service';

@Component({
    selector: 'app-seo',
    templateUrl: 'seo.component.html'
})

export class SeoComponent implements OnInit {

    constructor(private productService: ProductService) {
    }

    get selected(): Product { return this.productService.product; }

    ngOnInit() {
        // const productId = this.selected.productId;
    }
}
