// Classes

export class Login {
  constructor(
    public username: string,
    public password: string) { }
}

export class Account {
  public uniqueID: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public username: string;
  public password: string;
  public isAdmin: boolean;

  constructor() {
    this.uniqueID = '';
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.isAdmin = false;
  }
}

export class Store {
  public storeId: number;
  public storeName: string;
  public storeAddress: string;
  public storeCity: string;
  public storeZip: string;
  public storeCountry: string;

  constructor() {
    this.storeId = 0;
    this.storeName = '';
    this.storeAddress = '';
    this.storeCity = '';
    this.storeZip = '';
    this.storeCountry = '';
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
  public sellingPrice: number;
  public purchasePrice: number;
  public brand: Brand;
  public categories: ProductCategory[];
  public attributes: ProductAttribute[];
  public articles: Article[];
  public isActive: boolean;
  public created: Date;
  public updated: Date;

  constructor() {
    this.productId = 0;
    this.productCode = '';
    this.productName = '';
    this.productUm = '';
    this.sellingPrice = 0;
    this.purchasePrice = 0;
    this.brand = new Brand();
    this.categories = [];
    this.attributes = [];
    this.articles = [];
    this.isActive = false;
    this.created = new Date();
    this.updated = new Date();
  }
}

export class Article {
  public articleId: number;
  public barcode: string;
  public quantity: number;
  public booked: number;
  public attributeValues: ArticleAttributeValue[];

  constructor() {
    this.articleId = 0;
    this.barcode = '';
    this.quantity = 0;
    this.booked = 0;
    this.attributeValues = [];
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

export class Causal {
  public causalId: number;
  public causalName: string;
  public quantity: number;
  public booked: number;

  constructor() {
    this.causalId = 0;
    this.causalName = '';
    this.quantity = 0;
    this.booked = 0;
  }
}

export class Movement {
  public movementId: number;
  //public storeId: number;
  //public causalId: number;
  public store: Store;
  public causal: Causal;
  public committed: boolean;
  public movementDesc: string;
  public movementNote: string;
  public movementUser: string;
  public created: Date;
  public updated: Date;

  constructor() {
    this.movementId = 0;
    //this.storeId = 0;
    //this.causalId = 0;
    this.store = new Store();
    this.causal = new Causal();
    this.committed = false;
    this.movementDesc = '';
    this.movementNote = '';
    this.movementUser = '';
    this.created = new Date();
    this.updated = new Date();
  }
}

export class MovementArticle {
  public movementArticleId: number;
  public movementId: number;
  public barcode: string;
  public product: Product;
  public quantity: number;
  public created: Date;
  public updated: Date;

  constructor() {
    this.movementArticleId = 0;
    this.movementId = 0;
    this.barcode = '';
    this.product = new Product();
    this.quantity = 1.0;
    this.created = new Date();
    this.updated = new Date();
  }
}

export class Customer {
  public customerId: number;
  public customerFirtname: string;
  public customerLastname: string;
  public customerEmail: string;
  public customerPhone: string;
  public customerAddress: string;
  public customerCity: string;
  public customerZip: string;
  public customerCountry: string;
  public customerFiscalCode: string;
  public customerVatNumber: string;

  constructor() {
    this.customerId = 0;
    this.customerFirtname = '';
    this.customerLastname = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.customerAddress = '';
    this.customerCity = '';
    this.customerZip = '';
    this.customerCountry = '';
    this.customerFiscalCode = '';
    this.customerVatNumber = '';
  }
}

// Interfaces

export interface Token {
    error: string;
    login: string;
    token: string;
    role: string;
}

export interface ProductCategory {
  //productCategoryId: number;
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
  //productAttributeValueId: number;
  productAttributeId: number;
  attributeValue: AttributeValue;
}

export interface ArticleAttributeValue {
  //articleAttributeValueId: number;
  //articleId: number;
  attributeValueId: number;
  //attributeValue: AttributeValue;
}
