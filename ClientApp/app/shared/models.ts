// Classes

export class Company {
  public companyId: number;
  public companyName: string;
  public companyDesc: string;
  public companyWebsite: string;
  public companyEmail: string;
  public companyPhone: string;
  public companyAddress: string;
  public companyCity: string;
  public companyZip: string;
  public companyCountry: string;
  public companyFiscalCode: string;
  public companyVatNumber: string;
  public smtpHost: string = ""
	public smtpSsl: boolean = false
	public smtpUsername: string = ""
	public smtpPassword: string = ""


  constructor() {
    this.companyId = 0;
    this.companyName = '';
    this.companyDesc = '';
    this.companyWebsite = '';
    this.companyEmail = '';
    this.companyPhone = '';
    this.companyAddress = '';
    this.companyCity = '';
    this.companyZip = '';
    this.companyCountry = '';
    this.companyFiscalCode = '';
    this.companyVatNumber = '';
	  this.smtpHost = '';
	  this.smtpSsl = false;
	  this.smtpUsername = '';
	  this.smtpPassword = '';
  }
}

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
  public movementUpdated: Date;

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

export class Device {
  public deviceId: number;
  public deviceName: string;
  public deviceToken: string;
  public store: Store;
  public deviceUpdated: Date;

  constructor() {
    this.deviceId = 0;
    this.deviceName = '';
    this.deviceToken = '';
    this.store = new Store();
    this.deviceUpdated = new Date();
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