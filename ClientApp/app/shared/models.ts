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
  public categoryIsPrimary: boolean;

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryIsPrimary = false;
  }
}

export class Product {
  public productId: number;
  public productCode: string;
  public productName: string;
  public productUm: string;
  public productSellingPrice: number;
  public productPurchasePrice: number;
  public discount?: Discount;
  public brand: Brand;
  public categories: ProductCategory[];
  public attributes: ProductAttribute[];
  public articles: Article[];
  public productIsActive: boolean;
  public productCreated: Date;
  public productUpdated: Date;

  constructor() {
    this.productId = 0;
    this.productCode = '';
    this.productName = '';
    this.productUm = '';
    this.productSellingPrice = 0;
    this.productPurchasePrice = 0;
    this.brand = new Brand();
    this.categories = [];
    this.attributes = [];
    this.articles = [];
    this.productIsActive = false;
    this.productCreated = new Date();
    this.productUpdated = new Date();
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
  public causalQuantity: number;
  public causalBooked: number;
  public causalIsPos: boolean;

  constructor() {
    this.causalId = 0;
    this.causalName = '';
    this.causalQuantity = 0;
    this.causalBooked = 0;
    this.causalIsPos = false;
  }
}

export class Customer {
  public customerId: number;
  public customerName: string;
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
    this.customerName = '';
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

export class Movement {
  public movementId: number;
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
  public movementUpdated: Date;

  constructor() {
    this.movementId = 0;
    this.movementStore = new Store();
    this.movementCausal = new Causal();
    this.movementCustomer = new Customer();
    this.movementNumber = 0;
    this.movementDate = new Date();
    this.movementDesc = '';
    this.movementNote = '';
    this.movementStatus = 'New';
    this.movementUser = '';
    this.movementDevice = '';
    this.movementUpdated = new Date();
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
    this.movementArticleProduct = new Product();
    this.movementArticleQuantity = 1.0;
    this.movementArticlePrice = 0.0;
    this.movementArticleAmount = 0.0;
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

export class DiscountProduct {
  public discountProductId: number;
  public discountId: number;
  public discountProduct: Product;

  constructor() {
    this.discountProductId = 0;
    this.discountId = 0;
    this.discountProduct = new Product();
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

export interface MovementStatus {
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