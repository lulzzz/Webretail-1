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
  public companyCurrency: string;
  public companyFiscalCode: string;
  public companyVatNumber: string;
  public smtpHost: string;
  public smtpSsl: boolean;
  public smtpUsername: string;
  public smtpPassword: string;
  public paypalEnv: string;
  public paypalSandbox: string;
  public paypalProduction: string;
  public barcodeCounter: number;

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
    this.companyCurrency = 'EUR'
    this.companyFiscalCode = '';
    this.companyVatNumber = '';
    this.smtpHost = '';
    this.smtpSsl = false;
    this.smtpUsername = '';
    this.smtpPassword = '';
    this.paypalEnv = 'sendbox';
    this.paypalSandbox = '<sendbox client id>';
    this.paypalProduction = '<production client id>';
    this.barcodeCounter = 0;
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
  public brandMedia: Media;

  constructor() {
    this.brandId = 0;
    this.brandName = '';
    this.brandMedia = new Media('', '', 0);
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
  public productType: string;
  public productUm: string;
  public productTax: Tax;
  public price: Price;
  public discount: Discount;
  public packaging: Packaging;
  public medias: Media[];
  public translations: Translation[];
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
    this.productType = '';
    this.productUm = '';
    this.productTax = new Tax('', 0);
    this.price = new Price();
    this.discount = new Discount();
    this.packaging = new Packaging();
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
  public barcodes: Barcode[];
  public packaging: Packaging;
  public quantity: number;
  public booked: number;
  public attributeValues: ArticleAttributeValue[];

  constructor() {
    this.articleId = 0;
    this.barcodes = [];
    this.packaging = new Packaging();
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

export class TagGroup {
  constructor(
    public tagGroupId: number,
    public tagGroupName: string,
    public translations: Translation[],
    public values: TagValue[]
  ) { }
}

export class TagValue {
  constructor(
    public tagGroupId: number,
    public tagValueId: number,
    public tagValueCode: string,
    public tagValueName: string,
    public translations: Translation[]
  ) { }
}

export class Price {
  public selling: number;
  public purchase: number;
  constructor() {
    this.selling = 0;
    this.purchase = 0;
  }
}

export class Tax {
  constructor(
    public name: string,
    public value: number,
  ) { }
}

export class Packaging {
  public weight: number;
  public length: number;
  public width: number;
  public height: number;
  constructor() {
    this.weight = 0;
    this.length = 0;
    this.width = 0;
    this.height = 0;
  }
}

export class Publication {
  public publicationId: number;
  public productId: number;
  public publicationFeatured: boolean;
  public publicationNew: boolean;
  public publicationStartAt: Date;
  public publicationFinishAt: Date;
  public publicationUpdated: Date;

  constructor(productId: number) {
    this.publicationId = 0;
    this.productId = productId;
    this.publicationFeatured = false;
    this.publicationNew = false;
  }}

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

export class Registry {
  public registryId: number;
  public registryName: string;
  public registryEmail: string;
  public registryPassword: string;
  public registryPhone: string;
  public registryAddress: string;
  public registryCity: string;
  public registryZip: string;
  public registryProvince: string;
  public registryCountry: string;
  public registryFiscalCode: string;
  public registryVatNumber: string;
  public updatedAt: number;

  constructor() {
    this.registryId = 0;
    this.registryName = '';
    this.registryEmail = '';
    this.registryPassword = '';
    this.registryPhone = '';
    this.registryAddress = '';
    this.registryCity = '';
    this.registryZip = '';
    this.registryProvince = '';
    this.registryCountry = '';
    this.registryFiscalCode = '';
    this.registryVatNumber = '';
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
  public movementRegistry: Registry;
  public movementNote: string;
  public movementStatus: string;
  public movementUser: string;
  public movementDevice: string;
  public movementTags: Tag[];
  public movementPayment: string;
  public movementShipping: string;
  public movementShippingCost: number;
  public movementAmount: number;
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
    this.movementTags = [];
    this.movementPayment = '';
    this.movementShipping = '';
    this.movementShippingCost = 0.0;
    this.movementAmount = 0.0;
    this.updatedAt = 0;
  }
}

export class MovementArticle {
  public movementArticleId: number;
  public movementId: number;
  public movementArticleBarcode: string;
  public movementArticleProduct: Product;
  public movementArticleQuantity: number;
  public movementArticleDelivered: number;
  public movementArticlePrice: number;
  public movementArticleAmount: number;

  constructor() {
    this.movementArticleId = 0;
    this.movementId = 0;
    this.movementArticleBarcode = '';
    this.movementArticleProduct = null;
    this.movementArticleQuantity = 1.0;
    this.movementArticleDelivered = 0.0;
    this.movementArticlePrice = 0.0;
    this.movementArticleAmount = 0.0;
  }
}

export class Invoice {
  public invoiceId: number;
  public invoiceNumber: number;
  public invoiceDate: Date;
  public invoiceRegistry: Registry;
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
  public updatedAt: number;

  constructor() {
    this.deviceId = 0;
    this.deviceName = '';
    this.deviceToken = '';
    this.store = new Store();
    this.updatedAt = 0;
  }
}

export class PdfDocument {
  public address: string;
  public subject: string;
  public content: string;
  public size: string;
  public zoom: string;

  constructor() {
    this.address = '';
    this.subject = '';
    this.content = '';
    this.size = 'A4';
    this.zoom = '0.53';
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
  medias: Media[];
}

export interface Barcode {
  barcode: string;
  tags: Tag[];
  price: Price;
  discount: Discount;
}

export interface Cost {
  value: number;
}

export interface Tag {
  groupId: number;
  groupName: string;
  valueId: number;
  valueName: string;
}

export interface ItemValue {
  value: string;
}

export interface Item {
  id: string;
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
