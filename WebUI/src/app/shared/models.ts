// Classes

export class Login {
  constructor(
    public email: string,
    public password: string) { }
}

export class Store {
  public storeId: number;
  public storeName: string;
  public storeAddress: string;
  public storeCity: string;
  public storeZip: string;
  public storeCountry: string;
  public updatedAt: number;

  constructor() {
    this.storeId = 0;
    this.storeName = '';
    this.storeAddress = '';
    this.storeCity = '';
    this.storeZip = '';
    this.storeCountry = '';
    this.updatedAt = 0;
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
  public categoryIsPrimary: boolean;
  public translations: Translation[];

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryIsPrimary = false;
    this.translations = [];
  }
}

export class Media {
  constructor(
    public name: string,
    public url: string,
    public number: number) { }
}

export class Translation {
  constructor(
    public country: string,
    public value: string) { }
}

export class Product {
  public productId: number;
  public productCode: string;
  public productName: string;
  public productUm: string;
  public productSellingPrice: number;
  public productPurchasePrice: number;
  public medias: Media[];
  public translations: Translation[];
  public discount?: Discount;
  public brand: Brand;
  public categories: ProductCategory[];
  public attributes: ProductAttribute[];
  public articles: Article[];
  public productIsActive: boolean;
  public productCreated: Date;
  public updatedAt: number;

  constructor() {
    this.productId = 0;
    this.productCode = '';
    this.productName = '';
    this.productUm = '';
    this.productSellingPrice = 0;
    this.productPurchasePrice = 0;
    this.medias = [];
    this.translations = [];
    this.categories = [];
    this.attributes = [];
    this.articles = [];
    this.productIsActive = false;
    this.productCreated = new Date();
    this.updatedAt = 0;
  }
}

export class Article {
  public articleId: number;
  public articleBarcode: string;
  public quantity: number;
  public booked: number;
  public attributeValues: ArticleAttributeValue[];

  constructor() {
    this.articleId = 0;
    this.articleBarcode = '';
    this.quantity = 0;
    this.booked = 0;
    this.attributeValues = [];
  }
}

export class Attribute {
  constructor(
    public attributeId: number,
    public attributeName: string,
    public translations: Translation[]
  ) { }
}

export class AttributeValue {
  constructor(
    public attributeId: number,
    public attributeValueId: number,
    public attributeValueCode: string,
    public attributeValueName: string,
    public translations: Translation[]
  ) { }
}

export class Causal {
  public causalId: number;
  public causalName: string;
  public causalQuantity: number;
  public causalBooked: number;
  public causalIsPos: boolean;
  public updatedAt: number;

  constructor() {
    this.causalId = 0;
    this.causalName = '';
    this.causalQuantity = 0;
    this.causalBooked = 0;
    this.causalIsPos = false;
    this.updatedAt = 0;
  }
}

export class Customer {
  public customerId: number;
  public customerName: string;
  public customerEmail: string;
  public customerPassword: string;
  public customerPhone: string;
  public customerAddress: string;
  public customerCity: string;
  public customerZip: string;
  public customerCountry: string;
  public customerFiscalCode: string;
  public customerVatNumber: string;
  public updatedAt: number;

  constructor() {
    this.customerId = 0;
    this.customerName = '';
    this.customerEmail = '';
    this.customerPassword = '';
    this.customerPhone = '';
    this.customerAddress = '';
    this.customerCity = '';
    this.customerZip = '';
    this.customerCountry = '';
    this.customerFiscalCode = '';
    this.customerVatNumber = '';
    this.updatedAt = 0;
  }
}

export class Movement {
  public movementId: number;
  public invoiceId: number;
  public movementNumber: number;
  public movementDate: Date;
  public movementDesc: string;
  public movementStore: Store;
  public movementCausal: Causal;
  public movementCustomer: Customer;
  public movementNote: string;
  public movementStatus: string;
  public movementUser: string;
  public movementDevice: string;
  public movementAmount: number;
  public movementPayment: string;
  public updatedAt: number;

  constructor() {
    this.movementId = 0;
    this.movementNumber = 0;
    this.movementDate = new Date();
    this.movementDesc = '';
    this.movementNote = '';
    this.movementStatus = 'New';
    this.movementUser = '';
    this.movementDevice = '';
    this.movementAmount = 0.0;
    this.movementPayment = '';
    this.updatedAt = 0;
  }
}

export class MovementArticle {
  public movementArticleId: number;
  public movementId: number;
  public movementArticleBarcode: string;
  public movementArticleProduct: Product;
  public movementArticleQuantity: number;
  public movementArticlePrice: number;
  public movementArticleAmount: number;

  constructor() {
    this.movementArticleId = 0;
    this.movementId = 0;
    this.movementArticleBarcode = '';
    this.movementArticleProduct = null;
    this.movementArticleQuantity = 1.0;
    this.movementArticlePrice = 0.0;
    this.movementArticleAmount = 0.0;
  }
}

export class Invoice {
  public invoiceId: number;
  public invoiceNumber: number;
  public invoiceDate: Date;
  public invoiceCustomer: Customer;
  public invoicePayment: string;
  public invoiceNote: string;
  public invoiceAmount: number;
  public invoiceUpdate: Date;

  constructor() {
    this.invoiceId = 0;
    this.invoiceNumber = 0;
    this.invoiceDate = new Date();
    this.invoicePayment = '';
    this.invoiceNote = '';
    this.invoiceAmount = 0.0;
    this.invoiceUpdate = new Date();
  }
}

export class Discount {
  public discountId: number;
  public discountName: string;
  public discountPercentage: number;
  public discountPrice: number;
  public discountStartAt: Date;
  public discountFinishAt: Date;
  public discountUpdated: Date;

  constructor() {
    this.discountId = 0;
    this.discountName = '';
    this.discountPercentage = 0;
    this.discountPrice = 0;
    this.discountUpdated = new Date();
  }
}

export class Email {
  public address: string;
  public subject: string;
  public content: string;

  constructor() {
    this.address = '';
    this.subject = '';
    this.content = '';
  }
}

export class Period {
  public start: Date;
  public finish: Date;

  constructor() {
    this.start = new Date();
    this.finish = new Date(this.start.getFullYear(), 12, 31);
  }
}

export class Basket {
  public basketId: number;
  public customerId: number;
  public basketBarcode: string;
  public basketProduct: Product;
  public basketQuantity: number;
  public basketPrice: number;
  public basketUpdated: number;

  constructor() {
    this.basketId = 0;
    this.customerId = 0;
    this.basketBarcode = '';
    this.basketQuantity = 0.0;
    this.basketPrice = 0.0;
    this.basketUpdated = 0;
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
  // productCategoryId: number;
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
  // productAttributeValueId: number;
  productAttributeId: number;
  attributeValue: AttributeValue;
}

export interface ArticleAttributeValue {
  // articleAttributeValueId: number;
  // articleId: number;
  attributeValueId: number;
  attributeValue: AttributeValue;
}

export interface ItemValue {
  value: string;
}

export interface ArticleForm {
  header: string[];
  body: ArticleItem[][];
}

export interface ArticleItem {
  id: number;
  value: string;
  stock: number;
  booked: number;
  data: number;
}
