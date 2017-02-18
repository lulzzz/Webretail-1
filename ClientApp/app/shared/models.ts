// Classes

export class Login {
  constructor(
    public username: string,
    public password: string) { }
}

export class Account {
  public accountId: number;
  public accountName: string;
  public accountLastname: string;
  public accountEmail: string;
  public accountPassword: string;
  public isAdmin: boolean;
  public updated: Date;

  constructor() {
    this.accountId = 0;
    this.accountName = '';
    this.accountLastname = '';
    this.accountEmail = '';
    this.accountPassword = '';
    this.updated = new Date();
  }
}

export class Brand {
  public brandId: number;
  public brandName: string;

  constructor() {
    this.brandId = 0;
    this.brandName = '';
  }
}

export class Category {
  public categoryId: number;
  public categoryName: string;
  public isPrimary: boolean;

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.isPrimary = false;
  }
}

export class Product {
  public productId: number;
  public productCode: string;
  public productName: string;
  public productUm: string;
  public productPrice: number;
  public brand: Brand;
  public category: string;
  public categories: ProductCategory[];
  public attributes: ProductAttribute[];
  public articles: Article[];
  public updated: Date;

  constructor() {
    this.productId = 0;
    this.productCode = '';
    this.productName = '';
    this.productUm = '';
    this.productPrice = 0.0;
    this.brand = new Brand();
    this.category = '';
    this.categories = [];
    this.attributes = [];
    this.articles = [];
    this.updated = new Date();
  }
}

export class Article {
  public articleId: number;
  public barcode: string;
  public attributeValues: ArticleAttributeValue[];
  public updated: Date;

  constructor() {
    this.articleId = 0;
    this.barcode = '';
    this.attributeValues = [];
    this.updated = new Date();
  }
}

export class Attribute {
  constructor(
    public attributeId: number,
    public attributeName: string) { }
}

export class AttributeValue {
  constructor(
    public attributeId: number,
    public attributeValueId: number,
    public attributeValueCode: string,
    public attributeValueName: string) { }
}


// Interfaces

export interface Token {
    token: string;
    role: number;
    expiry: Date;
}

export interface ProductCategory {
  productId: number;
  category: Category;
}

export interface ProductAttribute {
  productAttributeId: number;
  productId: number;
  attribute: Attribute;
  attributeValues: ProductAttributeValue[];
}

export interface ProductAttributeValue {
  productAttributeId: number;
  attributeValue: AttributeValue;
}

export interface ArticleAttributeValue {
  articleId: number;
  attributeValue: AttributeValue;
}
