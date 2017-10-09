webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!accounts\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"accounts\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"uniqueID\" header=\"Id\" [sortable]=\"true\"></p-column>\n        <p-column field=\"username\" header=\"Username\" [sortable]=\"true\"></p-column>\n        <p-column field=\"firstname\" header=\"Name\" [sortable]=\"true\"></p-column>\n        <p-column field=\"lastname\" header=\"Lastname\" [sortable]=\"true\"></p-column>\n        <p-column field=\"email\" header=\"Email\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Account</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"selected\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.uniqueID}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"firstname\">Firstname</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"firstname\" [(ngModel)]=\"selected.firstname\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['firstname'].valid&&dataform.controls['firstname'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"lastname\">Lastname</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"lastname\" [(ngModel)]=\"selected.lastname\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['lastname'].valid&&dataform.controls['lastname'].dirty\">\n                            <i class=\"fa fa-close\"></i> Lastname is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"email\">Email</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"email\" [(ngModel)]=\"selected.email\" type=\"email\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['email'].valid&&dataform.controls['email'].dirty\">\n                            <i class=\"fa fa-close\"></i> Email is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"username\">Username</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"username\" [(ngModel)]=\"selected.username\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['username'].valid&&dataform.controls['username'].dirty\">\n                            <i class=\"fa fa-close\"></i> Username is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"password\">Password</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"password\" [(ngModel)]=\"selected.password\" type=\"password\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['password'].valid&&dataform.controls['password'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['password'].errors['required']\">Password is required</span>\n                            <span *ngIf=\"dataform.controls['password'].errors['minlength']\">Must be longer than 6 characters</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"isAdmin\">Administrator</label></div>\n                    <div class=\"ui-grid-col-8\"><p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"isAdmin\" [(ngModel)]=\"selected.isAdmin\"></p-inputSwitch></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.uniqueID!=''\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n </div>"

/***/ }),

/***/ "../../../../../src/app/account/account.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var account_service_1 = __webpack_require__("../../../../../src/app/services/account.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var AccountComponent = (function () {
    function AccountComponent(sessionService, accountService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.accountService = accountService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Accounts';
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(true);
        this.dataform = this.fb.group({
            'firstname': new forms_1.FormControl('', forms_1.Validators.required),
            'lastname': new forms_1.FormControl('', forms_1.Validators.required),
            'email': new forms_1.FormControl('', forms_1.Validators.required),
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'password': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])),
            'isAdmin': new forms_1.FormControl('', forms_1.Validators.required),
        });
        this.accountService.getAll()
            .subscribe(function (result) {
            _this.accounts = result;
            _this.totalRecords = _this.accounts.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(AccountComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.uniqueID === ''; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountComponent.prototype, "selectedIndex", {
        get: function () { return this.accounts.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    AccountComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    AccountComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    AccountComponent.prototype.addClick = function () {
        this.selected = new models_1.Account();
        this.displayPanel = true;
    };
    AccountComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.accountService
                .create(this.selected)
                .subscribe(function (result) {
                _this.accounts.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.accountService
                .update(this.selected.uniqueID, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    AccountComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this account?',
            accept: function () {
                _this.accountService
                    .delete(_this.selected.uniqueID)
                    .subscribe(function (result) {
                    _this.accounts.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'account-component',
        template: __webpack_require__("../../../../../src/app/account/account.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], AccountComponent);
exports.AccountComponent = AccountComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=account.component.js.map

/***/ }),

/***/ "../../../../../src/app/account/myinfo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\n    <form [formGroup]=\"dataform\">\n        <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"myinfo\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label>{{myinfo.isAdmin ? 'Administrator' : 'User'}}</label></div>\n                <div class=\"ui-grid-col-8\">{{myinfo.uniqueID}}</div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"firstname\">Firstname</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"firstname\" [(ngModel)]=\"myinfo.firstname\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['firstname'].valid&&dataform.controls['firstname'].dirty\">\n                        <i class=\"fa fa-close\"></i> Name is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"lastname\">Lastname</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"lastname\" [(ngModel)]=\"myinfo.lastname\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['lastname'].valid&&dataform.controls['lastname'].dirty\">\n                        <i class=\"fa fa-close\"></i> Lastname is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"email\">Email</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"email\" [(ngModel)]=\"myinfo.email\" type=\"email\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['email'].valid&&dataform.controls['email'].dirty\">\n                        <i class=\"fa fa-close\"></i> Email is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\"><h3>Authentication</h3></div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"username\">Username</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"username\" [(ngModel)]=\"myinfo.username\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['username'].valid&&dataform.controls['username'].dirty\">\n                        <i class=\"fa fa-close\"></i> Username is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"password\">Password</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"password\" [(ngModel)]=\"myinfo.password\" type=\"password\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['password'].valid&&dataform.controls['password'].dirty\">\n                        <i class=\"fa fa-close\"></i>\n                        <span *ngIf=\"dataform.controls['password'].errors['required']\">Password is required</span>\n                        <span *ngIf=\"dataform.controls['password'].errors['minlength']\">Must be longer than 6 characters</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label>Facebook</label></div>\n                <div class=\"ui-grid-col-8\">{{myinfo.facebookID}}</div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label>Google</label></div>\n                <div class=\"ui-grid-col-8\">{{myinfo.googleID}}</div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-8\"></div>\n                <div class=\"ui-grid-col-4\">\n                    <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                </div>\n            </div>\n        </div>\n    </form>\n </div>"

/***/ }),

/***/ "../../../../../src/app/account/myinfo.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var account_service_1 = __webpack_require__("../../../../../src/app/services/account.service.ts");
var MyInfoComponent = (function () {
    function MyInfoComponent(sessionService, accountService, fb) {
        this.sessionService = sessionService;
        this.accountService = accountService;
        this.fb = fb;
        sessionService.title = 'My Info';
    }
    MyInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.getCredentials()
            .subscribe(function (p) {
            _this.accountService.getById(p.uniqueID)
                .subscribe(function (account) {
                _this.myinfo = account;
            });
        }, function (onerror) { return alert(onerror); });
        this.dataform = this.fb.group({
            'firstname': new forms_1.FormControl('', forms_1.Validators.required),
            'lastname': new forms_1.FormControl('', forms_1.Validators.required),
            'email': new forms_1.FormControl('', forms_1.Validators.required),
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'password': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)]))
        });
    };
    MyInfoComponent.prototype.saveClick = function () {
        this.accountService
            .update(this.myinfo.uniqueID, this.myinfo)
            .subscribe(function (result) { });
    };
    return MyInfoComponent;
}());
MyInfoComponent = __decorate([
    core_1.Component({
        selector: 'myinfo-component',
        template: __webpack_require__("../../../../../src/app/account/myinfo.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object])
], MyInfoComponent);
exports.MyInfoComponent = MyInfoComponent;
var _a, _b, _c;
//# sourceMappingURL=myinfo.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<navigation></navigation>\r\n\r\n<div class=\"container-fluid\">\r\n\r\n    <router-outlet></router-outlet>\r\n\r\n    <customfooter></customfooter>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-component',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var animations_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var app_routes_1 = __webpack_require__("../../../../../src/app/app.routes.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var navigation_component_1 = __webpack_require__("../../../../../src/app/shared/navigation.component.ts");
var footer_component_1 = __webpack_require__("../../../../../src/app/shared/footer.component.ts");
var article_picker_component_1 = __webpack_require__("../../../../../src/app/shared/article-picker.component.ts");
var product_picker_component_1 = __webpack_require__("../../../../../src/app/shared/product-picker.component.ts");
var movement_picker_component_1 = __webpack_require__("../../../../../src/app/shared/movement-picker.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var company_component_1 = __webpack_require__("../../../../../src/app/company/company.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/login/register.component.ts");
var account_component_1 = __webpack_require__("../../../../../src/app/account/account.component.ts");
var myinfo_component_1 = __webpack_require__("../../../../../src/app/account/myinfo.component.ts");
var attribute_component_1 = __webpack_require__("../../../../../src/app/attribute/attribute.component.ts");
var brand_component_1 = __webpack_require__("../../../../../src/app/brand/brand.component.ts");
var category_component_1 = __webpack_require__("../../../../../src/app/category/category.component.ts");
var causal_component_1 = __webpack_require__("../../../../../src/app/causal/causal.component.ts");
var customer_component_1 = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
var store_component_1 = __webpack_require__("../../../../../src/app/store/store.component.ts");
var products_component_1 = __webpack_require__("../../../../../src/app/product/products.component.ts");
var product_component_1 = __webpack_require__("../../../../../src/app/product/product.component.ts");
var import_component_1 = __webpack_require__("../../../../../src/app/product/import.component.ts");
var stock_component_1 = __webpack_require__("../../../../../src/app/product/stock.component.ts");
var publication_component_1 = __webpack_require__("../../../../../src/app/product/publication.component.ts");
var movements_component_1 = __webpack_require__("../../../../../src/app/movement/movements.component.ts");
var movement_component_1 = __webpack_require__("../../../../../src/app/movement/movement.component.ts");
var document_component_1 = __webpack_require__("../../../../../src/app/movement/document.component.ts");
var discounts_component_1 = __webpack_require__("../../../../../src/app/discount/discounts.component.ts");
var discount_component_1 = __webpack_require__("../../../../../src/app/discount/discount.component.ts");
var invoices_component_1 = __webpack_require__("../../../../../src/app/invoice/invoices.component.ts");
var invoice_component_1 = __webpack_require__("../../../../../src/app/invoice/invoice.component.ts");
var invoicedocument_component_1 = __webpack_require__("../../../../../src/app/invoice/invoicedocument.component.ts");
var device_component_1 = __webpack_require__("../../../../../src/app/device/device.component.ts");
var receipts_component_1 = __webpack_require__("../../../../../src/app/report/receipts.component.ts");
var sales_component_1 = __webpack_require__("../../../../../src/app/report/sales.component.ts");
var statistics_component_1 = __webpack_require__("../../../../../src/app/report/statistics.component.ts");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var company_service_1 = __webpack_require__("../../../../../src/app/services/company.service.ts");
var account_service_1 = __webpack_require__("../../../../../src/app/services/account.service.ts");
var attribute_service_1 = __webpack_require__("../../../../../src/app/services/attribute.service.ts");
var brand_service_1 = __webpack_require__("../../../../../src/app/services/brand.service.ts");
var category_service_1 = __webpack_require__("../../../../../src/app/services/category.service.ts");
var causal_service_1 = __webpack_require__("../../../../../src/app/services/causal.service.ts");
var customer_service_1 = __webpack_require__("../../../../../src/app/services/customer.service.ts");
var store_service_1 = __webpack_require__("../../../../../src/app/services/store.service.ts");
var device_service_1 = __webpack_require__("../../../../../src/app/services/device.service.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var discount_service_1 = __webpack_require__("../../../../../src/app/services/discount.service.ts");
var invoice_service_1 = __webpack_require__("../../../../../src/app/services/invoice.service.ts");
var statistic_service_1 = __webpack_require__("../../../../../src/app/services/statistic.service.ts");
var publication_service_1 = __webpack_require__("../../../../../src/app/services/publication.service.ts");
var import_service_1 = __webpack_require__("../../../../../src/app/services/import.service.ts");
var category_filter_pipe_1 = __webpack_require__("../../../../../src/app/pipes/category-filter.pipe.ts");
var price_filter_pipe_1 = __webpack_require__("../../../../../src/app/pipes/price-filter.pipe.ts");
var articleinfo_pipe_1 = __webpack_require__("../../../../../src/app/pipes/articleinfo.pipe.ts");
var article_filter_pipe_1 = __webpack_require__("../../../../../src/app/pipes/article-filter.pipe.ts");
var date_filter_pipe_1 = __webpack_require__("../../../../../src/app/pipes/date-filter.pipe.ts");
var period_filter_pipe_1 = __webpack_require__("../../../../../src/app/pipes/period-filter.pipe.ts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule, router_1.RouterModule, http_1.HttpModule, platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule,
            forms_1.FormsModule, forms_1.ReactiveFormsModule,
            primeng_1.DataTableModule, primeng_1.SharedModule, primeng_1.PaginatorModule,
            primeng_1.MultiSelectModule, primeng_1.DropdownModule, primeng_1.SliderModule, primeng_1.TreeModule,
            primeng_1.ButtonModule, primeng_1.InputTextModule, primeng_1.InputSwitchModule,
            primeng_1.PanelModule, primeng_1.SplitButtonModule, primeng_1.PickListModule, primeng_1.GrowlModule,
            primeng_1.ConfirmDialogModule, primeng_1.ToolbarModule, primeng_1.SelectButtonModule,
            primeng_1.ChipsModule, primeng_1.InputTextareaModule, primeng_1.FileUploadModule,
            primeng_1.ContextMenuModule, primeng_1.TooltipModule, primeng_1.CalendarModule, primeng_1.ChartModule,
            primeng_1.CarouselModule, primeng_1.SpinnerModule, primeng_1.StepsModule,
            app_routes_1.AppRoutes
        ],
        declarations: [
            category_filter_pipe_1.CategoryFilterPipe,
            price_filter_pipe_1.PriceFilterPipe,
            articleinfo_pipe_1.ArticleInfoPipe,
            article_filter_pipe_1.ArticleFilterPipe,
            date_filter_pipe_1.DateFilterPipe,
            period_filter_pipe_1.PeriodFilterPipe,
            app_component_1.AppComponent,
            navigation_component_1.NavigationComponent,
            footer_component_1.FooterComponent,
            article_picker_component_1.ArticlePickerComponent,
            product_picker_component_1.ProductPickerComponent,
            movement_picker_component_1.MovementPickerComponent,
            home_component_1.HomeComponent,
            company_component_1.CompanyComponent,
            login_component_1.LoginComponent,
            register_component_1.RegisterComponent,
            account_component_1.AccountComponent,
            myinfo_component_1.MyInfoComponent,
            attribute_component_1.AttributeComponent,
            brand_component_1.BrandComponent,
            category_component_1.CategoryComponent,
            causal_component_1.CausalComponent,
            customer_component_1.CustomerComponent,
            store_component_1.StoreComponent,
            products_component_1.ProductsComponent,
            product_component_1.ProductComponent,
            stock_component_1.StockComponent,
            publication_component_1.PublicationComponent,
            movements_component_1.MovementsComponent,
            movement_component_1.MovementComponent,
            document_component_1.DocumentComponent,
            discounts_component_1.DiscountsComponent,
            discount_component_1.DiscountComponent,
            invoices_component_1.InvoicesComponent,
            invoice_component_1.InvoiceComponent,
            invoicedocument_component_1.InvoiceDocumentComponent,
            device_component_1.DeviceComponent,
            receipts_component_1.ReportReceiptsComponent,
            sales_component_1.ReportSalesComponent,
            statistics_component_1.StatisticsComponent,
            import_component_1.ImportComponent
        ],
        providers: [
            session_service_1.SessionService,
            company_service_1.CompanyService,
            account_service_1.AccountService,
            attribute_service_1.AttributeService,
            brand_service_1.BrandService,
            category_service_1.CategoryService,
            causal_service_1.CausalService,
            customer_service_1.CustomerService,
            store_service_1.StoreService,
            device_service_1.DeviceService,
            product_service_1.ProductService,
            movement_service_1.MovementService,
            discount_service_1.DiscountService,
            invoice_service_1.InvoiceService,
            primeng_1.ConfirmationService,
            statistic_service_1.StatisticService,
            publication_service_1.PublicationService,
            import_service_1.ImportService
        ],
        exports: [
            article_picker_component_1.ArticlePickerComponent,
            product_picker_component_1.ProductPickerComponent,
            movement_picker_component_1.MovementPickerComponent,
            category_filter_pipe_1.CategoryFilterPipe,
            price_filter_pipe_1.PriceFilterPipe,
            articleinfo_pipe_1.ArticleInfoPipe,
            article_filter_pipe_1.ArticleFilterPipe,
            date_filter_pipe_1.DateFilterPipe,
            period_filter_pipe_1.PeriodFilterPipe
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var company_component_1 = __webpack_require__("../../../../../src/app/company/company.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
// import { RegisterComponent } from './login/register.component';
var account_component_1 = __webpack_require__("../../../../../src/app/account/account.component.ts");
var myinfo_component_1 = __webpack_require__("../../../../../src/app/account/myinfo.component.ts");
var attribute_component_1 = __webpack_require__("../../../../../src/app/attribute/attribute.component.ts");
var brand_component_1 = __webpack_require__("../../../../../src/app/brand/brand.component.ts");
var category_component_1 = __webpack_require__("../../../../../src/app/category/category.component.ts");
var causal_component_1 = __webpack_require__("../../../../../src/app/causal/causal.component.ts");
var customer_component_1 = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
var store_component_1 = __webpack_require__("../../../../../src/app/store/store.component.ts");
var products_component_1 = __webpack_require__("../../../../../src/app/product/products.component.ts");
var product_component_1 = __webpack_require__("../../../../../src/app/product/product.component.ts");
var import_component_1 = __webpack_require__("../../../../../src/app/product/import.component.ts");
var stock_component_1 = __webpack_require__("../../../../../src/app/product/stock.component.ts");
var publication_component_1 = __webpack_require__("../../../../../src/app/product/publication.component.ts");
var movements_component_1 = __webpack_require__("../../../../../src/app/movement/movements.component.ts");
var movement_component_1 = __webpack_require__("../../../../../src/app/movement/movement.component.ts");
var document_component_1 = __webpack_require__("../../../../../src/app/movement/document.component.ts");
var discounts_component_1 = __webpack_require__("../../../../../src/app/discount/discounts.component.ts");
var discount_component_1 = __webpack_require__("../../../../../src/app/discount/discount.component.ts");
var invoices_component_1 = __webpack_require__("../../../../../src/app/invoice/invoices.component.ts");
var invoice_component_1 = __webpack_require__("../../../../../src/app/invoice/invoice.component.ts");
var invoicedocument_component_1 = __webpack_require__("../../../../../src/app/invoice/invoicedocument.component.ts");
var device_component_1 = __webpack_require__("../../../../../src/app/device/device.component.ts");
var receipts_component_1 = __webpack_require__("../../../../../src/app/report/receipts.component.ts");
var sales_component_1 = __webpack_require__("../../../../../src/app/report/sales.component.ts");
var statistics_component_1 = __webpack_require__("../../../../../src/app/report/statistics.component.ts");
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'company', component: company_component_1.CompanyComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    // { path: 'login/register', component: RegisterComponent },
    { path: 'account', component: account_component_1.AccountComponent },
    { path: 'myinfo', component: myinfo_component_1.MyInfoComponent },
    { path: 'store', component: store_component_1.StoreComponent },
    { path: 'brand', component: brand_component_1.BrandComponent },
    { path: 'category', component: category_component_1.CategoryComponent },
    { path: 'attribute', component: attribute_component_1.AttributeComponent },
    { path: 'causal', component: causal_component_1.CausalComponent },
    { path: 'customer', component: customer_component_1.CustomerComponent },
    { path: 'product', component: products_component_1.ProductsComponent },
    { path: 'product/:id', component: product_component_1.ProductComponent },
    { path: 'product/:id/stock', component: stock_component_1.StockComponent },
    { path: 'product/:id/publication', component: publication_component_1.PublicationComponent },
    { path: 'movement', component: movements_component_1.MovementsComponent },
    { path: 'movement/:id', component: movement_component_1.MovementComponent },
    { path: 'movement/document/:id', component: document_component_1.DocumentComponent },
    { path: 'discount', component: discounts_component_1.DiscountsComponent },
    { path: 'discount/:id', component: discount_component_1.DiscountComponent },
    { path: 'invoice', component: invoices_component_1.InvoicesComponent },
    { path: 'invoice/:id', component: invoice_component_1.InvoiceComponent },
    { path: 'invoice/document/:id', component: invoicedocument_component_1.InvoiceDocumentComponent },
    { path: 'device', component: device_component_1.DeviceComponent },
    { path: 'report/receipts', component: receipts_component_1.ReportReceiptsComponent },
    { path: 'report/sales', component: sales_component_1.ReportSalesComponent },
    { path: 'report/statistics', component: statistics_component_1.StatisticsComponent },
    { path: 'import', component: import_component_1.ImportComponent }
];
exports.AppRoutes = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/attribute/attribute.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!attributes||selected&&selected.attributeId>0&&!values\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n     <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n            <button pButton type=\"button\" label=\"Edit\" title=\"Edit item\" (click)=\"editClick()\" class=\"ui-button-primary\" icon=\"fa-edit\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"attributes\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"attributeId\" header=\"Id\" [style]=\"{'width':'10%'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"attributeName\" header=\"Name\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Attribute</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"selected\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.attributeId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.attributeName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.attributeId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n    \n</div>\n<br>\n<div class=\"container-fluid\">\n    \n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalValues}} values\" title=\"Add value\" (click)=\"addValueClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanelValue\" [responsive]=\"true\" [value]=\"values\"\n        selectionMode=\"single\" [(selection)]=\"selectedValue\" (onRowSelect)=\"onRowValueSelect($event)\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"attributeValueId\" header=\"Id\" [style]=\"{'width':'100px'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"attributeValueCode\" header=\"Code\" [sortable]=\"true\"></p-column>\n        <p-column field=\"attributeValueName\" header=\"Name\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanelValue\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Attribute Value</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeValueClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataformValue\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selectedValue.attributeValueId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"id\">Attribute</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.attributeName}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"code\">Code</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"code\" [(ngModel)]=\"selectedValue.attributeValueCode\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataformValue.controls['code'].valid&&dataformValue.controls['code'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataformValue.controls['code'].errors['required']\">Code is required</span>\n                            <span *ngIf=\"dataformValue.controls['code'].errors['maxlength']\">Must be shorter than 6 characters</span>\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selectedValue.attributeValueName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataformValue.controls['name'].valid&&dataformValue.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selectedValue.attributeValueId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteValueClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveValueClick()\" label=\"Save\" [disabled]=\"!dataformValue.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/attribute/attribute.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var attribute_service_1 = __webpack_require__("../../../../../src/app/services/attribute.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var AttributeComponent = (function () {
    function AttributeComponent(sessionService, attributeService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.attributeService = attributeService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        this.totalValues = 0;
        sessionService.title = 'Attributes';
    }
    AttributeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.dataformValue = this.fb.group({
            'code': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(6)]),
            'name': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.attributeService
            .getAll()
            .subscribe(function (result) {
            _this.attributes = result;
            _this.totalRecords = _this.attributes.length;
        });
    };
    Object.defineProperty(AttributeComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.attributeId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeComponent.prototype, "isNewValue", {
        get: function () { return this.selectedValue == null || this.selectedValue.attributeValueId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeComponent.prototype, "selectedIndex", {
        get: function () { return this.attributes.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributeComponent.prototype, "selectedValueIndex", {
        get: function () { return this.values.indexOf(this.selectedValue); },
        enumerable: true,
        configurable: true
    });
    AttributeComponent.prototype.onRowSelect = function (event) {
        var _this = this;
        this.values = null;
        this.attributeService
            .getValueByAttributeId(this.selected.attributeId)
            .subscribe(function (result) {
            _this.values = result;
            _this.totalValues = _this.values.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    AttributeComponent.prototype.addClick = function () {
        this.selected = new models_1.Attribute(0, '', []);
        this.displayPanel = true;
    };
    AttributeComponent.prototype.editClick = function () {
        this.displayPanel = true;
    };
    AttributeComponent.prototype.closeClick = function () {
        this.displayPanel = false;
    };
    AttributeComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.attributeService
                .create(this.selected)
                .subscribe(function (result) {
                _this.attributes.push(result);
                _this.displayPanel = false;
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.attributeService
                .update(this.selected.attributeId, this.selected)
                .subscribe(function (result) {
                _this.displayPanel = false;
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    AttributeComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All values of this attribute and related articles will be deleted. Are you sure that you want to delete this attribute?',
            accept: function () {
                _this.attributeService
                    .delete(_this.selected.attributeId)
                    .subscribe(function (result) {
                    _this.attributes.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.selected = null;
                    _this.values.length = 0;
                    _this.displayPanel = false;
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    AttributeComponent.prototype.onRowValueSelect = function (event) {
        this.displayPanelValue = true;
    };
    AttributeComponent.prototype.addValueClick = function () {
        if (this.selected && this.selected.attributeId > 0) {
            this.selectedValue = new models_1.AttributeValue(this.selected.attributeId, 0, '', '', []);
            this.displayPanelValue = true;
        }
        else {
            alert('Select a attribute before add value!');
        }
    };
    AttributeComponent.prototype.editValueClick = function () {
        this.displayPanelValue = true;
    };
    AttributeComponent.prototype.closeValueClick = function () {
        this.displayPanelValue = false;
        this.selectedValue = null;
    };
    AttributeComponent.prototype.saveValueClick = function () {
        var _this = this;
        if (this.isNewValue) {
            this.attributeService
                .createValue(this.selectedValue)
                .subscribe(function (result) {
                _this.values.push(result);
                _this.closeValueClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.attributeService
                .updateValue(this.selectedValue.attributeValueId, this.selectedValue)
                .subscribe(function (result) {
                _this.closeValueClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    AttributeComponent.prototype.deleteValueClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All related articles of this attribute value will be deleted. Are you sure that you want to delete this attribute value?',
            accept: function () {
                _this.attributeService
                    .deleteValue(_this.selectedValue.attributeValueId)
                    .subscribe(function (result) {
                    _this.values.splice(_this.selectedValueIndex, 1);
                    _this.totalValues--;
                    _this.closeValueClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return AttributeComponent;
}());
AttributeComponent = __decorate([
    core_1.Component({
        selector: 'attribute-component',
        template: __webpack_require__("../../../../../src/app/attribute/attribute.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof attribute_service_1.AttributeService !== "undefined" && attribute_service_1.AttributeService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], AttributeComponent);
exports.AttributeComponent = AttributeComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=attribute.component.js.map

/***/ }),

/***/ "../../../../../src/app/brand/brand.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!brands\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"brands\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"brandId\" header=\"Id\" [style]=\"{'width':'100px'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"brandName\" header=\"Name\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Brand</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.brandId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.brandName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.brandId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/brand/brand.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var brand_service_1 = __webpack_require__("../../../../../src/app/services/brand.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var BrandComponent = (function () {
    function BrandComponent(sessionService, brandService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.brandService = brandService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Brands';
    }
    BrandComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.brandService
            .getAll()
            .subscribe(function (result) {
            _this.brands = result;
            _this.totalRecords = _this.brands.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(BrandComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.brandId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrandComponent.prototype, "selectedIndex", {
        get: function () { return this.brands.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    BrandComponent.prototype.addClick = function () {
        this.selected = new models_1.Brand();
        this.displayPanel = true;
    };
    BrandComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    BrandComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    BrandComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.brandService
                .create(this.selected)
                .subscribe(function (result) {
                _this.brands.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.brandService
                .update(this.selected.brandId, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    BrandComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All related products will be deleted. Are you sure that you want to delete this brand?',
            accept: function () {
                _this.brandService
                    .delete(_this.selected.brandId)
                    .subscribe(function (result) {
                    _this.brands.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return BrandComponent;
}());
BrandComponent = __decorate([
    core_1.Component({
        selector: 'brand-component',
        template: __webpack_require__("../../../../../src/app/brand/brand.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof brand_service_1.BrandService !== "undefined" && brand_service_1.BrandService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], BrandComponent);
exports.BrandComponent = BrandComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=brand.component.js.map

/***/ }),

/***/ "../../../../../src/app/category/category.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!categories\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"categories\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"categoryId\" header=\"Id\" [style]=\"{'width':'100px'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"categoryName\" header=\"Name\" [sortable]=\"true\"></p-column>\n        <p-column field=\"categoryIsPrimary\" header=\"Primary\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Category</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.categoryId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.categoryName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"isPrimary\">Primary</label></div>\n                    <div class=\"ui-grid-col-8\"><p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"isPrimary\" [(ngModel)]=\"selected.categoryIsPrimary\"></p-inputSwitch></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.categoryId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/category/category.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var category_service_1 = __webpack_require__("../../../../../src/app/services/category.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var CategoryComponent = (function () {
    function CategoryComponent(sessionService, categoryService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.categoryService = categoryService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Categories';
    }
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'isPrimary': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.categoryService
            .getAll()
            .subscribe(function (result) {
            _this.categories = result;
            _this.totalRecords = _this.categories.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(CategoryComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.categoryId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryComponent.prototype, "selectedIndex", {
        get: function () { return this.categories.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    CategoryComponent.prototype.addClick = function () {
        this.selected = new models_1.Category(0, '');
        this.displayPanel = true;
    };
    CategoryComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    CategoryComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    CategoryComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.categoryService
                .create(this.selected)
                .subscribe(function (result) {
                _this.categories.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.categoryService
                .update(this.selected.categoryId, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    CategoryComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All associations with the products will be deleted. Are you sure that you want to delete this category?',
            accept: function () {
                _this.categoryService
                    .delete(_this.selected.categoryId)
                    .subscribe(function (result) {
                    _this.categories.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return CategoryComponent;
}());
CategoryComponent = __decorate([
    core_1.Component({
        selector: 'category-component',
        template: __webpack_require__("../../../../../src/app/category/category.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=category.component.js.map

/***/ }),

/***/ "../../../../../src/app/causal/causal.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!causals\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n    \n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [value]=\"causals\" [responsive]=\"true\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"20\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"causalId\" header=\"Id\" [sortable]=\"true\"></p-column>\n        <p-column field=\"causalName\" header=\"Name\" [sortable]=\"true\"></p-column>\n        <p-column field=\"causalQuantity\" header=\"Stock\" [sortable]=\"true\"></p-column>\n        <p-column field=\"causalBooked\" header=\"Booked\" [sortable]=\"true\"></p-column>\n        <p-column field=\"causalIsPos\" header=\"Pos\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Causal</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.causalId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.causalName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"quantity\">Stock</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-selectButton formControlName=\"quantity\" [options]=\"operators\" [(ngModel)]=\"selected.causalQuantity\"></p-selectButton>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['quantity'].valid&&dataform.controls['quantity'].dirty\">\n                            <i class=\"fa fa-close\"></i> Stock is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"booked\">Booked</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-selectButton formControlName=\"booked\" [options]=\"operators\" [(ngModel)]=\"selected.causalBooked\"></p-selectButton>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['booked'].valid&&dataform.controls['booked'].dirty\">\n                            <i class=\"fa fa-close\"></i> Booked is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"pos\">Cash register</label></div>\n                    <div class=\"ui-grid-col-8\"><p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"pos\" [(ngModel)]=\"selected.causalIsPos\"></p-inputSwitch></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.causalId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-8\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/causal/causal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var causal_service_1 = __webpack_require__("../../../../../src/app/services/causal.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var CausalComponent = (function () {
    function CausalComponent(sessionService, causalService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.causalService = causalService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Causals';
    }
    CausalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.operators = [];
        this.operators.push({ label: '-1', value: -1 });
        this.operators.push({ label: '0', value: 0 });
        this.operators.push({ label: '+1', value: +1 });
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'quantity': new forms_1.FormControl('', forms_1.Validators.required),
            'booked': new forms_1.FormControl('', forms_1.Validators.required),
            'pos': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.causalService
            .getAll()
            .subscribe(function (result) {
            _this.causals = result;
            _this.totalRecords = _this.causals.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(CausalComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.causalId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CausalComponent.prototype, "selectedIndex", {
        get: function () { return this.causals.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    CausalComponent.prototype.addClick = function () {
        this.selected = new models_1.Causal();
        this.displayPanel = true;
    };
    CausalComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    CausalComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    CausalComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.causalService
                .create(this.selected)
                .subscribe(function (result) {
                _this.causals.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.causalService
                .update(this.selected.causalId, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    CausalComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All related movements will be deleted. Are you sure that you want to delete this causal?',
            accept: function () {
                _this.causalService
                    .delete(_this.selected.causalId)
                    .subscribe(function (result) {
                    _this.causals.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return CausalComponent;
}());
CausalComponent = __decorate([
    core_1.Component({
        selector: 'causal-component',
        template: __webpack_require__("../../../../../src/app/causal/causal.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof causal_service_1.CausalService !== "undefined" && causal_service_1.CausalService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], CausalComponent);
exports.CausalComponent = CausalComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=causal.component.js.map

/***/ }),

/***/ "../../../../../src/app/company/company.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n<img *ngIf=\"!company\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <form *ngIf=\"company\" [formGroup]=\"dataform\">\n        <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"name\" [(ngModel)]=\"company.companyName\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                        <i class=\"fa fa-close\"></i> Name is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"desc\">Description</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"desc\" [(ngModel)]=\"company.companyDesc\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"site\">Website</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"site\" [(ngModel)]=\"company.companyWebsite\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"email\">Email</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"email\" [(ngModel)]=\"company.companyEmail\" type=\"email\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['email'].valid&&dataform.controls['email'].dirty\">\n                        <i class=\"fa fa-close\"></i> Email is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"phone\">Phone</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"phone\" [(ngModel)]=\"company.companyPhone\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"address\">Address</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"address\" [(ngModel)]=\"company.companyAddress\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['address'].valid&&dataform.controls['address'].dirty\">\n                        <i class=\"fa fa-close\"></i> Address is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"city\">City</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"city\" [(ngModel)]=\"company.companyCity\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['city'].valid&&dataform.controls['city'].dirty\">\n                        <i class=\"fa fa-close\"></i> City is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"zip\">Zip</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"zip\" [(ngModel)]=\"company.companyZip\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['zip'].valid&&dataform.controls['zip'].dirty\">\n                        <i class=\"fa fa-close\"></i> Zip is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"country\">Country</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"country\" [(ngModel)]=\"company.companyCountry\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['country'].valid&&dataform.controls['country'].dirty\">\n                        <i class=\"fa fa-close\"></i> Country is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"fiscalCode\">Fiscal Code</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"fiscalCode\" [(ngModel)]=\"company.companyFiscalCode\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['fiscalCode'].valid&&dataform.controls['fiscalCode'].dirty\">\n                        <i class=\"fa fa-close\"></i> Fiscal Code is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"vatNumber\">VAT number</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"vatNumber\" [(ngModel)]=\"company.companyVatNumber\"/>\n                    <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['vatNumber'].valid&&dataform.controls['vatNumber'].dirty\">\n                        <i class=\"fa fa-close\"></i> VAT number is required\n                    </div>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\"><h3>Outgoing Mail</h3></div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"host\">Ssl</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"ssl\" [(ngModel)]=\"company.smtpSsl\"></p-inputSwitch>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"host\">Host</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"host\" [(ngModel)]=\"company.smtpHost\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"username\">Username</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"username\" [(ngModel)]=\"company.smtpUsername\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"password\">Password</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText type=\"password\" formControlName=\"password\" [(ngModel)]=\"company.smtpPassword\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\"><h3>Barcode counter</h3></div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-4\"><label for=\"host\">Number</label></div>\n                <div class=\"ui-grid-col-8\">\n                    <input pInputText formControlName=\"barcode\" [(ngModel)]=\"company.barcodeCounter\"/>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-8\"></div>\n                <div class=\"ui-grid-col-4\">\n                    <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" class=\"ui-button-success\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\"><h3>Document Header</h3></div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\">\n                    <p-fileUpload mode=\"basic\" name=\"header\" url=\"/api/media\" accept=\"image/*\" maxFileSize=\"1000000\" (onUpload)=\"onBasicUpload($event)\"></p-fileUpload>\n                </div>\n            </div>\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-12\">\n                    <img title=\"Header\" alt=\"Header not found. Upload new image size 2000×260 px\" src=\"{{header}}\" height=\"100\" width=\"100%\"/>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/company/company.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var company_service_1 = __webpack_require__("../../../../../src/app/services/company.service.ts");
var CompanyComponent = (function () {
    function CompanyComponent(sessionService, companyService, fb) {
        this.sessionService = sessionService;
        this.companyService = companyService;
        this.fb = fb;
        this.msgs = [];
        sessionService.title = 'Company';
        this.header = '/media/header.png';
    }
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'desc': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'site': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'email': new forms_1.FormControl('', forms_1.Validators.required),
            'phone': new forms_1.FormControl('', forms_1.Validators.required),
            'address': new forms_1.FormControl('', forms_1.Validators.required),
            'city': new forms_1.FormControl('', forms_1.Validators.required),
            'zip': new forms_1.FormControl('', forms_1.Validators.required),
            'country': new forms_1.FormControl('', forms_1.Validators.required),
            'fiscalCode': new forms_1.FormControl('', forms_1.Validators.required),
            'vatNumber': new forms_1.FormControl('', forms_1.Validators.required),
            'host': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'ssl': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'username': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'password': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'barcode': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.companyService.get()
            .subscribe(function (result) {
            _this.company = result;
        }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Get company', detail: onerror._body }); });
    };
    Object.defineProperty(CompanyComponent.prototype, "isNew", {
        get: function () { return this.company == null || this.company.companyId === 0; },
        enumerable: true,
        configurable: true
    });
    CompanyComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.companyService
                .create(this.company)
                .subscribe(function (result) {
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company created' });
            }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Create company', detail: onerror._body }); });
        }
        else {
            this.companyService
                .update(this.company)
                .subscribe(function (result) {
                _this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Company updated' });
            }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Update company', detail: onerror._body }); });
        }
    };
    CompanyComponent.prototype.onBasicUpload = function (event) {
        this.header = '';
        // for(let file of event.files) {
        // }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
        this.header = '/media/header.png?' + Date().length;
    };
    return CompanyComponent;
}());
CompanyComponent = __decorate([
    core_1.Component({
        selector: 'company-component',
        template: __webpack_require__("../../../../../src/app/company/company.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof company_service_1.CompanyService !== "undefined" && company_service_1.CompanyService) === "function" && _b || Object, typeof (_c = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _c || Object])
], CompanyComponent);
exports.CompanyComponent = CompanyComponent;
var _a, _b, _c;
//# sourceMappingURL=company.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!customers\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"customers\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"customerId\" header=\"Id\" [style]=\"{'width':'10%'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"customerName\" header=\"Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"customerEmail\" header=\"Email\" [style]=\"{'width':'30%'}\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"customerCity\" header=\"City\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Customer</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.customerId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.customerName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"email\">Email</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"email\" [(ngModel)]=\"selected.customerEmail\" type=\"email\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['email'].valid&&dataform.controls['email'].dirty\">\n                            <i class=\"fa fa-close\"></i> Email is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"phone\">Phone</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"phone\" [(ngModel)]=\"selected.customerPhone\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"address\">Address</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"address\" [(ngModel)]=\"selected.customerAddress\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['address'].valid&&dataform.controls['address'].dirty\">\n                            <i class=\"fa fa-close\"></i> Address is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"city\">City</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"city\" [(ngModel)]=\"selected.customerCity\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['city'].valid&&dataform.controls['city'].dirty\">\n                            <i class=\"fa fa-close\"></i> City is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"zip\">Zip</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"zip\" [(ngModel)]=\"selected.customerZip\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['zip'].valid&&dataform.controls['zip'].dirty\">\n                            <i class=\"fa fa-close\"></i> Zip is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"country\">Country</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"country\" [(ngModel)]=\"selected.customerCountry\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['country'].valid&&dataform.controls['country'].dirty\">\n                            <i class=\"fa fa-close\"></i> Country is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"fiscalCode\">Fiscal Code</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"fiscalCode\" [(ngModel)]=\"selected.customerFiscalCode\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"vatNumber\">VAT number</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"vatNumber\" [(ngModel)]=\"selected.customerVatNumber\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.customerId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" class=\"ui-button-success\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n </div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var customer_service_1 = __webpack_require__("../../../../../src/app/services/customer.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var CustomerComponent = (function () {
    function CustomerComponent(sessionService, customerService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.customerService = customerService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Customers';
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'email': new forms_1.FormControl('', forms_1.Validators.required),
            'phone': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'address': new forms_1.FormControl('', forms_1.Validators.required),
            'city': new forms_1.FormControl('', forms_1.Validators.required),
            'zip': new forms_1.FormControl('', forms_1.Validators.required),
            'country': new forms_1.FormControl('', forms_1.Validators.required),
            'fiscalCode': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'vatNumber': new forms_1.FormControl('', forms_1.Validators.nullValidator)
        });
        this.customerService.getAll()
            .subscribe(function (result) {
            _this.customers = result;
            _this.totalRecords = _this.customers.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(CustomerComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.customerId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerComponent.prototype, "selectedIndex", {
        get: function () { return this.customers.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    CustomerComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    CustomerComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    CustomerComponent.prototype.addClick = function () {
        this.selected = new models_1.Customer();
        this.displayPanel = true;
    };
    CustomerComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.customerService
                .create(this.selected)
                .subscribe(function (result) {
                _this.customers.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.customerService
                .update(this.selected.customerId, this.selected)
                .subscribe(function (result) {
                _this.customers[_this.selectedIndex] = _this.selected;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    CustomerComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this customer?',
            accept: function () {
                _this.customerService
                    .delete(_this.selected.customerId)
                    .subscribe(function (result) {
                    _this.customers.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'customer-component',
        template: __webpack_require__("../../../../../src/app/customer/customer.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=customer.component.js.map

/***/ }),

/***/ "../../../../../src/app/device/device.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"items\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"deviceId\" header=\"Id\" [style]=\"{'width':'100px'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"deviceName\" header=\"Name\" [sortable]=\"true\"></p-column>\n        <p-column field=\"store.storeName\" header=\"Store\" [sortable]=\"true\"></p-column>     \n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Device</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.deviceId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.deviceName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"store\">Store</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"stores\" formControlName=\"store\" [(ngModel)]=\"selected.store\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['store'].valid&&dataform.controls['store'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['store'].errors['required']\">Store is required</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"token\">Token</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"token\" [(ngModel)]=\"selected.deviceToken\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"join\">Join with this device</label></div>\n                    <div class=\"ui-grid-col-8\"><p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"join\"></p-inputSwitch></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.deviceId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/device/device.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var device_service_1 = __webpack_require__("../../../../../src/app/services/device.service.ts");
var store_service_1 = __webpack_require__("../../../../../src/app/services/store.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var DeviceComponent = (function () {
    function DeviceComponent(sessionService, deviceService, storeService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.deviceService = deviceService;
        this.storeService = storeService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        this.stores = [];
        sessionService.title = 'Devices';
    }
    DeviceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'token': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'store': new forms_1.FormControl('', forms_1.Validators.required),
            'join': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.deviceService
            .getAll()
            .subscribe(function (result) {
            _this.items = result;
            _this.totalRecords = _this.items.length;
        }, function (onerror) { return alert(onerror._body); });
        this.storeService.getAll()
            .subscribe(function (result) {
            _this.stores.push({ label: '', value: null });
            _this.stores = _this.stores.concat(result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.storeName); }));
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(DeviceComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.deviceId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceComponent.prototype, "selectedIndex", {
        get: function () { return this.items.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    DeviceComponent.prototype.addClick = function () {
        this.selected = new models_1.Device();
        this.selected.store = this.stores.length > 0 ? this.stores[0].value : null;
        this.dataform.controls.join.setValue(false);
        this.displayPanel = true;
    };
    DeviceComponent.prototype.onRowSelect = function (event) {
        this.dataform.controls.join.setValue(false);
        var json = localStorage.getItem('webretailDevice');
        if (json != null) {
            var device = JSON.parse(json);
            if (device.deviceId === this.selected.deviceId) {
                this.dataform.controls.join.setValue(true);
            }
        }
        if (this.selected.store.storeId === 0) {
            this.selected.store = null;
        }
        this.displayPanel = true;
    };
    DeviceComponent.prototype.closeClick = function () {
        if (this.dataform.controls.join.value === true) {
            localStorage.setItem('webretailDevice', JSON.stringify(this.selected));
        }
        else {
            localStorage.removeItem('webretailDevice');
        }
        this.displayPanel = false;
        this.selected = null;
    };
    DeviceComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.deviceService
                .create(this.selected)
                .subscribe(function (result) {
                _this.selected = result;
                _this.items.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.deviceService
                .update(this.selected.deviceId, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    DeviceComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this device?',
            accept: function () {
                _this.deviceService
                    .delete(_this.selected.deviceId)
                    .subscribe(function (result) {
                    _this.items.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return DeviceComponent;
}());
DeviceComponent = __decorate([
    core_1.Component({
        selector: 'device-component',
        template: __webpack_require__("../../../../../src/app/device/device.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof device_service_1.DeviceService !== "undefined" && device_service_1.DeviceService) === "function" && _b || Object, typeof (_c = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _c || Object, typeof (_d = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _d || Object, typeof (_e = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _e || Object])
], DeviceComponent);
exports.DeviceComponent = DeviceComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=device.component.js.map

/***/ }),

/***/ "../../../../../src/app/discount/discount.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <button pButton type=\"button\" title=\"Discounts\" style=\"position: absolute; top: 154px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n\n    <p-toolbar *ngIf=\"item\">\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:60px\">\n            <span><b>name</b>: {{item.discountName}}</span>\n            <br/><span><b>start</b>: {{item.discountStartAt | date: 'yyyy-MM-dd'}}</span>\n            <span><b>finish</b>: {{item.discountFinishAt | date: 'yyyy-MM-dd'}}</span>\n        </div>\n        <div class=\"ui-toolbar-group-right\" style=\"text-align: right\">\n            <br>\n            <span *ngIf=\"item.discountPercentage>0\"><b>percentage</b>: {{item.discountPercentage}}%</span>\n            <span *ngIf=\"item.discountPrice>0\"><b>fixed price</b>: {{item.discountPrice | currency: 'EUR' : true}}</span>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!inputComponent.isOpen\" [value]=\"items | priceFilter:sliderValue:'discount':item\" \n        selectionMode=\"multiple\" [(selection)]=\"itemsSelected\" [responsive]=\"true\" #dt>\n        <p-header>\n            <button pButton style=\"position: absolute;left: 10px; top: 8px;\" type=\"button\" title=\"Article picker\" (click)=\"showPickerClick()\" class=\"ui-button-primary\" icon=\"fa-search-plus\"></button>\n            <p-chips [(ngModel)]=\"codes\" placeholder=\"code reading\" (onAdd)=\"addCodes()\"></p-chips>\n        </p-header>\n        <p-footer>\n            <button pButton type=\"button\" label=\"Remove\" (click)=\"removeClick()\" [disabled]=\"itemsSelected.length===0\" style=\"float: left\" class=\"ui-button-secondary\" icon=\"fa-trash\"></button>\n            <span style=\"float: right\"><b>{{totalRecords}}</b> rows</span>\n            <p>&nbsp;</p>\n        </p-footer>\n        <p-column [style]=\"{'width':'50px'}\" selectionMode=\"multiple\"></p-column>\n        <p-column field=\"discountProduct.productCode\" header=\"Code\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"contains\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"discountProduct.productName\" header=\"Name\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"contains\" filterPlaceholder=\"Search\"></p-column>\n        <p-column header=\"Discount ({{sliderValue||'No Filter'}})\"[sortable]=\"true\" [filter]=\"true\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"sliderValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"sliderValue\" [min]=\"5\" [max]=\"1000\" styleClass=\"ui-column-filter\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                <div *ngIf=\"item.discountPercentage===0;then discount_content else price_content\"></div>\n                <ng-template #discount_content>\n                    {{(data.discountProduct.productSellingPrice - item.discountPrice) / data.discountProduct.productSellingPrice * 100.0}}%\n                </ng-template>\n                <ng-template #price_content>\n                    {{data.discountProduct.productSellingPrice - (data.discountProduct.productSellingPrice * item.discountPercentage / 100) | currency: 'EUR' : true}}\n                </ng-template>\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n\n    <product-picker (onPicked)=\"pickerClick($event)\"></product-picker>\n</div>"

/***/ }),

/***/ "../../../../../src/app/discount/discount.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var discount_service_1 = __webpack_require__("../../../../../src/app/services/discount.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var product_picker_component_1 = __webpack_require__("../../../../../src/app/shared/product-picker.component.ts");
var DiscountComponent = (function () {
    function DiscountComponent(activatedRoute, sessionService, discountService, confirmationService, location) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.discountService = discountService;
        this.confirmationService = confirmationService;
        this.location = location;
        this.totalRecords = 0;
        this.codes = [];
        this.itemsSelected = [];
        sessionService.title = 'Discount';
    }
    DiscountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.discountService.getById(params['id'])
                .subscribe(function (result) {
                _this.item = result;
                _this.discountId = result.discountId;
                _this.discountService.getItemsById(_this.discountId)
                    .subscribe(function (res) {
                    _this.items = res;
                    _this.totalRecords = _this.items.length;
                }, function (onerror) { return alert(onerror._body); });
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    DiscountComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    DiscountComponent.prototype.reloadData = function () {
        this.items = this.items.map(function (p) { return p; });
        this.totalRecords = this.items.length;
    };
    DiscountComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    DiscountComponent.prototype.addCodes = function () {
        var _this = this;
        this.codes.forEach(function (code) {
            var item = new models_1.DiscountProduct();
            item.discountId = _this.discountId;
            item.discountProduct.productCode = code;
            _this.discountService
                .addProduct(item)
                .subscribe(function (result) {
                _this.items.push(result);
                _this.codes.splice(_this.codes.indexOf(code), 1);
                _this.reloadData();
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    DiscountComponent.prototype.showPickerClick = function () {
        this.inputComponent.loadData();
    };
    DiscountComponent.prototype.pickerClick = function (event) {
        this.codes = this.codes.concat(event);
        this.addCodes();
    };
    DiscountComponent.prototype.removeClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this selected items?',
            accept: function () {
                _this.itemsSelected.forEach(function (p) {
                    _this.discountService
                        .removeProduct(p.discountProductId)
                        .subscribe(function (result) {
                        _this.items.splice(_this.items.indexOf(p), 1);
                        _this.reloadData();
                    }, function (onerror) { return alert(onerror._body); });
                });
            }
        });
    };
    return DiscountComponent;
}());
__decorate([
    core_1.ViewChild(product_picker_component_1.ProductPickerComponent),
    __metadata("design:type", typeof (_a = typeof product_picker_component_1.ProductPickerComponent !== "undefined" && product_picker_component_1.ProductPickerComponent) === "function" && _a || Object)
], DiscountComponent.prototype, "inputComponent", void 0);
DiscountComponent = __decorate([
    core_1.Component({
        selector: 'discount-component',
        template: __webpack_require__("../../../../../src/app/discount/discount.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _c || Object, typeof (_d = typeof discount_service_1.DiscountService !== "undefined" && discount_service_1.DiscountService) === "function" && _d || Object, typeof (_e = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _e || Object, typeof (_f = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _f || Object])
], DiscountComponent);
exports.DiscountComponent = DiscountComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=discount.component.js.map

/***/ }),

/***/ "../../../../../src/app/discount/discounts.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n            <button pButton type=\"button\" label=\"Edit\" title=\"Edit item\" (click)=\"editClick()\" [disabled]=\"!selected\" class=\"ui-button-primary\" icon=\"fa-edit\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <button pButton type=\"button\" label=\"Details\" title=\"Open details\" (click)=\"openClick()\" [disabled]=\"!selected\" class=\"ui-button-primary\" icon=\"fa-bars\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"items | periodFilter:dateStartValue:dateFinishValue | priceFilter:sliderValue:'discounts'\"\n        selectionMode=\"single\" [(selection)]=\"selected\"\n        [paginator]=\"true\" [rows]=\"20\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n        <p-column field=\"discountName\" header=\"Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column header=\"Discount ({{sliderValue||'No Filter'}})\"[sortable]=\"true\" [filter]=\"true\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"sliderValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"sliderValue\" [min]=\"5\" [max]=\"1000\" styleClass=\"ui-column-filter\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.discountPercentage > 0 ? data.discountPercentage + '%' : data.discountPrice | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n        <p-column field=\"discountStartAt\" header=\"Start\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.discountStartAt | date:'yyyy-MM-dd'}}\n            </ng-template>            \n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"dateStartValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'100%'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Start\" styleClass=\"ui-column-filter\"></p-calendar>\n            </ng-template>\n        </p-column>\n        <p-column field=\"discountFinishAt\" header=\"Finish\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.discountFinishAt | date:'yyyy-MM-dd'}}\n            </ng-template>            \n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"dateFinishValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'100%'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Finish\" styleClass=\"ui-column-filter\"></p-calendar>\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n    \n     <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:4px\"><b>Discount</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"selected\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.discountId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.discountName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"start\">Start</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-calendar formControlName=\"start\" [(ngModel)]=\"selected.discountStartAt\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['start'].valid&&dataform.controls['start'].dirty\">\n                            <i class=\"fa fa-close\"></i> Start date is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"finish\">Finish</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-calendar formControlName=\"finish\" [(ngModel)]=\"selected.discountFinishAt\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['finish'].valid&&dataform.controls['finish'].dirty\">\n                            <i class=\"fa fa-close\"></i> Finish date is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-12\"><h4>TYPE OF DISCOUNT</h4></div>\n                </div>\n                <div class=\"ui-grid-row\" *ngIf=\"selected.discountPrice<1\">\n                    <div class=\"ui-grid-col-4\"><label for=\"percentage\">percentage %</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText type=\"number\" formControlName=\"percentage\" [(ngModel)]=\"selected.discountPercentage\" min=\"0\" max=\"100\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\" *ngIf=\"selected.discountPercentage<1\">\n                    <div class=\"ui-grid-col-4\"><label for=\"price\">fixed-price</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText type=\"number\" formControlName=\"price\" [(ngModel)]=\"selected.discountPrice\" min=\"0\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.discountId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n</div>"

/***/ }),

/***/ "../../../../../src/app/discount/discounts.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var discount_service_1 = __webpack_require__("../../../../../src/app/services/discount.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var DiscountsComponent = (function () {
    function DiscountsComponent(router, sessionService, discountService, confirmationService, fb) {
        this.router = router;
        this.sessionService = sessionService;
        this.discountService = discountService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Discounts';
    }
    DiscountsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'percentage': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'price': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'start': new forms_1.FormControl('', forms_1.Validators.required),
            'finish': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.discountService
            .getAll()
            .subscribe(function (result) {
            _this.items = result;
            _this.totalRecords = _this.items.length;
        });
    };
    Object.defineProperty(DiscountsComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.discountId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountsComponent.prototype, "selectedIndex", {
        get: function () { return this.items.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    DiscountsComponent.prototype.addClick = function () {
        this.selected = new models_1.Discount();
        this.displayPanel = true;
    };
    DiscountsComponent.prototype.editClick = function () {
        if (!this.selected) {
            return;
        }
        this.displayPanel = true;
    };
    DiscountsComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    DiscountsComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.discountService.create(this.selected)
                .subscribe(function (result) {
                _this.selected = result;
                _this.totalRecords++;
                _this.openClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.discountService.update(this.selected.discountId, this.selected)
                .subscribe(function (result) {
                _this.items[_this.selectedIndex] = result;
                _this.closeClick();
            }, function (onerror) {
                alert(onerror._body);
            });
        }
    };
    DiscountsComponent.prototype.deleteClick = function () {
        var _this = this;
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'All related items will be deleted. Are you sure that you want to delete this discount?',
            accept: function () {
                _this.discountService.delete(_this.selected.discountId)
                    .subscribe(function (result) {
                    _this.items.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    DiscountsComponent.prototype.openClick = function (detail) {
        if (detail === void 0) { detail = ''; }
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('discount/' + detail + this.selected.discountId);
    };
    return DiscountsComponent;
}());
DiscountsComponent = __decorate([
    core_1.Component({
        selector: 'discounts-component',
        template: __webpack_require__("../../../../../src/app/discount/discounts.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof discount_service_1.DiscountService !== "undefined" && discount_service_1.DiscountService) === "function" && _c || Object, typeof (_d = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _d || Object, typeof (_e = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _e || Object])
], DiscountsComponent);
exports.DiscountsComponent = DiscountsComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=discounts.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    \n    <!--<p *ngIf=\"token\" style=\"float: right\">Your unique token is: <code>{{token}}</code></p>-->\n   \n    <h2><img src=\"/assets/logo.jpg\" height=\"72\"> Webretail RMS</h2>\n    <hr/>\n\n    <h4>What is Retail Management System (RMS)?</h4>\n    <ul>\n        <li>Webretail RMS is a complete POS solution for small and midsize retailers operating everything from a single store to a whole chain. It is comprehensive and scalable for those businesses focusing on significant growth.</li>\n        <li>It offers advanced functionality such as multidimensional inventory management, customized reporting, advanced purchasing, and receivables management. And Webretail RMS integrates with well-known financial packages you may be using now.</li>\n        <li>Webretail RMS can be customized for your specific business requirements, providing you with the investment protection of a flexible solution that adapts to meet demanding retail needs.</li>\n    </ul>\n\n    <hr/>\n    <h3>With Webretail RMS, you get the functionality to:</h3>\n    <hr/>\n\n    <h4>Streamline operations</h4>\n    <ul>\n        <li>For single stores or multiple independently operated stores</li>\n        <li>Efficiently manage and track inventory within each store</li>\n        <li>Automatically generate POs based on reorder points and stock levels</li>\n        <li>View sales and inventory information in real-time, modifiable reports</li>\n        <li>Speed checkout with built-in credit/debit card processing services</li>\n        <li>Manage inventory and customer information across multiple stores</li>\n        <li>Manage pricing and promotions from the head office</li>\n        <li>Manage multiple item dimensions—color, size, and style</li>\n        <li>Automatically break down cases into single units</li>\n        <li>Assign field-level access to service employees</li>\n        <li>Use a touch screen to speed transactions</li>\n        <li>Suspend and resume transactions</li>\n    </ul>\n\n    <h4>Improve profit margins</h4>\n    <ul>\n        <li>Include cashier accountability by tracking performed tasks</li>\n        <li>Design custom sales promotions</li>\n        <li>Create inventory movement reports</li>\n        <li>Identify best-selling items</li>\n        <li>Upsell and cross-sell your customers</li>\n        <li>Track work orders, quotes, back orders, and layaways</li>\n        <li>Manage customer accounts receivable</li>\n        <li>Manage gift card, assembly, weighed, and gasoline item types</li>\n    </ul>\n\n    <hr/>\n    \n    <h4>Check out the following resources</h4>\n    <ul>\n        <li><a href=\"https://github.com/gerardogrisolini/Webretail\" target=\"_blank\">Webretail on GitHub</a></li>\n    </ul>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var HomeComponent = (function () {
    function HomeComponent(activatedRoute, sessionService) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        sessionService.title = 'Home';
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (this.sessionService.isAuthenticated) {
            this.token = localStorage.getItem('token');
            return;
        }
        // this.sessionService.getCredentials()
        //     .subscribe(res => {
        //         alert(JSON.stringify(res));
        //     });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home-component',
        template: __webpack_require__("../../../../../src/app/home/home.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/invoice/invoice.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <button pButton type=\"button\" title=\"Invoices\" style=\"position: absolute; top: 154px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n\n    <p-toolbar *ngIf=\"item\">\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:60px\">\n            <span><b>number</b>: {{item.invoiceNumber}}</span>\n            <br/><span><b>date</b>: {{item.invoiceDate | date: 'yyyy-MM-dd'}}</span>\n        </div>\n        <div class=\"ui-toolbar-group-right\" style=\"text-align: right\">\n            <br>\n            <span><b>customer</b>: {{item.invoiceCustomer.customerName}}</span>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!inputComponent.isOpen\" [value]=\"items | dateFilter:dateStartValue:dateFinishValue | priceFilter:amountValue:'movements'\" \n        selectionMode=\"multiple\" [(selection)]=\"itemsSelected\" [responsive]=\"true\" #dt>\n        <p-header>\n            <button pButton type=\"button\" label=\"Remove\" (click)=\"removeClick()\" [disabled]=\"itemsSelected.length===0\" style=\"float: left\" class=\"ui-button-secondary\" icon=\"fa-trash\"></button>\n            <button pButton label=\"Movement picker\" style=\"float: right\" type=\"button\" title=\"Movement picker\" (click)=\"showPickerClick()\" class=\"ui-button-primary\" icon=\"fa-search-plus\"></button>\n            <p>&nbsp;</p>\n        </p-header>\n        <p-footer>\n            <span style=\"float: left\"><b>{{totalRecords}}</b> rows</span>\n            <span style=\"float: right\">amount <b>{{totalAmount | currency: 'EUR' : true}}</b></span>\n            <p>&nbsp;</p>\n        </p-footer>\n        <p-column [style]=\"{'width':'50px'}\" selectionMode=\"multiple\"></p-column>\n        <p-column field=\"movementNumber\" header=\"Number\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column header=\"Date\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementDate | date:'yyyy-MM-dd'}}\n            </ng-template>            \n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"dateStartValue=null;dateFinishValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'50%','float':'left'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Start\" styleClass=\"ui-column-filter\"></p-calendar>\n                <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'50%','float':'right'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Finish\" styleClass=\"ui-column-filter\"></p-calendar>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementCausal.causalName\" header=\"Causal\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"causalsFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementStore.storeName\" header=\"Store\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"storesFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column header=\"Amount ({{amountValue||'No Filter'}})\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"amountValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"amountValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementAmount | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n\n    <movement-picker (onPicked)=\"pickerClick($event)\"></movement-picker>\n</div>"

/***/ }),

/***/ "../../../../../src/app/invoice/invoice.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var invoice_service_1 = __webpack_require__("../../../../../src/app/services/invoice.service.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var movement_picker_component_1 = __webpack_require__("../../../../../src/app/shared/movement-picker.component.ts");
var InvoiceComponent = (function () {
    function InvoiceComponent(activatedRoute, sessionService, invoiceService, confirmationService, location) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.invoiceService = invoiceService;
        this.confirmationService = confirmationService;
        this.location = location;
        this.totalRecords = 0;
        this.totalAmount = 0.0;
        this.codes = [];
        this.itemsSelected = [];
        sessionService.title = 'Invoice';
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.invoiceId = params['id'];
            _this.invoiceService.getById(_this.invoiceId)
                .subscribe(function (result) {
                _this.item = result;
            }, function (onerror) { return alert(onerror._body); });
            _this.invoiceService.getMovementsById(_this.invoiceId)
                .subscribe(function (result) {
                _this.items = result;
                _this.updateTotals();
                _this.buildFilter(_this.items);
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    InvoiceComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    InvoiceComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    InvoiceComponent.prototype.buildFilter = function (items) {
        this.storesFiltered = [];
        this.storesFiltered.push({ label: 'All', value: null });
        var filterStores = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementStore.storeName); }));
        this.storesFiltered = this.storesFiltered.concat(filterStores);
        this.causalsFiltered = [];
        this.causalsFiltered.push({ label: 'All', value: null });
        var filterCusals = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementCausal.causalName); }));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
    };
    InvoiceComponent.prototype.showPickerClick = function () {
        this.inputComponent.loadData(this.item.invoiceCustomer.customerId);
    };
    InvoiceComponent.prototype.pickerClick = function (event) {
        var _this = this;
        event.forEach(function (id) {
            _this.invoiceService
                .addMovement(_this.invoiceId, Number(id))
                .subscribe(function (result) {
                _this.invoiceService.getMovementsById(_this.invoiceId)
                    .subscribe(function (res) {
                    _this.items = res;
                    _this.updateTotals();
                });
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    InvoiceComponent.prototype.removeClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this selected items?',
            accept: function () {
                _this.itemsSelected.forEach(function (p) {
                    _this.invoiceService
                        .removeMovement(p.movementId)
                        .subscribe(function (result) {
                        _this.items.splice(_this.items.indexOf(p), 1);
                        _this.reloadData();
                    }, function (onerror) { return alert(onerror._body); });
                });
            }
        });
    };
    InvoiceComponent.prototype.reloadData = function () {
        this.items = this.items.map(function (p) { return p; });
        this.updateTotals();
    };
    InvoiceComponent.prototype.updateTotals = function () {
        if (!this.items || this.items.length === 0) {
            return;
        }
        this.totalRecords = this.items.length;
        this.totalAmount = this.items.map(function (p) { return p.movementAmount; }).reduce(function (sum, current) { return sum + current; });
    };
    return InvoiceComponent;
}());
__decorate([
    core_1.ViewChild(movement_picker_component_1.MovementPickerComponent),
    __metadata("design:type", typeof (_a = typeof movement_picker_component_1.MovementPickerComponent !== "undefined" && movement_picker_component_1.MovementPickerComponent) === "function" && _a || Object)
], InvoiceComponent.prototype, "inputComponent", void 0);
InvoiceComponent = __decorate([
    core_1.Component({
        selector: 'invoice-component',
        template: __webpack_require__("../../../../../src/app/invoice/invoice.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _c || Object, typeof (_d = typeof invoice_service_1.InvoiceService !== "undefined" && invoice_service_1.InvoiceService) === "function" && _d || Object, typeof (_e = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _e || Object, typeof (_f = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _f || Object])
], InvoiceComponent);
exports.InvoiceComponent = InvoiceComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=invoice.component.js.map

/***/ }),

/***/ "../../../../../src/app/invoice/invoicedocument.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"!invoice||!groups\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <div class=\"noprint\">\n        <button pButton type=\"button\" title=\"Movements\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" style=\"width:50px\" icon=\"fa-reply\"></button>\n        <button pButton type=\"button\" label=\"Print\" title=\"Print document\" (click)=\"printClick()\" class=\"ui-button-secondary\" icon=\"fa-print\"></button>\n        <button pButton type=\"button\" label=\"Send mail\" title=\"Send mail\" (click)=\"sendMailClick()\" class=\"ui-button-secondary\" icon=\"fa-envelope\"></button>\n    </div>\n\n    <div *ngFor=\"let items of groups\" #doc>          \n        <table *ngIf=\"invoice\" class=\"table\" style=\"width: 100%\">    \n            <thead>\n                <tr> \n                    <td colspan=\"5\"><img title=\"Header\" height=\"100\" width=\"100%\" src=\"http://{{document.location.host}}/media/header.png\" alt=\"Header not found. Upload on Settings -> Company -> Document Header\" style=\"margin: 10px 0\"></td> \n                </tr> \n                <tr> \n                    <td><strong>Invoice n°</strong></td> \n                    <td align=\"right\">{{invoice.invoiceNumber}}</td>\n                    <td style=\"width: 20%\">&nbsp;</td>\n                    <td><strong>Payment</strong></td> \n                    <td align=\"right\">{{invoice.invoicePayment}}</td> \n                </tr> \n                <tr> \n                    <td><strong>Date</strong></td> \n                    <td align=\"right\">{{invoice.invoiceDate | date: 'yyyy-MM-dd'}}</td>\n                    <td style=\"width: 20%\">&nbsp;</td>\n                    <td><strong>Customer</strong></td>\n                    <td rowspan=\"3\" align=\"right\">\n                        {{invoice.invoiceCustomer.customerName}}\n                        <br/>{{invoice.invoiceCustomer.customerAddress}}\n                        <br/>{{invoice.invoiceCustomer.customerCity}}\n                        <br/>{{invoice.invoiceCustomer.customerVatNumber !== '' ? invoice.invoiceCustomer.customerVatNumber : invoice.invoiceCustomer.customerFiscalCode}}\n                    </td> \n                </tr> \n                <tr> \n                    <td colspan=\"4\"><strong>Note</strong></td> \n                </tr> \n                <tr> \n                    <td colspan=\"4\">{{invoice.invoiceNote}}</td>\n                </tr>\n            </thead>\n        </table>\n\n        <table class=\"table\" cellpadding=\"2\" cellspacing=\"2\" style=\"width: 100%\">    \n            <thead *ngIf=\"items\">\n                <tr style=\"background-color: whitesmoke\"> \n                    <td><strong>Barcode</strong></td> \n                    <td><strong>Product</strong></td> \n                    <td align=\"center\"><strong>Quantity</strong></td> \n                    <td align=\"right\"><strong>Price</strong></td> \n                    <td align=\"right\"><strong>Amount</strong></td> \n                </tr> \n            </thead>\n            <tfoot style=\"background-color: whitesmoke\">\n                <tr>\n                    <td colspan=\"2\">Amount</td>\n                    <td colspan=\"3\" align=\"right\">{{amount | currency: 'EUR' : true}}</td>\n                </tr>\n                <tr>\n                    <td colspan=\"2\">Tax 22%</td>\n                    <td colspan=\"3\" align=\"right\">{{total - amount | currency: 'EUR' : true}}</td>\n                </tr>\n                <tr>\n                    <td colspan=\"2\"><strong>Totals</strong></td>\n                    <td align=\"center\"><strong>{{totalItems}}</strong></td>\n                    <td colspan=\"2\" align=\"right\"><strong>{{total | currency: 'EUR' : true}}</strong></td>\n                </tr>\n            </tfoot>\n            <tbody> \n                <tr *ngFor=\"let item of items\" style=\"height: 39px\"> \n                    <td><span>{{item.movementArticleBarcode}}</span></td> \n                    <td><span>{{item.movementArticleProduct | articleInfo:item.movementArticleBarcode}}</span></td> \n                    <td align=\"center\"><span>{{item.movementArticleBarcode ? item.movementArticleQuantity : ''}}</span></td> \n                    <td align=\"right\"><span>{{!item.movementArticleBarcode ? '' : item.movementArticlePrice | currency: 'EUR' : true}}</span></td> \n                    <td align=\"right\"><span>{{!item.movementArticleBarcode ? '' : item.movementArticleAmount | currency: 'EUR' : true}}</span></td> \n                </tr> \n            </tbody>\n        </table>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/invoice/invoicedocument.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var company_service_1 = __webpack_require__("../../../../../src/app/services/company.service.ts");
var invoice_service_1 = __webpack_require__("../../../../../src/app/services/invoice.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var InvoiceDocumentComponent = (function () {
    function InvoiceDocumentComponent(document, location, activatedRoute, sessionService, companyService, invoiceService) {
        this.document = document;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.companyService = companyService;
        this.invoiceService = invoiceService;
        this.totalItems = 0;
        this.amount = 0.0;
        this.total = 0.0;
        sessionService.title = 'Invoice';
    }
    InvoiceDocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.invoiceId = params['id'];
            _this.invoiceService.getById(_this.invoiceId)
                .subscribe(function (result) {
                _this.invoice = result;
            }, function (onerror) { return alert(onerror._body); });
            _this.invoiceService.getMovementArticlesById(_this.invoiceId)
                .subscribe(function (result) {
                // let items: MovementArticle[] = [];
                // for (let i = 0; i < 30; i++) {
                //     items.push(result[0]);
                // }
                _this.groups = [];
                var array = [];
                var index = 0;
                result.forEach(function (item) {
                    array.push(item);
                    if (index > 11) {
                        _this.groups.push(array);
                        array = [];
                        index = -1;
                    }
                    index++;
                });
                var lenght = 13 - array.length;
                for (var i = 0; i < lenght; i++) {
                    array.push(new models_1.MovementArticle());
                }
                _this.groups.push(array);
                _this.totalItems = result.map(function (p) { return p.movementArticleQuantity; }).reduce(function (sum, current) { return sum + current; });
                _this.total = result.map(function (p) { return p.movementArticleAmount; }).reduce(function (sum, current) { return sum + current; });
                _this.amount = _this.total * 100 / 122;
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    InvoiceDocumentComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    InvoiceDocumentComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    InvoiceDocumentComponent.prototype.printClick = function () {
        window.print();
    };
    InvoiceDocumentComponent.prototype.sendMailClick = function () {
        var email = new models_1.Email();
        email.address = this.invoice.invoiceCustomer.customerEmail;
        email.subject = "Invoice n° " + this.invoice.invoiceNumber;
        email.content = this.doc.nativeElement.innerHTML;
        this.companyService.sendMail(email)
            .subscribe(function (result) { return alert(result.content); }, function (onerror) { return alert(onerror._body); });
    };
    return InvoiceDocumentComponent;
}());
__decorate([
    core_1.ViewChild('doc'),
    __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object)
], InvoiceDocumentComponent.prototype, "doc", void 0);
InvoiceDocumentComponent = __decorate([
    core_1.Component({
        selector: 'invoicedocument-component',
        template: __webpack_require__("../../../../../src/app/invoice/invoicedocument.component.html")
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _d || Object, typeof (_e = typeof company_service_1.CompanyService !== "undefined" && company_service_1.CompanyService) === "function" && _e || Object, typeof (_f = typeof invoice_service_1.InvoiceService !== "undefined" && invoice_service_1.InvoiceService) === "function" && _f || Object])
], InvoiceDocumentComponent);
exports.InvoiceDocumentComponent = InvoiceDocumentComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=invoicedocument.component.js.map

/***/ }),

/***/ "../../../../../src/app/invoice/invoices.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n            <button pButton type=\"button\" label=\"Edit\" title=\"Edit item\" (click)=\"editClick()\" [disabled]=\"!selected\" class=\"ui-button-primary\" icon=\"fa-edit\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <p-splitButton label=\"Details\" icon=\"fa-bars\" (onClick)=\"openClick()\" [model]=\"buttons\" [disabled]=\"!selected\"></p-splitButton>\n       </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"items | dateFilter:dateStartValue:dateFinishValue | priceFilter:amountValue:'invoices'\"\n        selectionMode=\"single\" [(selection)]=\"selected\" [contextMenu]=\"bts\"\n        [paginator]=\"true\" [rows]=\"20\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n        <p-column field=\"invoiceNumber\" header=\"Number\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"invoiceDate\" header=\"Date\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.invoiceDate | date:'yyyy-MM-dd'}}\n            </ng-template>            \n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"dateStartValue=null;dateFinishValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'50%','float':'left'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Start\" styleClass=\"ui-column-filter\"></p-calendar>\n                <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'50%','float':'right'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Finish\" styleClass=\"ui-column-filter\"></p-calendar>\n            </ng-template>\n        </p-column>\n        <p-column field=\"invoiceCustomer.customerName\" header=\"Customer\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"customersFiltered\" [style]=\"{'width':'100%'}\" [filter]=\"true\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column header=\"Amount ({{amountValue||'No Filter'}})\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"amountValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"amountValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.invoiceAmount | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n     </p-dataTable>\n    \n     <p-contextMenu #bts [model]=\"buttons\"></p-contextMenu>\n\n     <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:4px\"><b>Invoice</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"selected\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.invoiceId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"number\">Number</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText type=\"number\" formControlName=\"number\" [(ngModel)]=\"selected.invoiceNumber\" style=\"width: 50%\"/>\n                        0 = auto increment\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['number'].valid&&dataform.controls['number'].dirty\">\n                            <i class=\"fa fa-close\"></i> Number is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"date\">Date</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-calendar formControlName=\"date\" [(ngModel)]=\"selected.invoiceDate\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['date'].valid&&dataform.controls['date'].dirty\">\n                            <i class=\"fa fa-close\"></i> Date is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"customer\">Customer</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"customers\" formControlName=\"customer\" [(ngModel)]=\"selected.invoiceCustomer\" [filter]=\"true\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"payment\">Payment</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"payments\" formControlName=\"payment\" [(ngModel)]=\"selected.invoicePayment\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"note\">Note</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <textarea pInputTextarea formControlName=\"note\" [(ngModel)]=\"selected.invoiceNote\" style=\"width: 100%\"></textarea>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.invoiceId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n</div>"

/***/ }),

/***/ "../../../../../src/app/invoice/invoices.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var invoice_service_1 = __webpack_require__("../../../../../src/app/services/invoice.service.ts");
var customer_service_1 = __webpack_require__("../../../../../src/app/services/customer.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var InvoicesComponent = (function () {
    function InvoicesComponent(router, sessionService, invoiceService, customerService, confirmationService, fb) {
        this.router = router;
        this.sessionService = sessionService;
        this.invoiceService = invoiceService;
        this.customerService = customerService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Invoices';
    }
    InvoicesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'number': new forms_1.FormControl('', forms_1.Validators.required),
            'date': new forms_1.FormControl('', forms_1.Validators.required),
            'customer': new forms_1.FormControl('', forms_1.Validators.required),
            'payment': new forms_1.FormControl('', forms_1.Validators.required),
            'note': new forms_1.FormControl('', forms_1.Validators.nullValidator)
        });
        this.invoiceService
            .getAll()
            .subscribe(function (result) {
            _this.items = result;
            _this.totalRecords = _this.items.length;
            _this.customersFiltered = [];
            _this.customersFiltered.push({ label: 'All', value: null });
            var filterCustomer = helpers_1.Helpers.distinct(result.map(function (item) { return helpers_1.Helpers.newSelectItem(item.invoiceCustomer.customerName); }));
            _this.customersFiltered = _this.customersFiltered.concat(filterCustomer);
        });
        this.customerService
            .getAll()
            .subscribe(function (result) {
            _this.customers = [];
            _this.customers.push({ label: '', value: null });
            _this.customers = _this.customers.concat(result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.customerName); }));
        });
        this.invoiceService
            .getPayments()
            .subscribe(function (result) {
            _this.payments = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p.value); });
        });
        this.buttons = [
            { label: 'Document', icon: 'fa-print', command: function (event) { return _this.openClick('document/'); } }
        ];
    };
    Object.defineProperty(InvoicesComponent.prototype, "isNew", {
        get: function () { return this.selected.invoiceId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InvoicesComponent.prototype, "selectedIndex", {
        get: function () { return this.items.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    InvoicesComponent.prototype.addClick = function () {
        this.selected = new models_1.Invoice();
        this.selected.invoicePayment = this.payments[0].value;
        this.displayPanel = true;
    };
    InvoicesComponent.prototype.editClick = function () {
        if (!this.selected) {
            return;
        }
        this.displayPanel = true;
    };
    InvoicesComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    InvoicesComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.invoiceService.create(this.selected)
                .subscribe(function (result) {
                _this.selected = result;
                _this.totalRecords++;
                _this.openClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.invoiceService.update(this.selected.invoiceId, this.selected)
                .subscribe(function (result) {
                _this.items[_this.selectedIndex] = result;
                _this.closeClick();
            }, function (onerror) {
                alert(onerror._body);
            });
        }
    };
    InvoicesComponent.prototype.deleteClick = function () {
        var _this = this;
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'Are you sure that you want to delete this invoice?',
            accept: function () {
                _this.invoiceService.delete(_this.selected.invoiceId)
                    .subscribe(function (result) {
                    _this.items.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    InvoicesComponent.prototype.openClick = function (detail) {
        if (detail === void 0) { detail = ''; }
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('invoice/' + detail + this.selected.invoiceId);
    };
    return InvoicesComponent;
}());
InvoicesComponent = __decorate([
    core_1.Component({
        selector: 'invoices-component',
        template: __webpack_require__("../../../../../src/app/invoice/invoices.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof invoice_service_1.InvoiceService !== "undefined" && invoice_service_1.InvoiceService) === "function" && _c || Object, typeof (_d = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _d || Object, typeof (_e = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _e || Object, typeof (_f = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _f || Object])
], InvoicesComponent);
exports.InvoicesComponent = InvoicesComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=invoices.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n\n<div class=\"container-fluid\">\n\n    <h1><img src=\"/assets/logo.jpg\" height=\"72\"> Authentication</h1>\n    <hr />\n\n    <form [formGroup]=\"userform\">\n    <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n                <label for=\"username\">Username</label>\n            </div>\n            <div class=\"ui-grid-col-6\">\n                <input pInputText [(ngModel)]=\"user.username\" type=\"email\" formControlName=\"username\"/>\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!userform.controls['username'].valid&&userform.controls['username'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Email is required\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n                <label for=\"password\">Password</label>\n            </div>\n            <div class=\"ui-grid-col-6\">\n                <input pInputText [(ngModel)]=\"user.password\" type=\"password\" formControlName=\"password\"/>\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!userform.controls['password'].valid&&userform.controls['password'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    <span *ngIf=\"userform.controls['password'].errors['required']\">Password is required</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <button type=\"button\" pButton label=\"Login\" (click)=\"login()\" icon=\"fa-sign-in\" [disabled]=\"!userform.valid\"></button>\n            </div>\n            <div class=\"ui-grid-col-6\">\n            </div>\n        </div>\n        <!--\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\"></div>\n            <div class=\"ui-grid-col-10\">\n                <p>\n                    <br/>\n                    <a [routerLink]=\"['/login/register']\">Register</a><br/>\n                    Too lazy to register?<br/>\n                    Login with <a href=\"/login/facebook\">Facebook</a> or <a href=\"/login/google\">Google</a>\n                </p>\n            </div>\n        </div>\n        -->\n    </div>\n    </form>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var LoginComponent = (function () {
    function LoginComponent(sessionService, fb) {
        this.sessionService = sessionService;
        this.fb = fb;
        this.user = new models_1.Login('', '');
        this.msgs = [];
        sessionService.title = 'Login';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userform = this.fb.group({
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'password': new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.sessionService.login(this.user)
            .subscribe(function (result) {
            if (result.login === 'ok') {
                _this.sessionService.grantCredentials(result);
            }
            else {
                _this.msgs.push({ severity: 'warn', summary: 'Authentication', detail: result.error });
            }
        }, function (error) { return _this.msgs.push({ severity: 'error', summary: 'Authentication', detail: error }); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-component',
        template: __webpack_require__("../../../../../src/app/login/login.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/register.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n\n<div class=\"container-fluid\">\n\n    <h1><img src=\"/assets/logo.jpg\" height=\"72\"> Registration</h1>\n    <hr />\n\n    <form [formGroup]=\"userform\">\n    <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n                <label for=\"username\">Username</label>\n            </div>\n            <div class=\"ui-grid-col-6\">\n                <input pInputText [(ngModel)]=\"user.username\" type=\"email\" formControlName=\"username\"/>\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!userform.controls['username'].valid&&userform.controls['username'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    Email is required\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n                <label for=\"password\">Password</label>\n            </div>\n            <div class=\"ui-grid-col-6\">\n                <input pInputText [(ngModel)]=\"user.password\" type=\"password\" formControlName=\"password\"/>\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!userform.controls['password'].valid&&userform.controls['password'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    <span *ngIf=\"userform.controls['password'].errors['required']\">Password is required</span>\n                    <span *ngIf=\"userform.controls['password'].errors['minlength']\">Must be longer than 6 characters</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\">\n                <label for=\"password2\">Repeat Password</label>\n            </div>\n            <div class=\"ui-grid-col-6\">\n                <input pInputText type=\"password\" formControlName=\"password2\"/>\n            </div>\n            <div class=\"ui-grid-col-4\">\n                <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!userform.controls['password2'].valid&&userform.controls['password2'].dirty\">\n                    <i class=\"fa fa-close\"></i>\n                    <span *ngIf=\"userform.controls['password2'].errors['required']\">Repeat Password is required</span>\n                    <span *ngIf=\"userform.controls['password2'].errors['passwordMatch']\">Must be equal to Password</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\"></div>\n            <div class=\"ui-grid-col-4\">\n                <button type=\"button\" pButton label=\"Register\" (click)=\"register()\" icon=\"fa-sign-in\" [disabled]=\"!userform.valid\"></button>\n            </div>\n            <div class=\"ui-grid-col-6\"></div>\n        </div>\n        <div class=\"ui-grid-row\">\n            <div class=\"ui-grid-col-2\"></div>\n            <div class=\"ui-grid-col-10\">\n                <p>\n                    <br/>\n                    Too lazy to register?<br/>\n                    Login with <a href=\"/login/facebook\">Facebook</a> or <a href=\"/login/google\">Google</a>\n                </p>\n            </div>\n        </div>\n    </div>\n    </form>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var RegisterComponent = (function () {
    function RegisterComponent(sessionService, fb) {
        this.sessionService = sessionService;
        this.fb = fb;
        this.user = new models_1.Login('', '');
        this.msgs = [];
        sessionService.title = 'Register';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.userform = this.fb.group({
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'password': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6)])),
            'password2': new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    RegisterComponent.prototype.register = function () {
        if (this.userform.value.password !== this.userform.value.password2) {
            this.msgs.push({ severity: 'error', summary: 'Registration', detail: 'The passwords do not match' });
            return;
        }
        // this.sessionService.register(this.user)
        // 	.subscribe(result => {
        // 		if (result.login === 'ok') {
        // 			this.sessionService.grantCredentials(result);
        //     	} else {
        //     		this.msgs.push({severity: 'warn', summary: 'Authentication', detail: result.error});
        // 		}
        // 	},
        // 	error => this.msgs.push({severity: 'error', summary: 'Registration', detail: error}));
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-component',
        template: __webpack_require__("../../../../../src/app/login/register.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
var _a, _b;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/movement/document.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"!movement||!groups\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <div class=\"noprint\">\n        <button pButton type=\"button\" title=\"Movements\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" style=\"width:50px\" icon=\"fa-reply\"></button>\n        <button pButton type=\"button\" label=\"Print\" title=\"Print document\" (click)=\"printClick()\" class=\"ui-button-secondary\" icon=\"fa-print\"></button>\n        <button pButton type=\"button\" label=\"Send mail\" title=\"Send mail\" (click)=\"sendMailClick()\" class=\"ui-button-secondary\" icon=\"fa-envelope\"></button>\n    </div>\n\n    <div *ngFor=\"let items of groups\" #doc>          \n        <table *ngIf=\"movement\" class=\"table\" style=\"width: 100%\">    \n            <thead>\n                <tr> \n                    <td colspan=\"5\"><img title=\"Header\" height=\"100\" width=\"100%\" src=\"http://{{document.location.host}}/media/header.png\" alt=\"Header not found. Upload on Settings -> Company -> Document Header\" style=\"margin: 10px 0\"></td> \n                </tr> \n                <tr> \n                    <td><strong>Number</strong></td> \n                    <td align=\"right\">{{movement.movementNumber}}</td>\n                    <td style=\"width: 20%\">&nbsp;</td>\n                    <td><strong>Store</strong></td> \n                    <td align=\"right\">{{movement.movementStore.storeName}}</td> \n                </tr> \n                <tr> \n                    <td><strong>Date</strong></td> \n                    <td align=\"right\">{{movement.movementDate | date: 'yyyy-MM-dd'}}</td>\n                    <td style=\"width: 20%\">&nbsp;</td>\n                    <td><strong>Causal</strong></td> \n                    <td align=\"right\">{{movement.movementCausal.causalName}}</td> \n                </tr> \n                <tr> \n                    <td><strong>Status</strong></td> \n                    <td align=\"right\">{{movement.movementStatus}}</td>\n                    <td style=\"width: 20%\">&nbsp;</td>\n                    <td><strong>Customer</strong></td> \n                    <td rowspan=\"3\" align=\"right\">\n                        {{movement.movementCustomer.customerName}}\n                        <br/>{{movement.movementCustomer.customerAddress}}\n                        <br/>{{movement.movementCustomer.customerCity}}\n                    </td> \n                </tr> \n                <tr> \n                    <td colspan=\"4\"><strong>Note</strong></td> \n                </tr> \n                <tr> \n                    <td colspan=\"4\">{{movement.movementNote}}</td>\n                </tr>\n            </thead>\n        </table>\n\n        <table class=\"table\" cellpadding=\"2\" cellspacing=\"2\" style=\"width: 100%\">    \n            <thead *ngIf=\"item\">\n                <tr style=\"background-color: whitesmoke\"> \n                    <td><strong>Barcode</strong></td> \n                    <td><strong>Product</strong></td> \n                    <td align=\"center\"><strong>Quantity</strong></td> \n                    <td align=\"right\"><strong>Price</strong></td> \n                    <td align=\"right\"><strong>Amount</strong></td> \n                </tr> \n            </thead>\n            <tfoot style=\"background-color: whitesmoke\">\n                <tr>\n                    <td colspan=\"2\">Amount</td>\n                    <td colspan=\"3\" align=\"right\">{{amount | currency: 'EUR' : true}}</td>\n                </tr>\n                <tr>\n                    <td colspan=\"2\">Tax 22%</td>\n                    <td colspan=\"3\" align=\"right\">{{total - amount | currency: 'EUR' : true}}</td>\n                </tr>\n                <tr>\n                    <td colspan=\"2\"><strong>Totals</strong></td>\n                    <td align=\"center\"><strong>{{totalItems}}</strong></td>\n                    <td colspan=\"2\" align=\"right\"><strong>{{total | currency: 'EUR' : true}}</strong></td>\n                </tr>\n            </tfoot>\n            <tbody> \n                <tr *ngFor=\"let item of items\" style=\"height: 39px\"> \n                    <td><span>{{item.movementArticleBarcode}}</span></td> \n                    <td><span>{{item.movementArticleProduct | articleInfo:item.movementArticleBarcode}}</span></td> \n                    <td align=\"center\"><span>{{item.movementArticleBarcode ? item.movementArticleQuantity : ''}}</span></td> \n                    <td align=\"right\"><span>{{!item.movementArticleBarcode ? '' : item.movementArticlePrice | currency: 'EUR' : true}}</span></td> \n                    <td align=\"right\"><span>{{!item.movementArticleBarcode ? '' : item.movementArticleAmount | currency: 'EUR' : true}}</span></td> \n                </tr> \n            </tbody>\n        </table>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/movement/document.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var company_service_1 = __webpack_require__("../../../../../src/app/services/company.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var DocumentComponent = (function () {
    function DocumentComponent(document, location, activatedRoute, sessionService, companyService, movementService) {
        this.document = document;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.companyService = companyService;
        this.movementService = movementService;
        this.totalItems = 0;
        this.amount = 0.0;
        this.total = 0.0;
        sessionService.title = 'Document';
    }
    DocumentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.movementId = params['id'];
            _this.movementService.getById(_this.movementId)
                .subscribe(function (result) {
                _this.movement = result;
            }, function (onerror) { return alert(onerror._body); });
            _this.movementService.getItemsById(_this.movementId)
                .subscribe(function (result) {
                // let items: MovementArticle[] = [];
                // for (let i = 0; i < 30; i++) {
                //     items.push(result[0]);
                // }
                _this.groups = [];
                var array = [];
                var index = 0;
                result.forEach(function (item) {
                    array.push(item);
                    if (index > 11) {
                        _this.groups.push(array);
                        array = [];
                        index = -1;
                    }
                    index++;
                });
                var lenght = 13 - array.length;
                for (var i = 0; i < lenght; i++) {
                    array.push(new models_1.MovementArticle());
                }
                _this.groups.push(array);
                _this.totalItems = result.map(function (p) { return p.movementArticleQuantity; }).reduce(function (sum, current) { return sum + current; });
                _this.total = result.map(function (p) { return p.movementArticleAmount; }).reduce(function (sum, current) { return sum + current; });
                _this.amount = _this.total * 100 / 122;
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    DocumentComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    DocumentComponent.prototype.printClick = function () {
        window.print();
    };
    DocumentComponent.prototype.sendMailClick = function () {
        var email = new models_1.Email();
        email.address = this.movement.movementCustomer.customerEmail;
        email.subject = 'Document n° ' + this.movement.movementNumber;
        email.content = this.doc.nativeElement.innerHTML;
        this.companyService.sendMail(email)
            .subscribe(function (result) { return alert(result.content); }, function (onerror) { return alert(onerror._body); });
    };
    return DocumentComponent;
}());
__decorate([
    core_1.ViewChild('doc'),
    __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object)
], DocumentComponent.prototype, "doc", void 0);
DocumentComponent = __decorate([
    core_1.Component({
        selector: 'document-component',
        template: __webpack_require__("../../../../../src/app/movement/document.component.html")
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _d || Object, typeof (_e = typeof company_service_1.CompanyService !== "undefined" && company_service_1.CompanyService) === "function" && _e || Object, typeof (_f = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _f || Object])
], DocumentComponent);
exports.DocumentComponent = DocumentComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=document.component.js.map

/***/ }),

/***/ "../../../../../src/app/movement/movement.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <button pButton type=\"button\" title=\"Movements\" style=\"position: absolute; top: 154px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n  \n    <p-toolbar *ngIf=\"item\">\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:60px;\">\n            <span><b>n°</b> {{item.movementNumber}}</span> <span><b>date</b>: {{item.movementDate | date: 'yyyy-MM-dd'}}</span>\n            <br/><span><b>causal</b>: {{item.movementCausal.causalName}}</span>\n            <br/><span><b>store</b>: {{item.movementStore.storeName}}</span>\n        </div>\n        <div class=\"ui-toolbar-group-right\" style=\"text-align: right;\">\n            <span><b>status</b>: {{item.movementStatus}}</span>\n            <br/><button *ngIf=\"item.movementStatus!=='Completed'\" type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"completedClick()\" label=\"Completed\" style=\"margin-top: 10px\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!inputComponent.isOpen\" [responsive]=\"true\" [editable]=\"true\" [totalRecords]=\"totalRecords\" [value]=\"items | priceFilter:priceValue:'movement':amountValue | articleFilter:articleValue\" #dt>\n        <p-header *ngIf=\"!committed\">\n            <button pButton style=\"position: absolute;left: 10px; top: 8px;\" type=\"button\" title=\"Article picker\" (click)=\"showPickerClick()\" class=\"ui-button-primary\" icon=\"fa-search-plus\"></button>\n            <p-chips [(ngModel)]=\"barcodes\" placeholder=\"barcode reading\" (onAdd)=\"addBarcode()\"></p-chips>\n        </p-header>\n        <p-footer>\n            <span style=\"float: left\"><b>{{totalRecords}}</b> rows</span>\n            <span style=\"float: right\">items <b>{{totalItems}}</b> amount <b>{{totalAmount | currency: 'EUR' : true}}</b></span>\n            <p>&nbsp;</p>\n        </p-footer>\n        <p-column field=\"movementArticleBarcode\" header=\"Barcode\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"contains\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"movementArticleProduct\" header=\"Product\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <input pInputText [(ngModel)]=\"articleValue\" placeholder=\"Search\" style=\"width: 100%;margin-top: 4px;\" styleClass=\"ui-column-filter\"/>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticleProduct | articleInfo:data.movementArticleBarcode}}\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementArticleQuantity\" header=\"Quantity\" [editable]=\"true\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"editor\">\n                <input pInputText type=\"number\" [disabled]=\"committed\" [(ngModel)]=\"data.movementArticleQuantity\" (change)=\"onUpdate(data)\"/>\n           </ng-template>\n        </p-column>\n        <p-column header=\"Price ({{priceValue||'No Filter'}})\" [editable]=\"true\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"priceValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"priceValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"editor\">\n                <input pInputText type=\"number\" min=\"0\" [disabled]=\"committed\" [(ngModel)]=\"data.movementArticlePrice\" (change)=\"onUpdate(data)\"/>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticlePrice | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n        <p-column header=\"Amount ({{amountValue||'No Filter'}})\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"amountValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"amountValue\" [min]=\"5\" [max]=\"10000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticleAmount | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n\n    <article-picker (onPicked)=\"pickerClick($event)\"></article-picker>\n</div>"

/***/ }),

/***/ "../../../../../src/app/movement/movement.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var article_picker_component_1 = __webpack_require__("../../../../../src/app/shared/article-picker.component.ts");
var MovementComponent = (function () {
    function MovementComponent(activatedRoute, sessionService, movementService, confirmationService, location) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.movementService = movementService;
        this.confirmationService = confirmationService;
        this.location = location;
        this.totalRecords = 0;
        this.totalItems = 0;
        this.totalAmount = 0.0;
        this.barcodes = [];
        sessionService.title = 'Movement';
    }
    MovementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.movementId = Number(params['id']);
            _this.movementService.getById(_this.movementId)
                .subscribe(function (result) {
                _this.item = result;
                _this.committed = result.movementStatus !== 'New';
            }, function (onerror) { return alert(onerror._body); });
            _this.movementService.getItemsById(_this.movementId)
                .subscribe(function (result) {
                _this.items = result;
                _this.updateTotals();
            }, function (onerror) { return alert(onerror._body); });
        });
    };
    MovementComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    MovementComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    MovementComponent.prototype.reloadData = function () {
        // let newItems = new Array<MovementArticle>(this.items.length);
        // for (var i = 0; i < newItems.length; i++) {
        //     newItems[i] = this.items[i];
        // }
        this.items = this.items.map(function (p) { return p; });
        this.updateTotals();
    };
    MovementComponent.prototype.updateTotals = function () {
        if (!this.items || this.items.length === 0) {
            this.totalRecords = 0;
            this.totalItems = 0;
            this.totalAmount = 0;
            return;
        }
        this.totalRecords = this.items.length;
        this.totalItems = this.items.map(function (p) { return p.movementArticleQuantity; }).reduce(function (sum, current) { return sum + current; });
        this.totalAmount = this.items.map(function (p) { return p.movementArticleAmount; }).reduce(function (sum, current) { return sum + current; });
    };
    MovementComponent.prototype.addBarcode = function () {
        var _this = this;
        this.barcodes.forEach(function (data) {
            var array = data.split('#');
            var barcode = array[0];
            var quantity = array.length === 2 ? Number(array[1]) : 1.0;
            var newItem = _this.items.find(function (p) { return p.movementArticleBarcode === barcode; });
            if (newItem) {
                newItem.movementArticleQuantity += quantity;
                _this.movementService
                    .updateItem(newItem.movementArticleId, newItem)
                    .subscribe(function (result) {
                    _this.barcodes.splice(_this.barcodes.indexOf(data), 1);
                    _this.updateTotals();
                }, function (onerror) { return alert(onerror._body); });
            }
            else {
                newItem = new models_1.MovementArticle();
                newItem.movementId = _this.movementId;
                newItem.movementArticleBarcode = barcode;
                newItem.movementArticleQuantity = quantity;
                var price = _this.item.movementCausal.causalQuantity > 0 ? 'purchase' : _this.item.movementCausal.causalQuantity < 0 ? 'selling' : 'none';
                _this.movementService
                    .createItem(newItem, price)
                    .subscribe(function (result) {
                    _this.items.push(result);
                    _this.barcodes.splice(_this.barcodes.indexOf(data), 1);
                    _this.reloadData();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    MovementComponent.prototype.showPickerClick = function () {
        this.inputComponent.loadData();
    };
    MovementComponent.prototype.pickerClick = function (event) {
        this.barcodes = this.barcodes.concat(event);
        this.addBarcode();
    };
    MovementComponent.prototype.onUpdate = function (data) {
        var _this = this;
        if (data.movementArticleQuantity === 0) {
            data.movementArticleAmount = 0;
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this item?',
                accept: function () {
                    _this.movementService
                        .deleteItem(data.movementArticleId)
                        .subscribe(function (result) {
                        _this.items.splice(_this.items.indexOf(data), 1);
                        _this.reloadData();
                    }, function (onerror) { return alert(onerror._body); });
                }
            });
        }
        else {
            this.movementService
                .updateItem(data.movementArticleId, data)
                .subscribe(function (result) {
                data.movementArticleAmount = result.movementArticleAmount;
                _this.updateTotals();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    MovementComponent.prototype.completedClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to complete this movement?',
            accept: function () {
                _this.item.movementStatus = 'Completed';
                _this.movementService.update(_this.item.movementId, _this.item)
                    .subscribe(function (result) {
                    _this.cancelClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return MovementComponent;
}());
__decorate([
    core_1.ViewChild(article_picker_component_1.ArticlePickerComponent),
    __metadata("design:type", typeof (_a = typeof article_picker_component_1.ArticlePickerComponent !== "undefined" && article_picker_component_1.ArticlePickerComponent) === "function" && _a || Object)
], MovementComponent.prototype, "inputComponent", void 0);
MovementComponent = __decorate([
    core_1.Component({
        selector: 'movement-component',
        template: __webpack_require__("../../../../../src/app/movement/movement.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _c || Object, typeof (_d = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _d || Object, typeof (_e = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _e || Object, typeof (_f = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _f || Object])
], MovementComponent);
exports.MovementComponent = MovementComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=movement.component.js.map

/***/ }),

/***/ "../../../../../src/app/movement/movements.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n            <button pButton type=\"button\" title=\"Refresh\" (click)=\"refreshClick()\" class=\"ui-button-primary\" icon=\"fa-refresh\"></button>\n            <button pButton type=\"button\" label=\"Edit\" title=\"Edit item\" (click)=\"editClick()\" [disabled]=\"!selected\" class=\"ui-button-primary\" icon=\"fa-edit\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <p-splitButton label=\"Details\" icon=\"fa-bars\" (onClick)=\"openClick()\" [model]=\"buttons\" [disabled]=\"!selected\"></p-splitButton>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"items | dateFilter:dateStartValue:dateFinishValue | priceFilter:amountValue:'movements'\"\n        selectionMode=\"single\" [(selection)]=\"selected\" [contextMenu]=\"bts\"\n        [paginator]=\"true\" [rows]=\"20\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n        <p-column field=\"movementNumber\" header=\"Number\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"movementDate\" header=\"Date\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementDate | date:'yyyy-MM-dd'}}\n            </ng-template>            \n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"dateStartValue=null;dateFinishValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'50%','float':'left'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Start\" styleClass=\"ui-column-filter\"></p-calendar>\n                <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'50%','float':'right'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Finish\" styleClass=\"ui-column-filter\"></p-calendar>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementCausal.causalName\" header=\"Causal\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"causalsFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementStore.storeName\" header=\"Store\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"storesFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementCustomer.customerName\" header=\"Customer\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"customersFiltered\" [style]=\"{'width':'100%'}\" [filter]=\"true\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementStatus\" header=\"Status\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"statusFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>\n        <p-column header=\"Amount ({{amountValue||'No Filter'}})\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"amountValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"amountValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementAmount | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n    \n    <p-contextMenu #bts [model]=\"buttons\"></p-contextMenu>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Movement</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\" *ngIf=\"selected\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.movementId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"number\">Number</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <div *ngIf=\"selected.movementStatus==='New';then new_number else current_number\"></div>\n                        <ng-template #new_number>\n                           <input pInputText type=\"number\" formControlName=\"number\" [(ngModel)]=\"selected.movementNumber\" style=\"width: 50%\"/>\n                            0 = auto increment\n                        </ng-template>\n                        <ng-template #current_number>\n                            <input pInputText disabled=\"true\" formControlName=\"number\" [(ngModel)]=\"selected.movementNumber\" style=\"width: 50%\"/>\n                        </ng-template>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['number'].valid&&dataform.controls['number'].dirty\">\n                            <i class=\"fa fa-close\"></i> Number is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"date\">Date</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-calendar formControlName=\"date\" [(ngModel)]=\"selected.movementDate\" [disabled]=\"selected.movementStatus!=='New'\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['date'].valid&&dataform.controls['date'].dirty\">\n                            <i class=\"fa fa-close\"></i> Date is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"causal\">Causal</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"causals\" formControlName=\"causal\" [(ngModel)]=\"selected.movementCausal\" [disabled]=\"selected.movementStatus!=='New'\" (onChange)=\"onCausalChange($event)\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['causal'].valid&&dataform.controls['causal'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['causal'].errors['required']\">Causal is required</span>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"selected.movementCausal.causalIsPos\" class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"device\">Device</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText disabled=\"true\" formControlName=\"device\" [(ngModel)]=\"selected.movementDevice\"/>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"store\">Store</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"stores\" formControlName=\"store\" [(ngModel)]=\"selected.movementStore\" [disabled]=\"selected.movementStatus!=='New'||selected.movementCausal.causalIsPos\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['store'].valid&&dataform.controls['store'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['store'].errors['required']\">Store is required</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"customer\">Customer</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"customers\" formControlName=\"customer\" [(ngModel)]=\"selected.movementCustomer\" [disabled]=\"selected.movementStatus!=='New'\" [filter]=\"true\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"description\">Description</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <div *ngIf=\"selected.movementStatus==='New';then new_content else content\"></div>\n                        <ng-template #new_content>\n                            <input pInputText type=\"text\" formControlName=\"description\" [(ngModel)]=\"selected.movementDesc\"/>\n                        </ng-template>\n                        <ng-template #content>\n                            <input pInputText disabled=\"true\" formControlName=\"description\" [(ngModel)]=\"selected.movementDesc\"/>\n                        </ng-template>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-12\"><hr></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"payment\">Payment</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"payments\" formControlName=\"payment\" [disabled]=\"selected.movementStatus==='Completed'\" [(ngModel)]=\"selected.movementPayment\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"status\">Status</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"getStatus\" formControlName=\"status\" [(ngModel)]=\"selected.movementStatus\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['status'].valid&&dataform.controls['status'].dirty\">\n                            <i class=\"fa fa-close\"></i> Status is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"note\">Note</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <textarea pInputTextarea formControlName=\"note\" [(ngModel)]=\"selected.movementNote\" style=\"width: 100%\"></textarea>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.movementId>0&&selected.movementStatus==='New'\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n</div>"

/***/ }),

/***/ "../../../../../src/app/movement/movements.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var store_service_1 = __webpack_require__("../../../../../src/app/services/store.service.ts");
var causal_service_1 = __webpack_require__("../../../../../src/app/services/causal.service.ts");
var customer_service_1 = __webpack_require__("../../../../../src/app/services/customer.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var FileSaver = __webpack_require__("../../../../file-saver/FileSaver.js");
var MovementsComponent = (function () {
    function MovementsComponent(router, sessionService, storeService, causalService, customerService, movementService, confirmationService, fb) {
        this.router = router;
        this.sessionService = sessionService;
        this.storeService = storeService;
        this.causalService = causalService;
        this.customerService = customerService;
        this.movementService = movementService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Movements';
    }
    MovementsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'number': new forms_1.FormControl('', forms_1.Validators.required),
            'date': new forms_1.FormControl('', forms_1.Validators.required),
            'description': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'store': new forms_1.FormControl('', forms_1.Validators.required),
            'causal': new forms_1.FormControl('', forms_1.Validators.required),
            'customer': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'device': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'payment': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'status': new forms_1.FormControl('', forms_1.Validators.required),
            'note': new forms_1.FormControl('', forms_1.Validators.nullValidator)
        });
        this.buttons = [
            { label: 'Document', icon: 'fa-print', command: function (event) { return _this.openClick('document/'); } },
            { label: 'Barcode', icon: 'fa-barcode', command: function (event) { return _this.openBarcodeClick(); } },
            { label: 'Create copy', icon: 'fa-clone', command: function (event) { return _this.cloneClick(); } }
        ];
        this.refreshClick();
        this.movementService
            .getStatus()
            .subscribe(function (result) {
            _this.status = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p.value); });
        });
        this.movementService
            .getPayments()
            .subscribe(function (result) {
            _this.payments = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p.value); });
        });
        this.storeService
            .getAll()
            .subscribe(function (result) {
            _this.stores = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.storeName); });
        });
        this.causalService
            .getAll()
            .subscribe(function (result) {
            _this.causals = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.causalName); });
            if (localStorage.getItem('webretailDevice') === null) {
                _this.causals = _this.causals.filter(function (p) { return p.value.causalIsPos === false; });
            }
        });
        this.customerService
            .getAll()
            .subscribe(function (result) {
            _this.customers = [];
            _this.customers.push({ label: '', value: null });
            _this.customers = _this.customers.concat(result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.customerName); }));
        });
        var jsonObj = JSON.parse(localStorage.getItem('webretailDevice'));
        this.device = jsonObj !== null ? jsonObj : null;
    };
    MovementsComponent.prototype.buildFilter = function (items) {
        this.storesFiltered = [];
        this.storesFiltered.push({ label: 'All', value: null });
        var filterStores = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementStore.storeName); }));
        this.storesFiltered = this.storesFiltered.concat(filterStores);
        this.causalsFiltered = [];
        this.causalsFiltered.push({ label: 'All', value: null });
        var filterCusals = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementCausal.causalName); }));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
        this.customersFiltered = [];
        this.customersFiltered.push({ label: 'All', value: null });
        var filterCustomer = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementCustomer.customerName); }));
        this.customersFiltered = this.customersFiltered.concat(filterCustomer);
        this.statusFiltered = [];
        this.statusFiltered.push({ label: 'All', value: null });
        var filterStatus = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementStatus); }));
        this.statusFiltered = this.statusFiltered.concat(filterStatus);
    };
    Object.defineProperty(MovementsComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.movementId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovementsComponent.prototype, "selectedIndex", {
        get: function () { return this.items.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovementsComponent.prototype, "getStatus", {
        get: function () {
            var _this = this;
            if (this.selected.movementId === 0) {
                return this.status.slice(0, 1);
            }
            var index = this.status.findIndex(function (p) { return p.label === _this.selected.movementStatus; });
            return this.status.slice(index, 5);
        },
        enumerable: true,
        configurable: true
    });
    MovementsComponent.prototype.refreshClick = function () {
        var _this = this;
        this.items = null;
        this.movementService
            .getAll()
            .subscribe(function (result) {
            _this.items = result;
            _this.totalRecords = _this.items.length;
            _this.buildFilter(result);
        }, function (onerror) { return alert(onerror); });
    };
    MovementsComponent.prototype.addClick = function () {
        this.selected = new models_1.Movement();
        this.currentStatus = this.selected.movementStatus;
        this.selected.movementUser = localStorage.getItem('uniqueID');
        if (this.stores.length > 0) {
            this.selected.movementStore = this.stores[0].value;
        }
        if (this.causals.length > 0) {
            this.selected.movementCausal = this.device ? this.causals.find(function (p) { return p.value.causalIsPos; }).value : this.causals[0].value;
            this.onCausalChange(null);
        }
        if (this.customers.length > 0) {
            this.selected.movementCustomer = this.customers[0].value;
        }
        if (this.status.length > 0) {
            this.selected.movementStatus = this.status[0].value;
        }
        this.displayPanel = true;
    };
    MovementsComponent.prototype.onCausalChange = function (event) {
        if (this.selected.movementCausal.causalIsPos && this.device !== null) {
            this.selected.movementDevice = this.device.deviceName;
            this.selected.movementStore = this.device.store;
        }
        else {
            this.selected.movementDevice = '';
        }
    };
    MovementsComponent.prototype.editClick = function () {
        if (!this.selected) {
            return;
        }
        this.currentStatus = this.selected.movementStatus;
        this.displayPanel = true;
    };
    MovementsComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
        this.currentStatus = null;
        this.buildFilter(this.items);
    };
    MovementsComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.movementService.create(this.selected)
                .subscribe(function (result) {
                _this.selected = result;
                _this.totalRecords++;
                _this.openClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.movementService.update(this.selected.movementId, this.selected)
                .subscribe(function (result) {
                _this.items[_this.selectedIndex] = result;
                _this.closeClick();
            }, function (onerror) {
                _this.selected.movementStatus = _this.currentStatus;
                alert(onerror._body);
            });
        }
    };
    MovementsComponent.prototype.deleteClick = function () {
        var _this = this;
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation delete on cascade',
            message: 'All related items will be deleted. Are you sure that you want to delete this movement?',
            accept: function () {
                _this.movementService.delete(_this.selected.movementId)
                    .subscribe(function (result) {
                    _this.items.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    MovementsComponent.prototype.cloneClick = function () {
        var _this = this;
        if (!this.selected) {
            return;
        }
        this.confirmationService.confirm({
            header: 'Confirmation copy',
            message: 'Are you sure that you want to create a copy of this movement?',
            accept: function () {
                _this.movementService.clone(_this.selected.movementId)
                    .subscribe(function (result) {
                    _this.selected = result;
                    _this.items.push(_this.selected);
                    _this.editClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    MovementsComponent.prototype.openClick = function (detail) {
        if (detail === void 0) { detail = ''; }
        if (!this.selected) {
            return;
        }
        this.router.navigateByUrl('movement/' + detail + this.selected.movementId);
    };
    MovementsComponent.prototype.openBarcodeClick = function () {
        var _this = this;
        if (!this.selected) {
            return;
        }
        this.movementService
            .getBarcode(this.selected.movementId)
            .subscribe(function (data) {
            var blob = new Blob([data], { type: 'application/pdf' });
            var filename = 'barcode_' + _this.selected.movementNumber + '_' + _this.selected.movementDate + '.pdf';
            FileSaver.saveAs(blob, filename);
            // var url = window.URL.createObjectURL(blob);
            // window.location.href = url;
        }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    return MovementsComponent;
}());
MovementsComponent = __decorate([
    core_1.Component({
        selector: 'movements-component',
        template: __webpack_require__("../../../../../src/app/movement/movements.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _c || Object, typeof (_d = typeof causal_service_1.CausalService !== "undefined" && causal_service_1.CausalService) === "function" && _d || Object, typeof (_e = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _e || Object, typeof (_f = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _f || Object, typeof (_g = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _g || Object, typeof (_h = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _h || Object])
], MovementsComponent);
exports.MovementsComponent = MovementsComponent;
var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=movements.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/article-filter.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ArticleFilterPipe = (function () {
    function ArticleFilterPipe() {
    }
    ArticleFilterPipe.prototype.transform = function (value, args) {
        var _this = this;
        if (!value) {
            return;
        }
        if (!args) {
            return value;
        }
        var search = args.toLowerCase();
        return value.filter(function (item) { return _this.contain(item.movementArticleProduct, search); });
    };
    ArticleFilterPipe.prototype.contain = function (item, value) {
        var info = item.productName.toLowerCase();
        var ids = item.articles[0].attributeValues.map(function (p) { return p.attributeValueId; });
        item.attributes.map(function (p) { return p.attributeValues.forEach(function (b) {
            if (ids.indexOf(b.attributeValue.attributeValueId) > -1) {
                info += " " + b.attributeValue.attributeValueName.toLowerCase();
            }
        }); });
        return info.includes(value);
    };
    return ArticleFilterPipe;
}());
ArticleFilterPipe = __decorate([
    core_1.Pipe({
        name: 'articleFilter'
    })
], ArticleFilterPipe);
exports.ArticleFilterPipe = ArticleFilterPipe;
//# sourceMappingURL=article-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/articleinfo.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ArticleInfoPipe = (function () {
    function ArticleInfoPipe() {
    }
    ArticleInfoPipe.prototype.transform = function (value, args) {
        if (value == null || value.productId === 0) {
            return '';
        }
        if (args == null) {
            return value.productName;
        }
        var barcode = args;
        var info = value.productName;
        var ids = value.articles.find(function (p) { return p.articleBarcode === barcode; }).attributeValues.map(function (p) { return p.attributeValueId; });
        value.attributes.map(function (p) { return p.attributeValues.forEach(function (b) {
            if (ids.indexOf(b.attributeValue.attributeValueId) > -1) {
                info += " " + b.attributeValue.attributeValueName;
            }
        }); });
        return info;
    };
    return ArticleInfoPipe;
}());
ArticleInfoPipe = __decorate([
    core_1.Pipe({
        name: 'articleInfo'
    })
], ArticleInfoPipe);
exports.ArticleInfoPipe = ArticleInfoPipe;
//# sourceMappingURL=articleinfo.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/category-filter.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var CategoryFilterPipe = (function () {
    function CategoryFilterPipe() {
    }
    CategoryFilterPipe.prototype.transform = function (value, args0, args1) {
        var _this = this;
        if (!value) {
            return;
        }
        if (!args0) {
            return value;
        }
        var category = args0;
        if (args1 != null) {
            return value.filter(function (item) { return _this.contain(item.movementArticleProduct.categories, category); });
        }
        return value.filter(function (item) { return _this.contain(item.categories, category); });
    };
    CategoryFilterPipe.prototype.contain = function (items, value) {
        if (!value) {
            return true;
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].category.categoryName.indexOf(value) >= 0) {
                return true;
            }
        }
        return false;
    };
    return CategoryFilterPipe;
}());
CategoryFilterPipe = __decorate([
    core_1.Pipe({
        name: 'categoryFilter'
    })
], CategoryFilterPipe);
exports.CategoryFilterPipe = CategoryFilterPipe;
//# sourceMappingURL=category-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/date-filter.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var DateFilterPipe = (function () {
    function DateFilterPipe() {
    }
    DateFilterPipe.prototype.transform = function (value, arg0, arg1) {
        var _this = this;
        if (!value) {
            return;
        }
        if (arg0 == null) {
            return value;
        }
        var dateStart = arg0;
        var dateFinish = arg1;
        if (arg1 != null) {
            return value.filter(function (item) { return _this.getDate(item) >= dateStart && _this.getDate(item) <= dateFinish; });
        }
        return value.filter(function (item) { return _this.getDate(item).toDateString() === dateStart.toDateString(); });
    };
    DateFilterPipe.prototype.getDate = function (item) {
        return new Date(item.movementDate ? item.movementDate.substring(0, 10) : item.invoiceDate.substring(0, 10));
    };
    return DateFilterPipe;
}());
DateFilterPipe = __decorate([
    core_1.Pipe({
        name: 'dateFilter'
    })
], DateFilterPipe);
exports.DateFilterPipe = DateFilterPipe;
//# sourceMappingURL=date-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/period-filter.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PeriodFilterPipe = (function () {
    function PeriodFilterPipe() {
    }
    PeriodFilterPipe.prototype.transform = function (value, arg0, arg1) {
        if (!value) {
            return;
        }
        if (arg0 == null && arg1 == null) {
            return value;
        }
        var dateStart = arg0;
        var dateFinish = arg1;
        if (arg0 != null && arg1 == null) {
            return value.filter(function (item) { return new Date(item.startAt).toISOString() === dateStart.toISOString(); });
        }
        if (arg0 == null && arg1 != null) {
            return value.filter(function (item) { return new Date(item.finishAt).toISOString() === dateFinish.toISOString(); });
        }
        return value.filter(function (item) { return new Date(item.startAt) >= dateStart && new Date(item.finishAt) <= dateFinish; });
    };
    return PeriodFilterPipe;
}());
PeriodFilterPipe = __decorate([
    core_1.Pipe({
        name: 'periodFilter'
    })
], PeriodFilterPipe);
exports.PeriodFilterPipe = PeriodFilterPipe;
//# sourceMappingURL=period-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/price-filter.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var PriceFilterPipe = (function () {
    function PriceFilterPipe() {
    }
    PriceFilterPipe.prototype.transform = function (value, args0, args1, args2) {
        if (!value) {
            return;
        }
        if (args0 == null) {
            return value;
        }
        var type = args1;
        var maxValue = args0;
        switch (type) {
            case 'discounts':
                return value.filter(function (data) { return (data.discountPercentage > 0 ? data.discountPercentage : data.discountPrice) <= maxValue; });
            case 'discount':
                var item_1 = args2;
                return value.filter(function (data) { return (item_1.discountPercentage === 0
                    ? ((data.discountProduct.productSellingPrice - item_1.discountPrice) / data.discountProduct.productSellingPrice * 100.0)
                    : data.discountProduct.productSellingPrice - (data.discountProduct.productSellingPrice * item_1.discountPercentage / 100)) <= maxValue; });
            case 'movements':
                return value.filter(function (data) { return data.movementAmount <= maxValue; });
            case 'movement':
                if (args2 == null) {
                    return value.filter(function (data) { return data.movementArticlePrice <= maxValue; });
                }
                var maxAmount_1 = args2;
                if (args0 == null) {
                    return value.filter(function (data) { return data.movementArticleAmount <= maxAmount_1; });
                }
                return value.filter(function (data) { return data.movementArticlePrice <= maxValue && data.movementArticleAmount <= maxAmount_1; });
            case 'invoices':
                return value.filter(function (data) { return data.invoiceAmount <= maxValue; });
            default:
                return value.filter(function (data) { return (data.discount ? data.discount.discountPrice : data.productSellingPrice) <= maxValue; });
        }
    };
    return PriceFilterPipe;
}());
PriceFilterPipe = __decorate([
    core_1.Pipe({
        name: 'priceFilter'
    })
], PriceFilterPipe);
exports.PriceFilterPipe = PriceFilterPipe;
//# sourceMappingURL=price-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/product/import.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n<img *ngIf=\"isBusy\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n    \n    <p-panel>\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Import</b></span>\n            </div>\n        </p-header>\n        <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-grid-col-8\">\n                    <p-dropdown [options]=\"products\" [(ngModel)]=\"productCode\" [style]=\"{'width':'100%'}\" [filter]=\"true\" styleClass=\"ui-column-filter\"></p-dropdown>                     \n                </div>\n                <div class=\"ui-grid-col-4\">\n                    <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"importClick()\" label=\"Import\" [disabled]=\"isBusy\"></button>\n                </div>\n            </div>\n        </div>  \n    </p-panel>   \n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/product/import.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var import_service_1 = __webpack_require__("../../../../../src/app/services/import.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var ImportComponent = (function () {
    function ImportComponent(sessionService, importService) {
        this.sessionService = sessionService;
        this.importService = importService;
        this.msgs = [];
        sessionService.title = 'Import';
    }
    ImportComponent.prototype.ngOnInit = function () {
        if (!this.sessionService.isAuthenticated) {
            return;
        }
        this.getProducts();
    };
    ImportComponent.prototype.getProducts = function () {
        var _this = this;
        this.isBusy = true;
        this.importService.getProducts()
            .subscribe(function (res) {
            _this.products = res.map(function (p) { return helpers_1.Helpers.newSelectItem(p.id, p.id + " : " + p.key); });
            _this.isBusy = false;
        }, function (onerror) { return _this.showError(onerror._body); });
    };
    ImportComponent.prototype.importClick = function () {
        var _this = this;
        this.isBusy = true;
        this.importService.getProductById(this.productCode)
            .subscribe(function (res) {
            _this.product = _this.convertProduct(res);
            _this.importService.create(_this.product)
                .subscribe(function (result) {
                _this.msgs.push({
                    severity: 'success',
                    summary: 'import',
                    detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                });
                _this.isBusy = false;
            }, function (onerror) { return _this.showError(onerror._body); });
        }, function (onerror) { return _this.showError(onerror._body); });
    };
    ImportComponent.prototype.showError = function (error) {
        this.msgs.push({ severity: 'error', summary: 'import', detail: error });
        this.isBusy = false;
    };
    ImportComponent.prototype.convertProduct = function (product) {
        // Brand
        var brand = new models_1.Brand();
        brand.brandName = 'Tessilnova';
        // Categories
        var category = new models_1.Category(0, product.category.desc);
        category.categoryIsPrimary = true;
        category.translations = product.category.translates.map(function (p) { return new models_1.Translation(p.code, p.value); });
        var subcategory = new models_1.Category(0, product.subcategory.desc);
        subcategory.categoryIsPrimary = false;
        subcategory.translations = product.subcategory.translates.map(function (p) { return new models_1.Translation(p.code, p.value); });
        // Texture
        var texture = product.producer.desc.replace('Tessilnova ', '');
        var textureAttribute = {
            attribute: new models_1.Attribute(0, 'Texture', [new models_1.Translation('IT', 'Tessuto')]),
            attributeValues: [
                { attributeValue: new models_1.AttributeValue(0, 0, product.producer.id.trim(), texture, []) }
            ]
        };
        // Colors
        var colors = helpers_1.Helpers.distinct(product.codarts.map(function (p) { return helpers_1.Helpers.newSelectItem(p.colorId.trim(), p.color); }));
        var colorAttribute = {
            attribute: new models_1.Attribute(0, 'Color', [new models_1.Translation('IT', 'Colore')]),
            attributeValues: colors.map(function (p) { return ({
                attributeValue: new models_1.AttributeValue(0, 0, p.value, p.label, product.translates.filter(function (t) { return t.key === p.label; }).map(function (t) { return new models_1.Translation(t.code, t.value); }))
            }); })
        };
        // Sizes
        var sizes = product.codarts.map(function (p) { return p.size; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; });
        var sizeAttribute = {
            attribute: new models_1.Attribute(0, 'Size', [new models_1.Translation('IT', 'Misura')]),
            attributeValues: sizes.map(function (p) { return ({ attributeValue: new models_1.AttributeValue(0, 0, p, p, product.translates.filter(function (t) { return t.key === p; }).map(function (t) { return new models_1.Translation(t.code, t.value); })) }); })
        };
        // Articles
        var articles = [];
        product.codarts.forEach(function (p) {
            var article = new models_1.Article();
            article.articleBarcode = p.barcode;
            article.attributeValues = [
                { attributeValue: new models_1.AttributeValue(0, 0, product.producer.id.trim(), texture, []) },
                { attributeValue: new models_1.AttributeValue(0, 0, p.colorId.trim(), p.color, []) },
                { attributeValue: new models_1.AttributeValue(0, 0, p.size, p.size, []) }
            ];
            articles.push(article);
        });
        // Medias
        var medias = product.medias.map(function (p) { return new models_1.Media(p.filename, p.url, p.number); });
        // Translations
        var translations = product
            .translates.filter(function (p) { return p.key === product.id; })
            .map(function (p) { return new models_1.Translation(p.code, p.value); });
        // Product
        var item = new models_1.Product();
        item.productCode = product.id;
        item.productName = product.name;
        item.productUm = 'QT';
        item.productSellingPrice = product.price;
        item.brand = brand;
        item.categories = [
            { productId: 0, category: category },
            { productId: 0, category: subcategory }
        ];
        item.attributes = [textureAttribute, colorAttribute, sizeAttribute];
        item.articles = articles;
        item.medias = medias;
        item.translations = product.translates.filter(function (p) { return p.key === product.id; }).map(function (p) { return new models_1.Translation(p.code, p.value); });
        return item;
    };
    return ImportComponent;
}());
ImportComponent = __decorate([
    core_1.Component({
        selector: 'import-component',
        template: __webpack_require__("../../../../../src/app/product/import.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof import_service_1.ImportService !== "undefined" && import_service_1.ImportService) === "function" && _b || Object])
], ImportComponent);
exports.ImportComponent = ImportComponent;
var _a, _b;
//# sourceMappingURL=import.component.js.map

/***/ }),

/***/ "../../../../../src/app/product/product.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n<img *ngIf=\"!productInfo||!articleForm||isBusy\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n   <button pButton type=\"button\" title=\"Products\" style=\"position: absolute; top: 144px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:60px\">\n            Code: {{product?.productCode}}\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <p-splitButton label=\"Edit\" icon=\"fa-edit\" (onClick)=\"editClick()\" [(disabled)]=\"isBusy\" [model]=\"buttons\"></p-splitButton>\n        </div>\n    </p-toolbar>\n\n    <p-tree *ngIf=\"!display\" [value]=\"productInfo\" layout=\"horizontal\" selectionMode=\"single\" [(selection)]=\"selectedNode\"></p-tree>\n    <!--<div style=\"margin-top:8px\">Selected Node => {{selectedNode ? selectedNode.type + ' : ' + selectedNode.data : 'none'}}</div>-->\n\n    <p-panel *ngIf=\"display\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:18px;display:inline-block;margin-top:6px\">Edit node</span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <p-pickList [source]=\"nodesSource\" [target]=\"nodesTarget\" [responsive]=\"true\" [showTargetControls]=\"false\"\n            (onMoveToSource)=\"removeNodes($event)\" (onMoveToTarget)=\"addNodes($event)\">\n            <ng-template let-attr pTemplate=\"item\">\n                <span>{{attr.data}}</span> | <span>{{attr.label}}</span>\n            </ng-template>\n        </p-pickList>\n    </p-panel>\n\n    <table *ngIf=\"articleForm\" class=\"table\" cellpadding=\"2\" cellspacing=\"2\">\n        <thead>\n            <tr> \n                <td *ngFor=\"let h of articleForm.header\" align=\"center\" style=\"background-color: whitesmoke\"><strong>{{h}}</strong></td> \n            </tr>\n        </thead>\n        <tfoot>\n            <tr> \n                <td style=\"background-color: whitesmoke;text-align: center;\"><strong>{{totalRecords}}</strong><br/>items</td> \n            </tr>\n        </tfoot>\n        <tbody> \n            <tr *ngFor=\"let item of articleForm.body\"> \n                <td *ngFor=\"let col of item\" align=\"center\">\n                    <input *ngIf=\"col.id>0\" pInputText type=\"text\" size=\"13\" title=\"{{col.value}}\" [(ngModel)]=\"col.value\" />\n                    <span *ngIf=\"col.id===0\" title=\"{{col.value}}\">{{col.value}}</span> \n                </td> \n            </tr> \n        </tbody>\n    </table>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/product/product.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var category_service_1 = __webpack_require__("../../../../../src/app/services/category.service.ts");
var attribute_service_1 = __webpack_require__("../../../../../src/app/services/attribute.service.ts");
var ProductComponent = (function () {
    function ProductComponent(activatedRoute, sessionService, productService, categoryService, attributeService, location) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.attributeService = attributeService;
        this.location = location;
        this.msgs = [];
        this.totalRecords = 0;
        sessionService.title = 'Product';
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            _this.productService.getProduct(id)
                .subscribe(function (result) {
                _this.product = result;
                _this.createTree();
                _this.createSheet();
            }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Get product', detail: onerror._body }); });
        });
        this.buttons = [
            { label: 'Generate items', icon: 'fa-database', command: function () { return _this.buildClick(); } },
            { label: 'Save barcodes', icon: 'fa-barcode', command: function () { return _this.saveClick(); } }
        ];
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    ProductComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    ProductComponent.prototype.closeClick = function () {
        this.display = false;
        this.selectedNode = null;
    };
    ProductComponent.prototype.createTree = function () {
        var rootNode = helpers_1.Helpers.newNode(this.product.productName, this.product.productCode, 'product');
        rootNode.expanded = this.product.articles.length === 0;
        // let producerNode = Helpers.newNode('Brand', '[]', 'brands');
        // producerNode.expanded = true;
        // producerNode.children.push(Helpers.newNode(this.product.brand.brandName, this.product.brand.brandId.toString(), 'brand'));
        // rootNode.children.push(producerNode);
        var categoriesNode = helpers_1.Helpers.newNode('Categories', '[]', 'categories');
        this.product.categories.forEach(function (elem) {
            categoriesNode.children.push(helpers_1.Helpers.newNode(elem.category.categoryName, elem.category.categoryId.toString(), 'category'));
        });
        categoriesNode.expanded = categoriesNode.children.length > 0;
        rootNode.children.push(categoriesNode);
        var attributesNode = helpers_1.Helpers.newNode('Attributes', '[]', 'attributes');
        this.product.attributes.forEach(function (elem) {
            var node = helpers_1.Helpers.newNode(elem.attribute.attributeName, elem.attribute.attributeId.toString(), "attribute:" + elem.productAttributeId);
            elem.attributeValues.forEach(function (e) {
                return node.children.push(helpers_1.Helpers.newNode(e.attributeValue.attributeValueName, e.attributeValue.attributeValueId.toString(), 'attributeValue'));
            });
            node.expanded = node.children.length > 0;
            attributesNode.children.push(node);
        });
        attributesNode.expanded = attributesNode.children.length > 0;
        rootNode.children.push(attributesNode);
        this.productInfo = [rootNode];
    };
    ProductComponent.prototype.createSheet = function () {
        var _this = this;
        this.totalRecords = this.product.articles.length;
        this.productService.getArticles(this.product.productId, '0')
            .subscribe(function (result) {
            _this.articleForm = result;
        }, function (onerror) { return alert(onerror._body); });
    };
    ProductComponent.prototype.editClick = function () {
        var _this = this;
        if (!this.selectedNode) {
            this.msgs.push({ severity: 'warn', summary: 'Warning', detail: 'A node must be selected before editing!' });
            return;
        }
        this.nodesSource = [];
        var type = this.selectedNode.type;
        switch (type) {
            case 'categories':
                this.nodesTarget = this.productInfo[0].children.find(function (p) { return p.type === 'categories'; }).children;
                this.categoryService.getAll()
                    .subscribe(function (result) {
                    result.forEach(function (p) {
                        if (_this.nodesTarget.findIndex(function (e) { return e.data === p.categoryId; }) < 0) {
                            _this.nodesSource.push(helpers_1.Helpers.newNode(p.categoryName, p.categoryId.toString(), 'category'));
                        }
                    });
                }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Get categories', detail: onerror._body }); });
                break;
            case 'attributes':
                this.nodesTarget = this.productInfo[0].children.find(function (p) { return p.type === 'attributes'; }).children;
                this.attributeService.getAll()
                    .subscribe(function (result) {
                    result.forEach(function (p) {
                        if (_this.nodesTarget.findIndex(function (e) { return e.data === p.attributeId; }) < 0) {
                            _this.nodesSource.push(helpers_1.Helpers.newNode(p.attributeName, p.attributeId.toString(), 'attribute:0'));
                        }
                    });
                }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Get attributes', detail: onerror._body }); });
                break;
            case (type.startsWith('attribute:') ? type : undefined):
                this.nodesTarget = this.productInfo[0].children.find(function (p) { return p.type === 'attributes'; })
                    .children.find(function (p) { return p.data === _this.selectedNode.data; })
                    .children;
                this.attributeService.getValueByAttributeId(this.selectedNode.data)
                    .subscribe(function (result) {
                    result.forEach(function (p) {
                        if (_this.nodesTarget.findIndex(function (e) { return e.data === p.attributeValueId; }) < 0) {
                            _this.nodesSource.push(helpers_1.Helpers.newNode(p.attributeValueName, p.attributeValueId.toString(), 'attributeValue'));
                        }
                    });
                }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Get values by attributeId', detail: onerror._body }); });
                break;
            default:
                this.msgs.push({ severity: 'warn', summary: 'warning', detail: 'You can not update anything to this node!' });
                return;
        }
        this.display = true;
    };
    ProductComponent.prototype.addNodes = function (event) {
        var _this = this;
        var productCategories = [];
        var productAttributes = [];
        var productAttributeValues = [];
        var nodes = event.items;
        nodes.forEach(function (p) {
            switch (p.type) {
                case 'category':
                    var productCategory = {
                        productId: _this.product.productId,
                        category: new models_1.Category(p.data, p.label)
                    };
                    productCategories.push(productCategory);
                    break;
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    var productAttribute = {
                        productId: _this.product.productId,
                        attribute: new models_1.Attribute(p.data, p.label, [])
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    var productAttributeValue = {
                        productAttributeId: Number(_this.selectedNode.type.split(':')[1]),
                        attributeValue: new models_1.AttributeValue(0, p.data, '', p.label, [])
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });
        if (productCategories.length > 0) {
            this.productService
                .addCategories(productCategories)
                .subscribe(function (result) { return _this.msgs.push({
                severity: 'success',
                summary: 'Success',
                detail: 'Added ' + result.length + ' categories'
            }); }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Add categories', detail: onerror._body }); });
        }
        else if (productAttributes.length > 0) {
            this.productService
                .addAttributes(productAttributes)
                .subscribe(function (result) {
                result.forEach(function (p, i) {
                    _this.nodesTarget[i].type = "attribute:" + p.productAttributeId;
                });
                _this.msgs.push({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Added ' + result.length + ' attributes'
                });
            }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Add attributes', detail: onerror._body }); });
        }
        else if (productAttributeValues.length > 0) {
            this.productService
                .addAttributeValues(productAttributeValues)
                .subscribe(function (result) { return _this.msgs.push({
                severity: 'success',
                summary: 'Success',
                detail: 'Added ' + result.length + ' attribute values'
            }); }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Add attribute values', detail: onerror._body }); });
        }
    };
    ProductComponent.prototype.removeNodes = function (event) {
        var _this = this;
        var productCategories = [];
        var productAttributes = [];
        var productAttributeValues = [];
        var nodes = event.items;
        nodes.forEach(function (p) {
            switch (p.type) {
                case 'category':
                    var productCategory = {
                        productId: _this.product.productId,
                        category: new models_1.Category(p.data, p.label)
                    };
                    productCategories.push(productCategory);
                    break;
                case (p.type.startsWith('attribute:') ? p.type : undefined):
                    var productAttribute = {
                        productId: _this.product.productId,
                        attribute: new models_1.Attribute(p.data, p.label, [])
                    };
                    productAttributes.push(productAttribute);
                    break;
                case 'attributeValue':
                    var productAttributeValue = {
                        productAttributeId: Number(_this.selectedNode.type.split(':')[1]),
                        attributeValue: new models_1.AttributeValue(0, p.data, '', p.label, [])
                    };
                    productAttributeValues.push(productAttributeValue);
                    break;
            }
        });
        if (productCategories.length > 0) {
            this.productService
                .removeCategories(productCategories)
                .subscribe(function (result) { return _this.msgs.push({
                severity: 'success',
                summary: 'Success',
                detail: 'Removed ' + result.length + ' categories'
            }); }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Remove categories', detail: onerror._body }); });
        }
        else if (productAttributes.length > 0) {
            this.productService
                .removeAttributes(productAttributes)
                .subscribe(function (result) {
                _this.msgs.push({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Removed ' + result.length + ' attributes'
                });
            }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Remove attributes', detail: onerror._body }); });
        }
        else if (productAttributeValues.length > 0) {
            this.productService
                .removeAttributeValues(productAttributeValues)
                .subscribe(function (result) { return _this.msgs.push({
                severity: 'success',
                summary: 'Success',
                detail: 'Removed ' + result.length + ' attribute values'
            }); }, function (onerror) { return _this.msgs.push({ severity: 'error', summary: 'Remove attribute Values', detail: onerror._body }); });
        }
    };
    ProductComponent.prototype.buildClick = function () {
        var _this = this;
        this.isBusy = true;
        this.productService.build(this.product.productId)
            .subscribe(function (result) {
            _this.productService.getProduct(_this.product.productId)
                .subscribe(function (res) {
                _this.product = res;
                _this.productInfo[0].expanded = false;
                _this.createSheet();
                _this.isBusy = false;
                _this.msgs.push({
                    severity: 'success',
                    summary: 'Articles build',
                    detail: 'Totals: added ' + result.added + ' updated ' + result.updated + ' deleted ' + result.deleted
                });
            });
        }, function (onerror) {
            _this.isBusy = false;
            _this.msgs.push({
                severity: 'error',
                summary: 'Articles build',
                detail: onerror._body
            });
        });
    };
    ProductComponent.prototype.saveClick = function () {
        var _this = this;
        var count = 0;
        this.isBusy = true;
        var length = this.articleForm.body.length - 1;
        var barcode = this.articleForm.body[length][this.articleForm.body[length].length - 1].value;
        this.articleForm.body
            .forEach(function (pp) {
            pp.forEach(function (p) {
                if (p.id > 0) {
                    var article = new models_1.Article();
                    article.articleId = p.id;
                    article.articleBarcode = p.value;
                    _this.productService
                        .updateArticle(p.id, article)
                        .subscribe(function (result) {
                        count++;
                        if (result.articleBarcode === barcode) {
                            _this.isBusy = false;
                            _this.msgs.push({
                                severity: 'success',
                                summary: 'Save barcodes',
                                detail: count + ' barcodes successfully saved!'
                            });
                        }
                    });
                }
            });
        });
    };
    return ProductComponent;
}());
ProductComponent = __decorate([
    core_1.Component({
        selector: 'product',
        template: __webpack_require__("../../../../../src/app/product/product.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _c || Object, typeof (_d = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" && _d || Object, typeof (_e = typeof attribute_service_1.AttributeService !== "undefined" && attribute_service_1.AttributeService) === "function" && _e || Object, typeof (_f = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _f || Object])
], ProductComponent);
exports.ProductComponent = ProductComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=product.component.js.map

/***/ }),

/***/ "../../../../../src/app/product/products.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!products\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n    \n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add product\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n            <button pButton type=\"button\" title=\"Refresh\" (click)=\"refreshClick()\" class=\"ui-button-primary\" icon=\"fa-refresh\"></button>\n            <button pButton type=\"button\" label=\"Edit\" title=\"Edit product\" (click)=\"editClick()\" [disabled]=\"!selected\" class=\"ui-button-primary\" icon=\"fa-edit\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <p-splitButton label=\"Details\" icon=\"fa-bars\" (onClick)=\"openClick()\" [model]=\"buttons\" [disabled]=\"!selected\"></p-splitButton>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"products | priceFilter:sliderValue:'price' | categoryFilter:categoryValue\" \n        selectionMode=\"single\" [(selection)]=\"selected\"\n        [paginator]=\"true\" [rows]=\"20\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n        <p-column field=\"productCode\" header=\"Code\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"productName\" header=\"Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"brand.brandName\" header=\"Brand\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"equals\" [style]=\"{'overflow':'visible'}\" >\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"brands\" [filter]=\"true\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n        </p-column>     \n        <p-column header=\"Categories\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n            <ng-template pTemplate=\"filter\" let-col>\n                <p-dropdown [options]=\"categories\" [filter]=\"true\" [style]=\"{'width':'100%'}\" [(ngModel)]=\"categoryValue\" styleClass=\"ui-column-filter\"></p-dropdown>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                <li *ngFor=\"let item of data.categories\"> {{ item.category.categoryName }} </li>\n            </ng-template>\n        </p-column>\n        <p-column header=\"Price ({{sliderValue||'No Filter'}})\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"sliderValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"sliderValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                <div *ngIf=\"data.discount;then discount_content else price_content\"></div>\n                <ng-template #discount_content>\n                    <span class=\"percentage\">-{{data.discount.discountPercentage}}%</span>\n                    <del>{{data.productSellingPrice | currency: 'EUR' : true}}</del><br><strong>{{data.discount.discountPrice | currency: 'EUR' : true}}</strong>\n                </ng-template>\n                <ng-template #price_content>\n                    {{data.productSellingPrice | currency: 'EUR' : true}}\n                </ng-template>\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Product</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.productId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"code\">Code</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"code\" [(ngModel)]=\"selected.productCode\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['code'].valid&&dataform.controls['code'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['code'].errors['required']\">Code is required</span>\n                            <span *ngIf=\"dataform.controls['code'].errors['minlength']\">Must be equals than 5 characters</span>\n                            <span *ngIf=\"dataform.controls['code'].errors['maxlength']\">Must be equals than 5 characters</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.productName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"brand\">Brand</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"allbrands\" formControlName=\"brand\" [(ngModel)]=\"selected.brand\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['brand'].valid&&dataform.controls['brand'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['brand'].errors['required']\">Brand is required</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"um\">Unit of Measure</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <p-dropdown [options]=\"ums\" formControlName=\"um\" [(ngModel)]=\"selected.productUm\" [style]=\"{'width':'100%'}\" styleClass=\"ui-column-filter\"></p-dropdown>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['um'].valid&&dataform.controls['um'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['um'].errors['required']\">Unit of Measure is required</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"selling\">Selling Price</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText type=\"number\" min=\"0\" formControlName=\"selling\" [(ngModel)]=\"selected.productSellingPrice\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['selling'].valid&&dataform.controls['selling'].dirty\">\n                            <i class=\"fa fa-close\"></i> Selling Price is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"purchase\">Purchase Price</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText type=\"number\" min=\"0\" formControlName=\"purchase\" [(ngModel)]=\"selected.productPurchasePrice\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['purchase'].valid&&dataform.controls['purchase'].dirty\">\n                            <i class=\"fa fa-close\"></i> Purchase Price is required\n                        </div>\n                    </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"isActive\">Active</label></div>\n                    <div class=\"ui-grid-col-8\"><p-inputSwitch onLabel=\"Yes\" offLabel=\"No\" formControlName=\"isActive\" [(ngModel)]=\"selected.productIsActive\"></p-inputSwitch></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"updated\">Updated</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.updatedAt | date:'yyyy-MM-dd HH:mm:ss'}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.productId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" class=\"ui-button-success\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/product/products.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var brand_service_1 = __webpack_require__("../../../../../src/app/services/brand.service.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var ProductsComponent = (function () {
    function ProductsComponent(router, sessionService, productService, brandService, confirmationService, fb) {
        this.router = router;
        this.sessionService = sessionService;
        this.productService = productService;
        this.brandService = brandService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Products';
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'brand': new forms_1.FormControl('', forms_1.Validators.required),
            'code': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(5)]),
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'um': new forms_1.FormControl('', forms_1.Validators.required),
            'selling': new forms_1.FormControl('', forms_1.Validators.required),
            'purchase': new forms_1.FormControl('', forms_1.Validators.required),
            'isActive': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.buttons = [
            { label: 'Stock', icon: 'fa-list-ol', command: function (event) { return _this.stockClick(); } },
            { label: 'Publication', icon: 'fa-shopping-cart', command: function (event) { return _this.publicationClick(); } }
        ];
        this.refreshClick();
        this.brandService.getAll()
            .subscribe(function (result) {
            _this.allbrands = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p, p.brandName); });
            _this.ums = helpers_1.Helpers.getUnitOfMeasure();
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(ProductsComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.productId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductsComponent.prototype, "selectedIndex", {
        get: function () { return this.products.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    ProductsComponent.prototype.buildFilter = function (items) {
        this.brands = [];
        this.brands.push({ label: 'All', value: null });
        var filterBrands = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.brand.brandName); }));
        this.brands = this.brands.concat(filterBrands);
        this.categories = [];
        this.categories.push({ label: 'All', value: null });
        var array = items.map(function (p) { return p.categories.map(function (c) { return c.category.categoryName; }); }).join(',');
        var filterCategories = helpers_1.Helpers.distinct(array.split(',').map(function (item) { return helpers_1.Helpers.newSelectItem(item); }));
        this.categories = this.categories.concat(filterCategories);
    };
    ProductsComponent.prototype.refreshClick = function () {
        var _this = this;
        this.products = null;
        this.productService.getProducts()
            .subscribe(function (result) {
            _this.products = result;
            _this.totalRecords = _this.products.length;
            _this.buildFilter(result);
        }, function (onerror) { return alert(onerror._body); });
    };
    ProductsComponent.prototype.openClick = function () {
        this.router.navigateByUrl('product/' + this.selected.productId);
    };
    ProductsComponent.prototype.stockClick = function () {
        this.router.navigateByUrl('product/' + this.selected.productId + '/stock');
    };
    ProductsComponent.prototype.publicationClick = function () {
        this.router.navigateByUrl('product/' + this.selected.productId + '/publication');
    };
    ProductsComponent.prototype.addClick = function () {
        this.selected = new models_1.Product();
        this.selected.brand = this.allbrands.length > 0 ? this.allbrands[0].value : null;
        this.selected.productUm = this.ums[0].value;
        this.displayPanel = true;
    };
    ProductsComponent.prototype.editClick = function () {
        this.displayPanel = true;
    };
    ProductsComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
        this.buildFilter(this.products);
    };
    ProductsComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.productService.create(this.selected)
                .subscribe(function (result) {
                _this.selected = result;
                _this.totalRecords++;
                _this.openClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.productService.update(this.selected.productId, this.selected)
                .subscribe(function (result) {
                _this.products[_this.selectedIndex] = result;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    ProductsComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All information related to this product will be deleted. Are you sure that you want to delete this product?',
            accept: function () {
                _this.productService.delete(_this.selected.productId)
                    .subscribe(function (result) {
                    _this.products.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return ProductsComponent;
}());
ProductsComponent = __decorate([
    core_1.Component({
        selector: 'products',
        template: __webpack_require__("../../../../../src/app/product/products.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _c || Object, typeof (_d = typeof brand_service_1.BrandService !== "undefined" && brand_service_1.BrandService) === "function" && _d || Object, typeof (_e = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _e || Object, typeof (_f = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _f || Object])
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=products.component.js.map

/***/ }),

/***/ "../../../../../src/app/product/publication.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [value]=\"msgs\"></p-growl>\n<p-confirmDialog width=\"425\"></p-confirmDialog>\n<img *ngIf=\"isBusy\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\" *ngIf=\"product\">\n\n    <button pButton type=\"button\" title=\"Products\" style=\"position: absolute; top: 154px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n        \n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:80px; margin-top:-12px;\">\n            <h3><strong>{{product.productName}}</strong>: {{status}}</h3>\n        </div>\n        <div class=\"ui-toolbar-group-right\" style=\"text-align: right\">\n            <button pButton type=\"button\" label=\"Save\" icon=\"fa-save\" class=\"ui-button-success\" style=\"margin-right: 20px\" (click)=\"saveClick()\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-steps [model]=\"items\" [(activeIndex)]=\"activeIndex\" styleClass=\"steps-custom\" [readonly]=\"false\"></p-steps>\n\n    <div class=\"steps-container\">\n\n        <table *ngIf=\"activeIndex<3\" class='table' cellpadding=\"2\" cellspacing=\"2\">\n            <tr>\n                <td colspan=\"3\">Selected Key: <strong>{{selectedKey}}</strong></td>\n            </tr>\n            <tr>\n                <td style=\"width: 100px\"><p-dropdown [options]=\"countries\" [(ngModel)]=\"translation.country\"></p-dropdown></td>\n                <td><textarea pInputTextarea class=\"inputtext\" [(ngModel)]=\"translation.value\"></textarea></td>\n                <td style=\"width: 50px\"><button type=\"button\" label=\"Add\" pButton (click)=\"addTranslateClick()\" icon=\"fa-plus-circle\"></button></td>\n            </tr>\n        </table>\n        \n        <div *ngIf=\"activeIndex===0\">\n            <span class=\"steps-status\">\n                <i class=\"fa fa-info-circle\" style=\"margin:4px 4px 0 0\"></i>\n                {{publicationService.step2}}\n            </span>\n            <p-panel header=\"Translated descriptions\">\n                <table class='table' cellpadding=\"2\" cellspacing=\"2\">\n                    <tbody>\n                        <tr *ngFor=\"let item of product.translations\">\n                            <td>{{item.country === \"EN\" ? 'English' : 'Italian'}}</td>\n                            <td><textarea pInputTextarea class=\"inputtext\" [(ngModel)]=\"item.value\">{{item.value}}</textarea></td>\n                            <td>\n                                <button type=\"button\" pButton (click)=\"updateTranslateClick(product.translations, item)\" icon=\"fa-save\"></button>\n                                <button type=\"button\" pButton (click)=\"deleteTranslateClick(product.translations, item)\" icon=\"fa-trash\"></button>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </p-panel>\n        </div>\n\n        <div *ngIf=\"activeIndex===1\">\n            <div class=\"steps-status\">\n                <i class=\"fa fa-info-circle\" style=\"margin:4px 4px 0 0\"></i>\n                {{publicationService.step1}}\n            </div>\n            <p-panel header=\"Translated categories\">\n                <table *ngFor=\"let c of product.categories\" class='table' style=\"margin-bottom: 5px; background-color: white;\" cellpadding=\"2\" cellspacing=\"2\">\n                    <thead>\n                        <tr>\n                            <td colspan=\"2\"><strong>{{c.category.categoryName}}</strong></td>\n                            <td style=\"width: 100px; text-align: right;\">\n                                    <button type=\"button\" label=\"Select\" pButton (click)=\"selectTranslateClick(c.category.translations, c.category.categoryName)\" icon=\"fa-plus-circle\"></button>\n                                </td>\n                            </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let item of c.category.translations\">\n                            <td>{{item.country === \"EN\" ? 'English' : 'Italian'}}</td>\n                            <td><input type=\"text\" pInputText class=\"inputtext\" [(ngModel)]=\"item.value\"/></td>\n                            <td>\n                                <button type=\"button\" pButton (click)=\"updateTranslateClick(c.category.translations, item)\" icon=\"fa-save\"></button>\n                                <button type=\"button\" pButton (click)=\"deleteTranslateClick(c.category.translations, item)\" icon=\"fa-trash\"></button>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </p-panel>    \n        </div>\n\n        <div *ngIf=\"activeIndex===2\">\n            <span class=\"steps-status\">\n                <i class=\"fa fa-info-circle\" style=\"margin:4px 4px 0 0\"></i>\n                Optional\n            </span>\n            <p-panel header=\"Translated attributes\">\n                <table *ngFor=\"let a of product.attributes\" class='table' style=\"margin-bottom: 5px; background-color: white;\" cellpadding=\"2\" cellspacing=\"2\">\n                    <tr>\n                        <td colspan=\"2\"><strong>{{a.attribute.attributeName}}</strong></td>\n                        <td style=\"width: 100px; text-align: right;\">\n                            <button type=\"button\" label=\"Select\" pButton (click)=\"selectTranslateClick(a.attribute.translations, a.attribute.attributeName)\" icon=\"fa-plus-circle\"></button>\n                        </td>\n                    </tr>\n                    <tr *ngFor=\"let item of a.attribute.translations\">\n                        <td>{{item.country === \"EN\" ? 'English' : 'Italian'}}</td>\n                        <td><input type=\"text\" pInputText class=\"inputtext\" [(ngModel)]=\"item.value\"/></td>\n                        <td>\n                            <button type=\"button\" pButton (click)=\"updateTranslateClick(a.attribute.translations, item)\" icon=\"fa-save\"></button>\n                            <button type=\"button\" pButton (click)=\"deleteTranslateClick(a.attribute.translations, item)\" icon=\"fa-trash\"></button>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td colspan=\"3\">\n                            <table *ngFor=\"let b of a.attributeValues\" class='table' style=\"margin-bottom: 5px; background-color: white;\" cellpadding=\"2\" cellspacing=\"2\">\n                                <tr>\n                                    <td colspan=\"2\"><strong>{{b.attributeValue.attributeValueName}}</strong></td>\n                                    <td style=\"width: 100px; text-align: right;\">\n                                        <button type=\"button\" label=\"Select\" pButton (click)=\"selectTranslateClick(b.attributeValue.translations, b.attributeValue.attributeValueName)\" icon=\"fa-plus-circle\"></button>\n                                    </td>\n                                </tr>\n                                <tr *ngFor=\"let item of b.attributeValue.translations\">\n                                    <td>{{item.country === \"EN\" ? 'English' : 'Italian'}}</td>\n                                    <td><input type=\"text\" pInputText class=\"inputtext\" [(ngModel)]=\"item.value\"/></td>\n                                    <td>\n                                        <button type=\"button\" pButton (click)=\"updateTranslateClick(b.attributeValue.translations, item)\" icon=\"fa-save\"></button>\n                                        <button type=\"button\" pButton (click)=\"deleteTranslateClick(b.attributeValue.translations, item)\" icon=\"fa-trash\"></button>\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </p-panel>   \n        </div>\n\n        <div *ngIf=\"activeIndex===3\">\n            <span class=\"steps-status\">\n                <i class=\"fa fa-info-circle\" style=\"margin:4px 4px 0 0\"></i>\n                {{publicationService.step4}}\n            </span>\n            <p-carousel headerText=\"Medias\" [value]=\"product.medias\">\n                <ng-template let-media pTemplate=\"item\">\n                    <div class=\"ui-grid ui-grid-responsive\" style=\"background-color: white\">\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-12\"><img src=\"{{media.url}}\" height=\"240px\" width=\"100%\" (click)=\"selectMedia(media.url);\"/></div>\n                        </div>\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-12\">\n                                <button type=\"button\" pButton icon=\"fa-trash\" style=\"margin-right: 30px\" (click)=\"deleteMediaClick(media)\"></button>\n                                <span>N°</span>\n                                <p-spinner size=\"5\" [(ngModel)]=\"media.number\"></p-spinner>\n                                <button type=\"button\" pButton icon=\"fa-save\" style=\"margin-left: 10px\" (click)=\"updateMediaClick(media)\"></button>\n                            </div>\n                        </div>\n                    </div>\n                </ng-template>\n            </p-carousel>\n            \n            <p-fileUpload name=\"files\" url=\"/api/media\" multiple=\"multiple\" accept=\"image/*\" maxFileSize=\"1000000\" \n                (onBeforeUpload)=\"onBeforeUpload($event)\" (onUpload)=\"onUpload($event)\"></p-fileUpload>\n\n            <p-panel header=\"{{selectedMedia}}\">\n                <img src=\"{{selectedMedia}}\" width=\"100%\" *ngIf=\"selectedMedia\"/>\n            </p-panel>\n        </div>\n\n        <div *ngIf=\"activeIndex===4\">\n            <span class=\"steps-status\">\n                <i class=\"fa fa-info-circle\" style=\"margin:4px 4px 0 0\"></i>\n                {{status}}\n            </span>\n            <p-panel header=\"Publish in the store\">\n                <div style=\"padding: 30px\">\n                    <p>\n                        <strong>Start</strong>\n                        <br/>\n                        <p-calendar [(ngModel)]=\"publication.publicationStartAt\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                    </p>\n                    <p>\n                        <strong>Finish</strong>\n                        <br/>\n                        <p-calendar [(ngModel)]=\"publication.publicationFinishAt\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n                    </p>\n                    <br/>\n                    <p>\n                        <strong>Featured</strong>\n                        <br/>\n                        <p-inputSwitch [(ngModel)]=\"publication.publicationFeatured\"></p-inputSwitch>\n                    </p>\n                </div>\n            </p-panel>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/product/publication.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var publication_service_1 = __webpack_require__("../../../../../src/app/services/publication.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var PublicationComponent = (function () {
    function PublicationComponent(sessionService, activatedRoute, confirmationService, publicationService, location) {
        this.sessionService = sessionService;
        this.activatedRoute = activatedRoute;
        this.confirmationService = confirmationService;
        this.publicationService = publicationService;
        this.location = location;
        this.msgs = [];
        this.activeIndex = 0;
        sessionService.title = 'Publication';
        this.countries = [];
        this.countries.push({ label: 'English', value: 'EN' });
        this.countries.push({ label: 'Italian', value: 'IT' });
    }
    Object.defineProperty(PublicationComponent.prototype, "product", {
        get: function () { return this.publicationService.product; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationComponent.prototype, "publication", {
        get: function () { return this.publicationService.publication; },
        enumerable: true,
        configurable: true
    });
    PublicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(true);
        this.translation = new models_1.Translation(this.countries[0].value, '');
        this.selectedKey = 'Description';
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            _this.publicationService.getProduct(id).subscribe(function (result) {
                _this.publicationService.product = result;
                _this.selectedArray = _this.product.translations;
                _this.categories = _this.publicationService.getCategories();
                _this.attributes = _this.publicationService.getAttributes();
                _this.publicationService.getPublication(id).subscribe(function (res) {
                    res.productId = result.productId;
                    _this.publicationService.publication = res;
                    _this.isBusy = false;
                });
            });
        });
        this.items = [{
                label: 'Translate Description',
                command: function (event) { _this.activeIndex = 0; _this.onIndexChanged(); }
            },
            {
                label: 'Translate Categories',
                command: function (event) { _this.activeIndex = 1; _this.onIndexChanged(); }
            },
            {
                label: 'Translate Attributes',
                command: function (event) { _this.activeIndex = 2; _this.onIndexChanged(); }
            },
            {
                label: 'Medias',
                command: function (event) { _this.activeIndex = 3; _this.onIndexChanged(); }
            },
            {
                label: 'Publish',
                command: function (event) { _this.activeIndex = 4; _this.onIndexChanged(); }
            }
        ];
    };
    PublicationComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
        this.msgs = null;
        this.selectedMedia = null;
        this.countries = null;
        this.publicationService.product = null;
        this.translation = null;
        this.categories = null;
        this.attributes = null;
    };
    PublicationComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    PublicationComponent.prototype.onIndexChanged = function () {
        switch (this.activeIndex) {
            case 0:
                this.selectedKey = 'Description';
                this.selectedArray = this.product.translations;
                break;
            case 1:
                this.selectedKey = this.product.categories[0].category.categoryName;
                this.selectedArray = this.product.categories[0].category.translations;
                break;
            case 2:
                this.selectedKey = this.product.attributes[0].attribute.attributeName;
                this.selectedArray = this.product.attributes[0].attribute.translations;
                break;
            default:
                break;
        }
        this.translation = new models_1.Translation(this.translation.country, '');
    };
    // Step 1 2 3
    PublicationComponent.prototype.addTranslateClick = function () {
        if (this.translation.value === '') {
            this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Translate is not empty!' });
            return;
        }
        var translate = this.publicationService.getTranslate(this.selectedArray, this.translation.country);
        if (translate) {
            this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Translate for this country alrady present!' });
            return;
        }
        var item = new models_1.Translation(this.translation.country, this.translation.value);
        this.publicationService.addTranslate(this.selectedArray, item);
        this.translation.value = '';
    };
    PublicationComponent.prototype.selectTranslateClick = function (array, key) {
        this.selectedKey = key;
        this.selectedArray = array;
        this.translation = new models_1.Translation(this.translation.country, '');
    };
    PublicationComponent.prototype.updateTranslateClick = function (array, item) {
        if (item.value === '') {
            return;
        }
        this.publicationService.updateTranslate(array, item);
        this.msgs.push({ severity: 'success', summary: 'Update translate', detail: 'Successfully updated!' });
    };
    PublicationComponent.prototype.deleteTranslateClick = function (array, item) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this translate?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: function () {
                _this.publicationService.deleteTranslate(array, item);
            }
        });
    };
    // Step 4
    PublicationComponent.prototype.onBeforeUpload = function (event) {
        // event.formData.append('codartCode', this.publicationService.codartinfo.id);
    };
    PublicationComponent.prototype.onUpload = function (event) {
        var _this = this;
        var index = this.product.medias.length;
        event.files.forEach(function (file) {
            index++;
            var media = new models_1.Media(file.name, 'media/' + file.name, index);
            _this.publicationService.addMedia(media);
        });
    };
    PublicationComponent.prototype.updateMediaClick = function (item) {
        this.publicationService.updateMedia(item);
    };
    PublicationComponent.prototype.deleteMediaClick = function (item) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to delete this media?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: function () {
                _this.publicationService.deleteMedia(item.id);
            }
        });
    };
    PublicationComponent.prototype.selectMedia = function (url) {
        this.selectedMedia = url;
    };
    PublicationComponent.prototype.saveClick = function () {
        var _this = this;
        this.isBusy = true;
        this.publicationService.saveProduct().subscribe(function (result) {
            _this.publicationService.product = result;
            _this.msgs.push({ severity: 'success', summary: 'Product', detail: 'Successfully saved!' });
            if (_this.publication.publicationStartAt) {
                if (_this.publication.publicationId === 0) {
                    _this.publicationService.create(_this.publication)
                        .subscribe(function (response) {
                        _this.isBusy = false;
                        _this.msgs.push({ severity: 'success', summary: 'Publication', detail: 'Successfully published!' });
                    });
                }
                else {
                    _this.publicationService.update(_this.publication.publicationId, _this.publication)
                        .subscribe(function (response) { return _this.isBusy = false; });
                }
            }
        });
    };
    Object.defineProperty(PublicationComponent.prototype, "status", {
        get: function () {
            var status = this.publicationService.getStatus();
            return status === 'Completed' ? this.publicationService.published ? 'Published' : 'Ready for sale' : 'Check ' + status;
        },
        enumerable: true,
        configurable: true
    });
    return PublicationComponent;
}());
PublicationComponent = __decorate([
    core_1.Component({
        selector: 'publication',
        template: __webpack_require__("../../../../../src/app/product/publication.component.html"),
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof publication_service_1.PublicationService !== "undefined" && publication_service_1.PublicationService) === "function" && _d || Object, typeof (_e = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _e || Object])
], PublicationComponent);
exports.PublicationComponent = PublicationComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=publication.component.js.map

/***/ }),

/***/ "../../../../../src/app/product/stock.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"isBusy\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n   <button pButton type=\"button\" title=\"Products\" style=\"position: absolute; top: 144px; left: 30px; width:50px;\" (click)=\"cancelClick()\" class=\"ui-button-secondary\" icon=\"fa-reply\"></button>\n    \n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\" style=\"margin-left:60px\">\n            <ul *ngIf=\"product\">\n                <li><strong>Product</strong> {{product.productName}}</li>\n                <li><strong>Brand</strong> {{product.brand.brandName}}</li>\n                <li><strong>Category</strong>\n                    <ul>\n                        <li *ngFor=\"let item of product.categories\">{{ item.category.categoryName }}</li>\n                    </ul>\n                </li>\n                <li><strong>Inventory</strong>\n                    <ul>\n                        <li>Items: <strong>{{totalRecords}}</strong></li>\n                        <li>Stock: <strong>{{totalStocks}}</strong></li>\n                        <li>Booked: <strong>{{totalBookeds}}</strong></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <p-multiSelect [options]=\"stores\" defaultLabel=\"All stores\" (onChange)=\"onStoreChanged($event)\"></p-multiSelect>\n        </div>\n    </p-toolbar>\n\n    <table *ngIf=\"articleForm\" class=\"table\" cellpadding=\"2\" cellspacing=\"2\">    \n        <thead>\n            <tr> \n                <td *ngFor=\"let h of articleForm.header\" align=\"center\" style=\"background-color: whitesmoke\"><strong>{{h}}</strong></td> \n            </tr>\n        </thead>\n        <tbody> \n            <tr *ngFor=\"let item of articleForm.body\"> \n                <td *ngFor=\"let col of item\" align=\"center\">\n                    <span *ngIf=\"col.id===0\" title=\"{{col.value}}\">{{col.value}}</span> \n                    <span *ngIf=\"col.id>0\" title=\"{{col.value}}\">{{col.stock}} - {{col.booked}}</span> \n                </td> \n            </tr> \n        </tbody>\n    </table>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/product/stock.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var store_service_1 = __webpack_require__("../../../../../src/app/services/store.service.ts");
var StockComponent = (function () {
    function StockComponent(activatedRoute, sessionService, productService, storeService, location) {
        this.activatedRoute = activatedRoute;
        this.sessionService = sessionService;
        this.productService = productService;
        this.storeService = storeService;
        this.location = location;
        this.totalRecords = 0;
        this.totalStocks = 0;
        this.totalBookeds = 0;
        sessionService.title = 'Stock';
    }
    StockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.isBusy = true;
        // Subscribe to route params
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            _this.productService.getProduct(id)
                .subscribe(function (result) {
                _this.product = result;
                _this.totalRecords = _this.product.articles.length;
                _this.createSheet('0');
            }, function (onerror) { return alert(onerror._body); });
        });
        this.storeService.getAll()
            .subscribe(function (result) {
            _this.stores = result.map(function (p) { return helpers_1.Helpers.newSelectItem(p.storeId, p.storeName); });
        }, function (onerror) { return alert(onerror._body); });
    };
    StockComponent.prototype.ngOnDestroy = function () {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    };
    StockComponent.prototype.cancelClick = function () {
        this.location.back();
    };
    StockComponent.prototype.createSheet = function (storeIds) {
        var _this = this;
        this.isBusy = true;
        if (storeIds === '') {
            storeIds = '0';
        }
        this.totalStocks = 0;
        this.totalBookeds = 0;
        this.productService.getArticles(this.product.productId, storeIds)
            .subscribe(function (result) {
            _this.articleForm = result;
            _this.articleForm.body.forEach(function (a) {
                a.forEach(function (b) {
                    _this.totalStocks += b.stock;
                    _this.totalBookeds += b.booked;
                });
            });
            _this.isBusy = false;
        }, function (onerror) { return alert(onerror._body); });
    };
    StockComponent.prototype.onStoreChanged = function (event) {
        this.createSheet(event.value.join(','));
    };
    return StockComponent;
}());
StockComponent = __decorate([
    core_1.Component({
        selector: 'stock',
        template: __webpack_require__("../../../../../src/app/product/stock.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _b || Object, typeof (_c = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _c || Object, typeof (_d = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _d || Object, typeof (_e = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _e || Object])
], StockComponent);
exports.StockComponent = StockComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=stock.component.js.map

/***/ }),

/***/ "../../../../../src/app/report/receipts.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'120px'}\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n            <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'120px','margin-left':'30px'}\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n            <button pButton type=\"button\" label=\"Show\" (click)=\"getData()\" style=\"margin-left: 50px\" class=\"ui-button-primary\" icon=\"fa-refresh\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable [value]=\"items\" sortField=\"movementDevice\" \n        rowGroupMode=\"subheader\" groupField=\"movementDevice\" expandableRowGroups=\"true\" [sortableRowGroup]=\"false\"\n        [responsive]=\"true\">\n        <p-footer>\n            <span style=\"float: left\"><b>{{totalItems}}</b> receipts</span>\n            <span style=\"float: right\">Total amount <b>{{totalAmount | currency: 'EUR' : true}}</b></span>\n            <p>&nbsp;</p>\n        </p-footer>\n        <ng-template pTemplate=\"rowgroupheader\" let-rowData>{{rowData['movementDevice']}}</ng-template>\n        <p-column field=\"movementNumber\" header=\"Number\" [sortable]=\"true\"></p-column>\n        <p-column field=\"movementDate\" header=\"Date\" [sortable]=\"true\"></p-column>\n        <p-column field=\"movementAmount\" header=\"Amount\" [sortable]=\"true\">\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                <span>{{data[col.field] | currency: 'EUR' : true}}</span>\n            </ng-template>\n        </p-column>\n        <ng-template pTemplate=\"rowgroupfooter\" let-data>\n            <td colspan=\"2\" style=\"text-align:right\">Subtotal amount</td>\n            <td><b>{{calculateGroupTotal(data['movementDevice']) | currency: 'EUR' : true }}</b></td>\n        </ng-template>\n    </p-dataTable>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/report/receipts.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var ReportReceiptsComponent = (function () {
    function ReportReceiptsComponent(sessionService, movementService) {
        this.sessionService = sessionService;
        this.movementService = movementService;
        this.totalItems = 0;
        this.totalAmount = 0.0;
        sessionService.title = 'Receipts';
    }
    ReportReceiptsComponent.prototype.ngOnInit = function () {
        this.sessionService.checkCredentials(false);
        this.period = new models_1.Period();
        this.getData();
    };
    Object.defineProperty(ReportReceiptsComponent.prototype, "dateStartValue", {
        get: function () {
            return this.period.start;
        },
        set: function (value) {
            this.period.start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportReceiptsComponent.prototype, "dateFinishValue", {
        get: function () {
            return this.period.finish;
        },
        set: function (value) {
            this.period.finish = value;
        },
        enumerable: true,
        configurable: true
    });
    ReportReceiptsComponent.prototype.calculateGroupTotal = function (device) {
        var total = 0;
        if (this.items) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var movemet = _a[_i];
                if (movemet.movementDevice === device) {
                    total += movemet.movementAmount;
                }
            }
        }
        return total;
    };
    ReportReceiptsComponent.prototype.updateTotals = function () {
        this.totalItems = this.items.length;
        if (this.totalItems > 0) {
            this.totalAmount = this.items.map(function (p) { return p.movementAmount; }).reduce(function (sum, current) { return sum + current; });
        }
    };
    ReportReceiptsComponent.prototype.getData = function () {
        var _this = this;
        this.movementService
            .getReceipted(this.period)
            .subscribe(function (result) {
            _this.items = result;
            _this.updateTotals();
        }, function (onerror) { return alert(onerror._body); });
    };
    return ReportReceiptsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ReportReceiptsComponent.prototype, "dateStartValue", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ReportReceiptsComponent.prototype, "dateFinishValue", null);
ReportReceiptsComponent = __decorate([
    core_1.Component({
        selector: 'reportreceipts-component',
        template: __webpack_require__("../../../../../src/app/report/receipts.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _b || Object])
], ReportReceiptsComponent);
exports.ReportReceiptsComponent = ReportReceiptsComponent;
var _a, _b;
//# sourceMappingURL=receipts.component.js.map

/***/ }),

/***/ "../../../../../src/app/report/sales.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"!items\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'120px'}\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n            <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'120px','margin-left':'30px'}\" dateFormat=\"yy-mm-dd\" [showIcon]=\"true\"></p-calendar>\n            <button pButton type=\"button\" label=\"Show\" (click)=\"getData()\" style=\"margin-left: 50px\" class=\"ui-button-primary\" icon=\"fa-refresh\"></button>\n        </div>\n    </p-toolbar>\n\n    <p-dataTable [value]=\"items | priceFilter:priceValue:'movement':amountValue | articleFilter:articleValue | categoryFilter:categoryValue:'sales'\" [totalRecords]=\"totalRecords\" [responsive]=\"true\" #dt>\n        <p-footer>\n            <span style=\"float: left\"><b>{{totalItems}}</b> receipts</span>\n            <span style=\"float: right\">Total amount <b>{{totalAmount | currency: 'EUR' : true}}</b></span>\n            <p>&nbsp;</p>\n        </p-footer>\n        <p-column field=\"movementArticleProduct.brand.brandName\" header=\"Brand\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" filterMatchMode=\"contains\"></p-column>     \n        <p-column header=\"Categories\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n            <ng-template pTemplate=\"filter\" let-col>\n               <input pInputText [(ngModel)]=\"categoryValue\" placeholder=\"Search\" style=\"width: 100%;margin-top: 4px;\" styleClass=\"ui-column-filter\"/>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                <li *ngFor=\"let item of data.movementArticleProduct.categories\"> {{item.category.categoryName}} </li>\n            </ng-template>\n        </p-column>\n        <p-column header=\"Product\" [sortable]=\"true\" [filter]=\"true\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <input pInputText [(ngModel)]=\"articleValue\" placeholder=\"Search\" style=\"width: 100%;margin-top: 4px;\" styleClass=\"ui-column-filter\"/>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticleProduct | articleInfo:data.movementArticleBarcode}}\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementArticleQuantity\" header=\"Quantity\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n        <p-column field=\"movementArticlePrice\" header=\"Price ({{priceValue||'No Filter'}})\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"priceValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"priceValue\" [min]=\"1\" [max]=\"1000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticlePrice | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n        <p-column field=\"movementArticleAmount\" header=\"Amount ({{amountValue||'No Filter'}})\" [editable]=\"false\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n            <ng-template pTemplate=\"filter\" let-col>\n                <i class=\"fa fa-close\" (click)=\"amountValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n                <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"amountValue\" [min]=\"1\" [max]=\"10000\"></p-slider>\n            </ng-template>\n            <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n                {{data.movementArticleAmount | currency: 'EUR' : true}}\n            </ng-template>\n        </p-column>\n    </p-dataTable>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/report/sales.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var ReportSalesComponent = (function () {
    function ReportSalesComponent(sessionService, movementService) {
        this.sessionService = sessionService;
        this.movementService = movementService;
        this.totalItems = 0;
        this.totalAmount = 0.0;
        sessionService.title = 'Sales';
    }
    ReportSalesComponent.prototype.ngOnInit = function () {
        this.sessionService.checkCredentials(true);
        this.period = new models_1.Period();
        this.getData();
    };
    Object.defineProperty(ReportSalesComponent.prototype, "dateStartValue", {
        get: function () {
            return this.period.start;
        },
        set: function (value) {
            this.period.start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportSalesComponent.prototype, "dateFinishValue", {
        get: function () {
            return this.period.finish;
        },
        set: function (value) {
            this.period.finish = value;
        },
        enumerable: true,
        configurable: true
    });
    ReportSalesComponent.prototype.calculateGroupTotal = function (brand) {
        var total = 0;
        if (this.items) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var movemet = _a[_i];
                if (movemet.movementArticleProduct.brand.brandName === brand) {
                    total += movemet.movementArticleAmount;
                }
            }
        }
        return total;
    };
    ReportSalesComponent.prototype.getData = function () {
        var _this = this;
        this.movementService
            .getSales(this.period)
            .subscribe(function (result) {
            _this.items = result;
            _this.totalItems = result.length;
            if (_this.totalItems > 0) {
                _this.totalAmount = _this.items.map(function (p) { return p.movementArticleAmount; }).reduce(function (sum, current) { return sum + current; });
            }
        }, function (onerror) { return alert(onerror._body); });
    };
    return ReportSalesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ReportSalesComponent.prototype, "dateStartValue", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ReportSalesComponent.prototype, "dateFinishValue", null);
ReportSalesComponent = __decorate([
    core_1.Component({
        selector: 'reportsales-component',
        template: __webpack_require__("../../../../../src/app/report/sales.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _b || Object])
], ReportSalesComponent);
exports.ReportSalesComponent = ReportSalesComponent;
var _a, _b;
//# sourceMappingURL=sales.component.js.map

/***/ }),

/***/ "../../../../../src/app/report/statistics.component.html":
/***/ (function(module, exports) {

module.exports = "<img *ngIf=\"isBusy\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <p-dropdown [(ngModel)]=\"selectedYear\" [editable]=\"true\" [options]=\"years\" [style]=\"{'width':'100px'}\"></p-dropdown>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <button type=\"button\" pButton (click)=\"showCategory()\" [disabled]=\"isBusy\" label=\"Category\" icon=\"fa-refresh\"></button>\n            <button type=\"button\" pButton (click)=\"showProduct()\" [disabled]=\"isBusy\" label=\"Product\" icon=\"fa-refresh\"></button>\n        </div>\n    </p-toolbar>\n\n    <div>\n        <p-chart #saleChart type=\"line\" [data]=\"sales\" [options]=\"saleOptions\"></p-chart>\n        <br/>\n        <p-chart #deviceChart type=\"doughnut\" [data]=\"devices\" [options]=\"deviceOptions\" style=\"float: left; width: 48%;\"></p-chart>\n        <p-chart #totalChart type=\"polarArea\" [data]=\"totals\" [options]=\"totalOptions\" style=\"float: right; width: 48%;\"></p-chart>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/report/statistics.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var statistic_service_1 = __webpack_require__("../../../../../src/app/services/statistic.service.ts");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var StatisticsComponent = (function () {
    function StatisticsComponent(sessionService, statisticService) {
        this.sessionService = sessionService;
        this.statisticService = statisticService;
        sessionService.title = 'Statistics';
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.sessionService.checkCredentials(true);
        this.deviceOptions = {
            title: {
                display: true,
                text: 'Amount of devices'
            },
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20
                }
            }
        };
        this.saleOptions = {
            title: {
                display: true
            },
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20
                }
            }
        };
        this.totalOptions = {
            title: {
                display: true
            },
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20
                }
            }
        };
        this.showDevice();
        this.years = [];
        this.selectedYear = new Date().getFullYear();
        for (var i = 2017; i <= this.selectedYear; i++) {
            this.years.push({ label: i.toString(), value: i });
        }
        this.showCategory();
    };
    StatisticsComponent.prototype.showDevice = function () {
        var _this = this;
        this.statisticService.getUseByDeviceAsync().subscribe(function (result) {
            _this.devices = result;
            _this.totals = result;
            _this.delay(1000).then(function () { return _this.deviceChart.refresh(); });
        });
    };
    StatisticsComponent.prototype.showCategory = function () {
        var _this = this;
        this.isBusy = true;
        this.saleOptions.title.text = 'Sales for month of top 15 categories';
        this.totalOptions.title.text = 'Amount of categories';
        this.statisticService.getCategoryByYearAsync(this.selectedYear).subscribe(function (result) {
            _this.totals = result;
            _this.statisticService.getCategoryForMonthByYearAsync(_this.selectedYear).subscribe(function (res) {
                _this.sales = res;
                _this.refresh();
            });
        });
    };
    StatisticsComponent.prototype.showProduct = function () {
        var _this = this;
        this.isBusy = true;
        this.saleOptions.title.text = 'Sales for month of top 15 products';
        this.totalOptions.title.text = 'Amount of products';
        this.statisticService.getProductByYearAsync(this.selectedYear).subscribe(function (result) {
            _this.totals = result;
            _this.statisticService.getProductForMonthByYearAsync(_this.selectedYear).subscribe(function (res) {
                _this.sales = res;
                _this.refresh();
            });
        });
    };
    StatisticsComponent.prototype.refresh = function () {
        var _this = this;
        this.delay(1000).then(function () {
            _this.saleChart.refresh();
            _this.totalChart.refresh();
            _this.isBusy = false;
        });
    };
    StatisticsComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return StatisticsComponent;
}());
__decorate([
    core_1.ViewChild('deviceChart'),
    __metadata("design:type", typeof (_a = typeof primeng_1.UIChart !== "undefined" && primeng_1.UIChart) === "function" && _a || Object)
], StatisticsComponent.prototype, "deviceChart", void 0);
__decorate([
    core_1.ViewChild('saleChart'),
    __metadata("design:type", typeof (_b = typeof primeng_1.UIChart !== "undefined" && primeng_1.UIChart) === "function" && _b || Object)
], StatisticsComponent.prototype, "saleChart", void 0);
__decorate([
    core_1.ViewChild('totalChart'),
    __metadata("design:type", typeof (_c = typeof primeng_1.UIChart !== "undefined" && primeng_1.UIChart) === "function" && _c || Object)
], StatisticsComponent.prototype, "totalChart", void 0);
StatisticsComponent = __decorate([
    core_1.Component({
        selector: 'statistics-component',
        template: __webpack_require__("../../../../../src/app/report/statistics.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _d || Object, typeof (_e = typeof statistic_service_1.StatisticService !== "undefined" && statistic_service_1.StatisticService) === "function" && _e || Object])
], StatisticsComponent);
exports.StatisticsComponent = StatisticsComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=statistics.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/account.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
    }
    AccountService.prototype.getAll = function () {
        return this.http.get('/api/account', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AccountService.prototype.getById = function (id) {
        return this.http.get('/api/account/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AccountService.prototype.create = function (model) {
        return this.http.post('/api/account', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AccountService.prototype.update = function (id, model) {
        return this.http.put('/api/account/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AccountService.prototype.delete = function (id) {
        return this.http.delete('/api/account/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AccountService);
exports.AccountService = AccountService;
var _a;
//# sourceMappingURL=account.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/attribute.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var AttributeService = (function () {
    function AttributeService(http) {
        this.http = http;
    }
    AttributeService.prototype.getAll = function () {
        return this.http.get('/api/attribute', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.getById = function (id) {
        return this.http.get('/api/attribute/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.create = function (model) {
        return this.http.post('/api/attribute', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.update = function (id, model) {
        return this.http.put('/api/attribute/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.delete = function (id) {
        return this.http.delete('/api/attribute/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.getValueAll = function () {
        return this.http.get('/api/attributevalue', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.getValueByAttributeId = function (id) {
        return this.http.get('/api/attribute/' + id + '/value', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.getValueById = function (id) {
        return this.http.get('/api/attributevalue/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.createValue = function (model) {
        return this.http.post('/api/attributevalue', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.updateValue = function (id, model) {
        return this.http.put('/api/attributevalue/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    AttributeService.prototype.deleteValue = function (id) {
        return this.http.delete('/api/attributevalue/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return AttributeService;
}());
AttributeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AttributeService);
exports.AttributeService = AttributeService;
var _a;
//# sourceMappingURL=attribute.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/brand.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var BrandService = (function () {
    function BrandService(http) {
        this.http = http;
    }
    BrandService.prototype.getAll = function () {
        return this.http.get('/api/brand', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    BrandService.prototype.getById = function (id) {
        return this.http.get('/api/brand/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    BrandService.prototype.create = function (model) {
        return this.http.post('/api/brand', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    BrandService.prototype.update = function (id, model) {
        return this.http.put('/api/brand/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    BrandService.prototype.delete = function (id) {
        return this.http.delete('/api/brand/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return BrandService;
}());
BrandService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], BrandService);
exports.BrandService = BrandService;
var _a;
//# sourceMappingURL=brand.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/category.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var CategoryService = (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.getAll = function () {
        return this.http.get('/api/category', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CategoryService.prototype.getById = function (id) {
        return this.http.get('/api/category/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CategoryService.prototype.create = function (model) {
        return this.http.post('/api/category', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CategoryService.prototype.update = function (id, model) {
        return this.http.put('/api/category/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CategoryService.prototype.delete = function (id) {
        return this.http.delete('/api/category/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return CategoryService;
}());
CategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], CategoryService);
exports.CategoryService = CategoryService;
var _a;
//# sourceMappingURL=category.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/causal.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var CausalService = (function () {
    function CausalService(http) {
        this.http = http;
    }
    CausalService.prototype.getAll = function () {
        return this.http.get('/api/causal', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CausalService.prototype.getById = function (id) {
        return this.http.get('/api/causal/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CausalService.prototype.create = function (model) {
        return this.http.post('/api/causal', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CausalService.prototype.update = function (id, model) {
        return this.http.put('/api/causal/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CausalService.prototype.delete = function (id) {
        return this.http.delete('/api/causal/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return CausalService;
}());
CausalService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], CausalService);
exports.CausalService = CausalService;
var _a;
//# sourceMappingURL=causal.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/company.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    CompanyService.prototype.get = function () {
        return this.http.get('/api/company', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CompanyService.prototype.create = function (model) {
        return this.http.post('/api/company', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CompanyService.prototype.update = function (model) {
        return this.http.put('/api/company', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CompanyService.prototype.sendMail = function (model) {
        return this.http.post('/api/email', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], CompanyService);
exports.CompanyService = CompanyService;
var _a;
//# sourceMappingURL=company.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/customer.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
    }
    CustomerService.prototype.getAll = function () {
        return this.http.get('/api/customer', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CustomerService.prototype.getById = function (id) {
        return this.http.get('/api/customer/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CustomerService.prototype.create = function (model) {
        return this.http.post('/api/customer', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CustomerService.prototype.update = function (id, model) {
        return this.http.put('/api/customer/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    CustomerService.prototype.delete = function (id) {
        return this.http.delete('/api/customer/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], CustomerService);
exports.CustomerService = CustomerService;
var _a;
//# sourceMappingURL=customer.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/device.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var DeviceService = (function () {
    function DeviceService(http) {
        this.http = http;
    }
    DeviceService.prototype.getAll = function () {
        return this.http.get('/api/device', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DeviceService.prototype.getById = function (id) {
        return this.http.get('/api/device/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DeviceService.prototype.create = function (model) {
        return this.http.post('/api/device', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DeviceService.prototype.update = function (id, model) {
        return this.http.put('/api/device/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DeviceService.prototype.delete = function (id) {
        return this.http.delete('/api/device/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return DeviceService;
}());
DeviceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], DeviceService);
exports.DeviceService = DeviceService;
var _a;
//# sourceMappingURL=device.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/discount.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var DiscountService = (function () {
    function DiscountService(http) {
        this.http = http;
    }
    DiscountService.prototype.getAll = function () {
        return this.http.get('/api/discount', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.getById = function (id) {
        return this.http.get('/api/discount/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.getItemsById = function (id) {
        return this.http.get('/api/discount/' + id + '/product', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.getByProductId = function (productId) {
        return this.http.get('/api/product/' + productId + '/discount', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.create = function (model) {
        return this.http.post('/api/discount', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.update = function (id, model) {
        return this.http.put('/api/discount/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.delete = function (id) {
        return this.http.delete('/api/discount/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.addProduct = function (model) {
        return this.http.post('/api/discountproduct', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    DiscountService.prototype.removeProduct = function (id) {
        return this.http.delete('/api/discountproduct/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return DiscountService;
}());
DiscountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], DiscountService);
exports.DiscountService = DiscountService;
var _a;
//# sourceMappingURL=discount.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/import.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var ImportService = (function () {
    function ImportService(http) {
        this.http = http;
        this.apiRoot = 'http://www.tessilnova.com';
    }
    ImportService.prototype.getProducts = function () {
        var apiURL = this.apiRoot + "/api/codart/products";
        return this.http.get(apiURL, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ImportService.prototype.getProductById = function (id) {
        var apiURL = this.apiRoot + "/api/codart/" + id;
        return this.http.get(apiURL, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ImportService.prototype.create = function (model) {
        return this.http.post('/api/product/import', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return ImportService;
}());
ImportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], ImportService);
exports.ImportService = ImportService;
var _a;
//# sourceMappingURL=import.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/invoice.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var InvoiceService = (function () {
    function InvoiceService(http) {
        this.http = http;
    }
    InvoiceService.prototype.getPayments = function () {
        return this.http.get('/api/invoicepayment', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.getAll = function () {
        return this.http.get('/api/invoice', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.getById = function (id) {
        return this.http.get('/api/invoice/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.create = function (model) {
        return this.http.post('/api/invoice', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.update = function (id, model) {
        return this.http.put('/api/invoice/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.delete = function (id) {
        return this.http.delete('/api/invoice/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.getMovementsById = function (id) {
        return this.http.get('/api/invoicemovement/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.getMovementArticlesById = function (id) {
        return this.http.get('/api/invoicemovementarticle/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.addMovement = function (id, movementId) {
        var json = { value: movementId.toString() };
        return this.http.post('/api/invoicemovement/' + id, json, { headers: helpers_1.Helpers.getHeaders() }).map(function (result) { return result.json(); });
    };
    InvoiceService.prototype.removeMovement = function (id) {
        return this.http.delete('/api/invoicemovement/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return InvoiceService;
}());
InvoiceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], InvoiceService);
exports.InvoiceService = InvoiceService;
var _a;
//# sourceMappingURL=invoice.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/movement.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var MovementService = (function () {
    function MovementService(http) {
        this.http = http;
    }
    MovementService.prototype.getAll = function () {
        return this.http.get('/api/movement', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getSales = function (period) {
        return this.http.post('/api/movementsales', period, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getReceipted = function (period) {
        return this.http.post('/api/movementreceipted', period, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getById = function (id) {
        return this.http.get('/api/movement/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getByCustomerId = function (id) {
        return this.http.get('/api/movementcustomer/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.create = function (model) {
        return this.http.post('/api/movement', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.clone = function (id) {
        return this.http.post('/api/movement/' + id, null, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.update = function (id, model) {
        return this.http.put('/api/movement/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.delete = function (id) {
        return this.http.delete('/api/movement/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getItemsById = function (movementId) {
        return this.http.get('/api/movementarticle/' + movementId, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.createItem = function (model, price) {
        return this.http.post('/api/movementarticle/' + price, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.updateItem = function (id, model) {
        return this.http.put('/api/movementarticle/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.deleteItem = function (id) {
        return this.http.delete('/api/movementarticle/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getStatus = function () {
        return this.http.get('/api/movementstatus', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getPayments = function () {
        return this.http.get('/api/movementpayment', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    MovementService.prototype.getBarcode = function (movementId) {
        return this.http.get('/api/pdf/barcode/' + movementId, { headers: helpers_1.Helpers.getHeaders(), responseType: http_1.ResponseContentType.Blob })
            .map(function (result) { return result.blob(); });
    };
    return MovementService;
}());
MovementService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], MovementService);
exports.MovementService = MovementService;
var _a;
//# sourceMappingURL=movement.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/product.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
    }
    ProductService.prototype.getProducts = function () {
        return this.http.get('api/product', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.getProduct = function (id) {
        return this.http.get('/api/product/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.getArticles = function (id, storeIds) {
        return this.http.get('/api/product/' + id + '/store/' + storeIds, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.updateArticle = function (id, model) {
        return this.http.put('/api/article/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.create = function (model) {
        return this.http.post('/api/product', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.update = function (id, model) {
        return this.http.put('/api/product/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.delete = function (id) {
        return this.http.delete('/api/product/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.addCategories = function (models) {
        return this.http.post('/api/productcategory', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.removeCategories = function (models) {
        return this.http.put('/api/productcategory', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.addAttributes = function (models) {
        return this.http.post('/api/productattribute', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.removeAttributes = function (models) {
        return this.http.put('/api/productattribute', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.addAttributeValues = function (models) {
        return this.http.post('/api/productattributevalue', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.removeAttributeValues = function (models) {
        return this.http.put('/api/productattributevalue', models, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    ProductService.prototype.build = function (id) {
        return this.http.get('/api/product/' + id + '/build', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], ProductService);
exports.ProductService = ProductService;
var _a;
//# sourceMappingURL=product.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/publication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var PublicationService = (function () {
    function PublicationService(http) {
        this.http = http;
    }
    PublicationService.prototype.getProduct = function (id) {
        return this.http.get('api/product/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    PublicationService.prototype.getPublication = function (productId) {
        return this.http.get('/api/product/' + productId + '/publication', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    PublicationService.prototype.saveProduct = function () {
        return this.http.put('api/product/' + this.product.productId + '/publication', this.product, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    PublicationService.prototype.create = function (model) {
        return this.http.post('/api/publication', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    PublicationService.prototype.update = function (id, model) {
        return this.http.put('/api/publication/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    PublicationService.prototype.delete = function (id) {
        return this.http.delete('/api/publication/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    Object.defineProperty(PublicationService.prototype, "translateDescriptions", {
        get: function () { return this.product.translations; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationService.prototype, "translateAttributes", {
        get: function () {
            var items = [];
            this.product.attributes.forEach(function (p) {
                p.attribute.translations.map(function (t) { return items.push(t); });
                p.attributeValues.forEach(function (v) { return v.attributeValue.translations.map(function (t) { return items.push(t); }); });
            });
            return items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationService.prototype, "published", {
        get: function () { return this.publication != null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationService.prototype, "step1", {
        get: function () { return this.product.translations.length === 2 ? 'Completed' : 'In progress'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationService.prototype, "step2", {
        get: function () { return this.product.categories.map(function (p) { return p.category.translations.length === 2; }) ? 'Completed' : 'In progress'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PublicationService.prototype, "step4", {
        get: function () { return this.product.medias.length > 0 ? 'Completed' : 'In progress'; },
        enumerable: true,
        configurable: true
    });
    PublicationService.prototype.getStatus = function () {
        if (this.step1 !== 'Completed') {
            return 'step 1';
        }
        else if (this.step2 !== 'Completed') {
            return 'step 2';
        }
        else if (this.step4 !== 'Completed') {
            return 'step 4';
        }
        return 'Completed';
    };
    PublicationService.prototype.getCategories = function () {
        return this.product.categories.map(function (p) { return helpers_1.Helpers.newSelectItem(p.category.categoryName); });
    };
    PublicationService.prototype.getAttributes = function () {
        var items = [];
        this.product.attributes.forEach(function (p) {
            items.push(helpers_1.Helpers.newSelectItem(p.attribute.attributeName));
            p.attributeValues.forEach(function (v) { return items.push(helpers_1.Helpers.newSelectItem(v.attributeValue.attributeValueName)); });
        });
        return items;
    };
    PublicationService.prototype.getTranslate = function (array, country) {
        return array.find(function (p) { return p.country === country; });
    };
    PublicationService.prototype.addTranslate = function (array, item) {
        array.push(item);
    };
    PublicationService.prototype.updateTranslate = function (array, item) {
        var translate = this.getTranslate(array, item.country);
        translate.value = item.value;
    };
    PublicationService.prototype.deleteTranslate = function (array, item) {
        var index = array.indexOf(item);
        array.splice(index, 1);
    };
    PublicationService.prototype.addMedia = function (item) {
        this.product.medias.push(item);
    };
    PublicationService.prototype.updateMedia = function (item) {
        var media = this.product.medias.find(function (p) { return p.name === item.name; });
        media.number = item.number;
    };
    PublicationService.prototype.deleteMedia = function (item) {
        var index = this.product.medias.indexOf(item);
        this.product.medias.splice(index, 1);
    };
    return PublicationService;
}());
PublicationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], PublicationService);
exports.PublicationService = PublicationService;
var _a;
//# sourceMappingURL=publication.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/session.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var SessionService = (function () {
    function SessionService(router, http) {
        this.router = router;
        this.http = http;
        this.title = '';
    }
    SessionService.prototype.login = function (user) {
        var body = { username: user.username, password: user.password };
        return this.http.post('/api/login', body, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (response) { return response.json(); });
    };
    SessionService.prototype.logout = function () {
        var body = { token: localStorage.getItem('token') };
        this.http.post('/api/logout', body, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (response) { return response.json(); })
            .subscribe(function (result) { return result; });
        this.removeCredentials();
    };
    SessionService.prototype.grantCredentials = function (data) {
        localStorage.setItem('uniqueID', data.uniqueID);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.router.navigate(['home']);
    };
    SessionService.prototype.removeCredentials = function () {
        localStorage.removeItem('uniqueID');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['home']);
    };
    Object.defineProperty(SessionService.prototype, "isAuthenticated", {
        get: function () {
            return localStorage.getItem('token') != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "isAdmin", {
        get: function () {
            return localStorage.getItem('role') === 'Admin';
        },
        enumerable: true,
        configurable: true
    });
    SessionService.prototype.checkCredentials = function (isAdmin) {
        if (!this.isAuthenticated || isAdmin && !this.isAdmin) {
            this.removeCredentials();
        }
    };
    SessionService.prototype.getCredentials = function () {
        return this.http.get('/api/authenticated', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (response) { return response.json(); });
    };
    return SessionService;
}());
SessionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _b || Object])
], SessionService);
exports.SessionService = SessionService;
var _a, _b;
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/statistic.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var StatisticService = (function () {
    function StatisticService(http) {
        this.http = http;
    }
    StatisticService.prototype.getUseByDeviceAsync = function () {
        return this.http.get('/api/statistic/device', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StatisticService.prototype.getCategoryByYearAsync = function (year) {
        return this.http.get('/api/statistic/category/' + year, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StatisticService.prototype.getCategoryForMonthByYearAsync = function (year) {
        return this.http.get('/api/statistic/categoryformonth/' + year, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StatisticService.prototype.getProductByYearAsync = function (year) {
        return this.http.get('/api/statistic/product/' + year, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StatisticService.prototype.getProductForMonthByYearAsync = function (year) {
        return this.http.get('/api/statistic/productformonth/' + year, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return StatisticService;
}());
StatisticService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], StatisticService);
exports.StatisticService = StatisticService;
var _a;
//# sourceMappingURL=statistic.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/store.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var StoreService = (function () {
    function StoreService(http) {
        this.http = http;
    }
    StoreService.prototype.getAll = function () {
        return this.http.get('/api/store', { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StoreService.prototype.getById = function (id) {
        return this.http.get('/api/store/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StoreService.prototype.create = function (model) {
        return this.http.post('/api/store', model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StoreService.prototype.update = function (id, model) {
        return this.http.put('/api/store/' + id, model, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    StoreService.prototype.delete = function (id) {
        return this.http.delete('/api/store/' + id, { headers: helpers_1.Helpers.getHeaders() })
            .map(function (result) { return result.json(); });
    };
    return StoreService;
}());
StoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], StoreService);
exports.StoreService = StoreService;
var _a;
//# sourceMappingURL=store.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/article-picker.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dataTable *ngIf=\"isOpen\" [responsive]=\"true\" [value]=\"products | priceFilter:sliderValue | categoryFilter:categoryValue\" \n    selectionMode=\"single\" (onRowSelect)=\"onRowSelect($event)\"\n    rowExpandMode=\"single\" expandableRows=\"true\" (onRowExpand)=\"onRowExpand($event)\"\n    [paginator]=\"true\" [rows]=\"10\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n    <p-header>\n        <div class=\"ui-helper-clearfix\" style=\"text-align: left\">\n            <span style=\"font-size:20px;display:inline-block;margin-top:3px\"><b>Article picker</b></span>\n            <button pButton type=\"button\" label=\"Close\" (click)=\"hidePickerClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n        </div>\n    </p-header>\n    <p-column field=\"productCode\" header=\"Code\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"productName\" header=\"Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"brand.brandName\" header=\"Brand\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"equals\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"brands\" [filter]=\"true\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n    </p-column>     \n    <p-column header=\"Categories\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"categories\" [filter]=\"true\" [style]=\"{'width':'100%'}\" [(ngModel)]=\"categoryValue\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n            <li *ngFor=\"let item of data.categories\"> {{ item.category.categoryName }} </li>\n        </ng-template>\n    </p-column>\n    <p-column header=\"Price ({{sliderValue||'No Filter'}})\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <i class=\"fa fa-close\" (click)=\"sliderValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n            <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"sliderValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n        </ng-template>\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n            <div *ngIf=\"data.discount;then discount_content else price_content\"></div>\n            <ng-template #discount_content>\n                <span class=\"percentage\">-{{data.discount.discountPercentage}}%</span>\n                <del>{{data.productSellingPrice | currency: 'EUR' : true}}</del><br><strong>{{data.discount.discountPrice | currency: 'EUR' : true}}</strong>\n            </ng-template>\n            <ng-template #price_content>\n                {{data.productSellingPrice | currency: 'EUR' : true}}\n            </ng-template>\n        </ng-template>\n    </p-column>\n    <ng-template pTemplate=\"rowexpansion\">\n        <div style=\"text-align: center\">\n            <img *ngIf=\"!articleForm\" src=\"/assets/loading.gif\" width=\"100px\">\n            <table *ngIf=\"articleForm\" class=\"table\" cellpadding=\"2\" cellspacing=\"2\">    \n                <tr> \n                    <td *ngFor=\"let h of articleForm.header\" align=\"center\" style=\"background-color: whitesmoke\"><strong>{{h}}</strong></td> \n                </tr> \n                <tbody> \n                    <tr *ngFor=\"let item of articleForm.body\"> \n                        <td *ngFor=\"let col of item\" align=\"center\"> \n                            <span *ngIf=\"col.id===0\">{{col.value}}</span>\n                            <input *ngIf=\"col.id>0\" pInputText type=\"number\" min=\"0\" [(ngModel)]=\"col.data\" style=\"width: 100%\" tooltipPosition=\"left\" pTooltip=\"{{col.value}} : {{col.stock}} - {{col.booked}}\"/>\n                        </td> \n                    </tr> \n                </tbody>\n            </table>\n            <button pButton label=\"Pickup\" type=\"button\" (click)=\"pickerClick()\" class=\"ui-button-primary\" icon=\"fa-reply-all\"></button>\n        </div>\n    </ng-template>\n</p-dataTable>"

/***/ }),

/***/ "../../../../../src/app/shared/article-picker.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var ArticlePickerComponent = (function () {
    function ArticlePickerComponent(productService) {
        this.productService = productService;
        this.totalRecords = 0;
        this.onPicked = new core_1.EventEmitter();
        this.isOpen = false;
    }
    ArticlePickerComponent.prototype.loadData = function () {
        var _this = this;
        this.isOpen = true;
        if (!this.products) {
            this.productService
                .getProducts()
                .subscribe(function (result) {
                _this.products = result;
                _this.totalRecords = _this.products.length;
                _this.buildFilter(result);
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    ArticlePickerComponent.prototype.hidePickerClick = function () {
        this.isOpen = false;
    };
    ArticlePickerComponent.prototype.pickerClick = function () {
        var data = [];
        this.articleForm.body
            .forEach(function (p) { return p.forEach(function (e) {
            if (e.data > 0) {
                data.push(e.value + "#" + e.data);
            }
        }); });
        this.onPicked.emit(data);
        this.isOpen = false;
    };
    ArticlePickerComponent.prototype.buildFilter = function (items) {
        this.brands = [];
        this.brands.push({ label: 'All', value: null });
        var filterBrands = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.brand.brandName); }));
        this.brands = this.brands.concat(filterBrands);
        this.categories = [];
        this.categories.push({ label: 'All', value: null });
        var array = items.map(function (p) { return p.categories.map(function (c) { return c.category.categoryName; }); }).join(',');
        var filterCategories = helpers_1.Helpers.distinct(array.split(',').map(function (item) { return helpers_1.Helpers.newSelectItem(item); }));
        this.categories = this.categories.concat(filterCategories);
    };
    ArticlePickerComponent.prototype.onRowSelect = function (event) {
        this.datatable.toggleRow(event.data);
    };
    ArticlePickerComponent.prototype.onRowExpand = function (expandedItem) {
        this.getArticles(expandedItem.data.productId);
    };
    ArticlePickerComponent.prototype.getArticles = function (productId) {
        var _this = this;
        this.articleForm = null;
        // from server
        this.productService.getArticles(productId, '0')
            .subscribe(function (result) {
            _this.articleForm = result;
        }, function (onerror) { return alert(onerror._body); });
        /*
        // or from client
        this.header = [];
        this.articles = [];
        let productAttributeValues: ProductAttributeValue[] = [];

        let lenght = this.selected.attributes.length - 1;
        if (lenght > 0) {
            this.selected.attributes.forEach(elem => {
                this.header.push(elem.attribute.attributeName);
                productAttributeValues = productAttributeValues.concat(elem.attributeValues);
            });
            this.header.pop();

            this.selected.attributes[lenght].attributeValues.forEach(elem => {
                this.header.push(elem.attributeValue.attributeValueName);
            });
        }

        let source = Observable.from(this.selected.articles)
            .groupBy(
                function (x) {
                    return x.attributeValues
                        .map(p => p.attributeValueId)
                        .slice(0, x.attributeValues.length - 1)
                        .join('#');
                },
                function (x) { return x; }
            );

        source.subscribe(obs => {
            let row: any[] = [];
            let isFirst = true;
            obs.forEach(e => {
                let qta = `${e.quantity}#${e.barcode}`;
                if (isFirst) {
                    e.attributeValues.forEach(ex => {
                        let productAttributeValue = productAttributeValues.find(
                            p => p.attributeValue.attributeValueId === ex.attributeValueId
                        );
                        row.push(productAttributeValue.attributeValue.attributeValueName);
                    });
                    isFirst = false;
                    row[row.length - 1] = qta;
                } else {
                    row.push(qta);
                }
            }).then(p => {
                this.articles.push(row);
            });
        });
        */
    };
    return ArticlePickerComponent;
}());
__decorate([
    core_1.ViewChild('dt'),
    __metadata("design:type", typeof (_a = typeof primeng_1.DataTable !== "undefined" && primeng_1.DataTable) === "function" && _a || Object)
], ArticlePickerComponent.prototype, "datatable", void 0);
ArticlePickerComponent = __decorate([
    core_1.Component({
        selector: 'article-picker',
        template: __webpack_require__("../../../../../src/app/shared/article-picker.component.html"),
        outputs: ['onPicked']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _b || Object])
], ArticlePickerComponent);
exports.ArticlePickerComponent = ArticlePickerComponent;
var _a, _b;
//# sourceMappingURL=article-picker.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n    <p>&copy; 2017 Gerardo Grisolini. All rights reserved.</p>\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/shared/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var FooterComponent = (function () {
    function FooterComponent() {
        this.currentYear = new Date().getFullYear();
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    core_1.Component({
        selector: 'customfooter',
        template: __webpack_require__("../../../../../src/app/shared/footer.component.html")
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/helpers.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.distinct = function (a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = a[i];
            if (seen[item.label] !== 1) {
                seen[item.label] = 1;
                out[j++] = item;
            }
        }
        return out;
    };
    Helpers.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Authorization', "Bearer " + localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');
        return headers;
    };
    Helpers.newSelectItem = function (value, label) {
        return { label: label ? label : value, value: value };
    };
    Helpers.newNode = function (label, data, type) {
        return {
            'label': label,
            'data': data,
            'type': type,
            'children': []
        };
    };
    Helpers.getUnitOfMeasure = function () {
        return [
            Helpers.newSelectItem('QT', 'Quantity'),
            Helpers.newSelectItem('MT', 'Meter'),
            Helpers.newSelectItem('KG', 'Kilogram')
        ];
    };
    return Helpers;
}());
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "../../../../../src/app/shared/models.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Classes
Object.defineProperty(exports, "__esModule", { value: true });
var Company = (function () {
    function Company() {
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
        this.barcodeCounter = 0;
    }
    return Company;
}());
exports.Company = Company;
var Login = (function () {
    function Login(username, password) {
        this.username = username;
        this.password = password;
    }
    return Login;
}());
exports.Login = Login;
var Account = (function () {
    function Account() {
        this.uniqueID = '';
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.username = '';
        this.password = '';
        this.isAdmin = false;
    }
    return Account;
}());
exports.Account = Account;
var Store = (function () {
    function Store() {
        this.storeId = 0;
        this.storeName = '';
        this.storeAddress = '';
        this.storeCity = '';
        this.storeZip = '';
        this.storeCountry = '';
        this.updatedAt = 0;
    }
    return Store;
}());
exports.Store = Store;
var Brand = (function () {
    function Brand() {
        this.brandId = 0;
        this.brandName = '';
    }
    return Brand;
}());
exports.Brand = Brand;
var Category = (function () {
    function Category(categoryId, categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryIsPrimary = false;
        this.translations = [];
    }
    return Category;
}());
exports.Category = Category;
var Media = (function () {
    function Media(name, url, number) {
        this.name = name;
        this.url = url;
        this.number = number;
    }
    return Media;
}());
exports.Media = Media;
var Translation = (function () {
    function Translation(country, value) {
        this.country = country;
        this.value = value;
    }
    return Translation;
}());
exports.Translation = Translation;
var Product = (function () {
    function Product() {
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
    return Product;
}());
exports.Product = Product;
var Article = (function () {
    function Article() {
        this.articleId = 0;
        this.articleBarcode = '';
        this.quantity = 0;
        this.booked = 0;
        this.attributeValues = [];
    }
    return Article;
}());
exports.Article = Article;
var Attribute = (function () {
    function Attribute(attributeId, attributeName, translations) {
        this.attributeId = attributeId;
        this.attributeName = attributeName;
        this.translations = translations;
    }
    return Attribute;
}());
exports.Attribute = Attribute;
var AttributeValue = (function () {
    function AttributeValue(attributeId, attributeValueId, attributeValueCode, attributeValueName, translations) {
        this.attributeId = attributeId;
        this.attributeValueId = attributeValueId;
        this.attributeValueCode = attributeValueCode;
        this.attributeValueName = attributeValueName;
        this.translations = translations;
    }
    return AttributeValue;
}());
exports.AttributeValue = AttributeValue;
var Publication = (function () {
    function Publication(productId) {
        this.publicationId = 0;
        this.productId = productId;
        this.publicationFeatured = false;
        // this.publicationStartAt = new Date();
        // this.publicationFinishAt = new Date();
        // this.publicationUpdated = new Date();
    }
    return Publication;
}());
exports.Publication = Publication;
var Causal = (function () {
    function Causal() {
        this.causalId = 0;
        this.causalName = '';
        this.causalQuantity = 0;
        this.causalBooked = 0;
        this.causalIsPos = false;
        this.updatedAt = 0;
    }
    return Causal;
}());
exports.Causal = Causal;
var Customer = (function () {
    function Customer() {
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
        this.updatedAt = 0;
    }
    return Customer;
}());
exports.Customer = Customer;
var Movement = (function () {
    function Movement() {
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
    return Movement;
}());
exports.Movement = Movement;
var MovementArticle = (function () {
    function MovementArticle() {
        this.movementArticleId = 0;
        this.movementId = 0;
        this.movementArticleBarcode = '';
        this.movementArticleProduct = null;
        this.movementArticleQuantity = 1.0;
        this.movementArticlePrice = 0.0;
        this.movementArticleAmount = 0.0;
    }
    return MovementArticle;
}());
exports.MovementArticle = MovementArticle;
var Invoice = (function () {
    function Invoice() {
        this.invoiceId = 0;
        this.invoiceNumber = 0;
        this.invoiceDate = new Date();
        this.invoicePayment = '';
        this.invoiceNote = '';
        this.invoiceAmount = 0.0;
        this.invoiceUpdate = new Date();
    }
    return Invoice;
}());
exports.Invoice = Invoice;
var Discount = (function () {
    function Discount() {
        this.discountId = 0;
        this.discountName = '';
        this.discountPercentage = 0;
        this.discountPrice = 0;
        this.discountUpdated = new Date();
    }
    return Discount;
}());
exports.Discount = Discount;
var DiscountProduct = (function () {
    function DiscountProduct() {
        this.discountProductId = 0;
        this.discountId = 0;
        this.discountProduct = new Product();
    }
    return DiscountProduct;
}());
exports.DiscountProduct = DiscountProduct;
var Device = (function () {
    function Device() {
        this.deviceId = 0;
        this.deviceName = '';
        this.deviceToken = '';
        this.store = new Store();
        this.updatedAt = 0;
    }
    return Device;
}());
exports.Device = Device;
var Email = (function () {
    function Email() {
        this.address = '';
        this.subject = '';
        this.content = '';
    }
    return Email;
}());
exports.Email = Email;
var Period = (function () {
    function Period() {
        this.start = new Date();
        this.finish = new Date(this.start.getFullYear(), 12, 31);
    }
    return Period;
}());
exports.Period = Period;
//# sourceMappingURL=models.js.map

/***/ }),

/***/ "../../../../../src/app/shared/movement-picker.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dataTable *ngIf=\"isOpen\" [responsive]=\"true\" [value]=\"movements | dateFilter:dateStartValue:dateFinishValue\" \n    selectionMode=\"multiple\" [(selection)]=\"selected\"\n    [paginator]=\"true\" [rows]=\"10\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n    <p-header>\n        <div class=\"ui-helper-clearfix\" style=\"text-align: left\">\n            <span style=\"font-size:20px;display:inline-block;margin-top:3px\"><b>Movement picker</b></span>\n            <button pButton type=\"button\" label=\"Close\" (click)=\"hidePickerClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n        </div>\n    </p-header>\n    <p-footer>\n        <button pButton type=\"button\" label=\"Pickup\" (click)=\"pickerClick()\" class=\"ui-button-primary\" icon=\"fa-reply-all\"></button>\n    </p-footer>\n    <p-column [style]=\"{'width':'50px'}\" selectionMode=\"multiple\"></p-column>\n    <p-column field=\"movementNumber\" header=\"Number\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column header=\"Date\" [sortable]=\"true\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\">\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n            {{data.movementDate | date:'yyyy-MM-dd'}}\n        </ng-template>            \n        <ng-template pTemplate=\"filter\" let-col>\n            <i class=\"fa fa-close\" (click)=\"dateStartValue=null;dateFinishValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n            <p-calendar [(ngModel)]=\"dateStartValue\" [inputStyle]=\"{'width':'50%','float':'left'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Start\" styleClass=\"ui-column-filter\"></p-calendar>\n            <p-calendar [(ngModel)]=\"dateFinishValue\" [inputStyle]=\"{'width':'50%','float':'right'}\" dateFormat=\"yy-mm-dd\" placeholder=\"Finish\" styleClass=\"ui-column-filter\"></p-calendar>\n        </ng-template>\n    </p-column>\n    <p-column field=\"movementCausal.causalName\" header=\"Causal\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"causalsFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n    </p-column>\n    <p-column field=\"movementStore.storeName\" header=\"Store\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" filterMatchMode=\"equals\">\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"storesFiltered\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n    </p-column>\n</p-dataTable>"

/***/ }),

/***/ "../../../../../src/app/shared/movement-picker.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var movement_service_1 = __webpack_require__("../../../../../src/app/services/movement.service.ts");
var MovementPickerComponent = (function () {
    function MovementPickerComponent(movementService) {
        this.movementService = movementService;
        this.totalRecords = 0;
        this.onPicked = new core_1.EventEmitter();
        this.isOpen = false;
    }
    MovementPickerComponent.prototype.loadData = function (customerId) {
        var _this = this;
        this.isOpen = true;
        if (!this.movements) {
            this.movementService
                .getByCustomerId(customerId)
                .subscribe(function (result) {
                _this.movements = result;
                _this.totalRecords = _this.movements.length;
                _this.buildFilter(result);
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    MovementPickerComponent.prototype.hidePickerClick = function () {
        this.isOpen = false;
    };
    MovementPickerComponent.prototype.pickerClick = function () {
        var data = [];
        this.selected.forEach(function (e) { return data.push(e.movementId); });
        this.onPicked.emit(data);
        this.isOpen = false;
    };
    MovementPickerComponent.prototype.buildFilter = function (items) {
        this.storesFiltered = [];
        this.storesFiltered.push({ label: 'All', value: null });
        var filterStores = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementStore.storeName); }));
        this.storesFiltered = this.storesFiltered.concat(filterStores);
        this.causalsFiltered = [];
        this.causalsFiltered.push({ label: 'All', value: null });
        var filterCusals = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.movementCausal.causalName); }));
        this.causalsFiltered = this.causalsFiltered.concat(filterCusals);
    };
    return MovementPickerComponent;
}());
__decorate([
    core_1.ViewChild('dt'),
    __metadata("design:type", typeof (_a = typeof primeng_1.DataTable !== "undefined" && primeng_1.DataTable) === "function" && _a || Object)
], MovementPickerComponent.prototype, "datatable", void 0);
MovementPickerComponent = __decorate([
    core_1.Component({
        selector: 'movement-picker',
        template: __webpack_require__("../../../../../src/app/shared/movement-picker.component.html"),
        outputs: ['onPicked']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof movement_service_1.MovementService !== "undefined" && movement_service_1.MovementService) === "function" && _b || Object])
], MovementPickerComponent);
exports.MovementPickerComponent = MovementPickerComponent;
var _a, _b;
//# sourceMappingURL=movement-picker.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/navigation.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\r\n    <img src=\"/assets/latest.jpg\" height=\"72\" width=\"100%\"/>\r\n    <h3 style=\"margin-top:-46px;margin-left:25px;\"><a class=\"brand\" [routerLink]=\"['/home']\">Webretail</a></h3>\r\n    <h3 style=\"margin-top:-36px;margin-left:46%;margin-bottom:20px;color:#604b20;width:300px\">{{sessionService.title}}</h3>\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n        </div>\r\n        <div *ngIf=\"!isAuthenticated\" id=\"navbar\" class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav navbar-left\">\r\n                <li><a [routerLink]=\"['/login']\"><i class=\"glyphicon glyphicon-log-in\"></i> Login</a></li>\r\n            </ul>\r\n        </div>\r\n        <div *ngIf=\"isAuthenticated\" id=\"navbar\" class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"glyphicon glyphicon-th\"></i>Product <b class=\"caret\"></b>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a [routerLink]=\"['/product']\"><i class=\"glyphicon glyphicon-th\"></i>Products</a></li>\r\n                        <li><a [routerLink]=\"['/brand']\"><i class=\"glyphicon glyphicon-th-list\"></i>Brands</a></li>\r\n                        <li><a [routerLink]=\"['/category']\"><i class=\"glyphicon glyphicon-th-list\"></i>Categories</a></li>\r\n                        <li><a [routerLink]=\"['/attribute']\"><i class=\"glyphicon glyphicon-th-list\"></i>Attributes</a></li>\r\n                        <li><a [routerLink]=\"['/discount']\"><i class=\"glyphicon glyphicon-scissors\"></i>Discounts</a></li>\r\n                        <li><a [routerLink]=\"['/import']\"><i class=\"glyphicon glyphicon-download\"></i>Import</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"glyphicon glyphicon-indent-left\"></i>Movement <b class=\"caret\"></b>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a [routerLink]=\"['/movement']\"><i class=\"glyphicon glyphicon-indent-left\"></i>Movements</a></li>\r\n                        <li><a [routerLink]=\"['/causal']\"><i class=\"glyphicon glyphicon-th-list\"></i>Causals</a></li>\r\n                        <li><a [routerLink]=\"['/customer']\"><i class=\"glyphicon glyphicon-user\"></i>Customers</a></li>\r\n                        <li><a [routerLink]=\"['/invoice']\"><i class=\"glyphicon glyphicon-list-alt\"></i>Invoices</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"glyphicon glyphicon-blackboard\"></i>Report <b class=\"caret\"></b>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a [routerLink]=\"['/report/receipts']\"><i class=\"glyphicon glyphicon-modal-window\"></i>Receipts</a></li>\r\n                        <li><a [routerLink]=\"['/report/sales']\"><i class=\"glyphicon glyphicon-scale\"></i>Sales</a></li>\r\n                        <li><a [routerLink]=\"['/report/statistics']\"><i class=\"glyphicon glyphicon-dashboard\"></i>Statistics</a></li>\r\n                   </ul>\r\n                </li>\r\n            </ul>\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <i class=\"glyphicon glyphicon-cog\"></i>Setting <b class=\"caret\"></b>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li *ngIf=\"!isAdmin\"><a [routerLink]=\"['/account/myinfo']\"><i class=\"glyphicon glyphicon-user\"></i>Account</a></li>\r\n                        <li *ngIf=\"isAdmin\"><a [routerLink]=\"['/company']\"><i class=\"glyphicon glyphicon-home\"></i>Company</a></li>\r\n                        <li *ngIf=\"isAdmin\"><a [routerLink]=\"['/account']\"><i class=\"glyphicon glyphicon-user\"></i>Accounts</a></li>\r\n                        <li><a [routerLink]=\"['/store']\"><i class=\"glyphicon glyphicon-inbox\"></i>Stores</a></li>\r\n                        <li><a [routerLink]=\"['/device']\"><i class=\"glyphicon glyphicon-phone\"></i>Devices</a></li>\r\n                    </ul>\r\n                </li>\r\n                <li><a style=\"cursor: pointer\" (click)=\"logoutClick()\"><i class=\"glyphicon glyphicon-log-out\"></i>Exit&nbsp;</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/navigation.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var NavigationComponent = (function () {
    function NavigationComponent(sessionService) {
        this.sessionService = sessionService;
    }
    Object.defineProperty(NavigationComponent.prototype, "isAuthenticated", {
        get: function () {
            return this.sessionService.isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationComponent.prototype, "isAdmin", {
        get: function () {
            return this.sessionService.isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    NavigationComponent.prototype.logoutClick = function () {
        this.sessionService.logout();
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        selector: 'navigation',
        template: __webpack_require__("../../../../../src/app/shared/navigation.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
var _a;
//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/product-picker.component.html":
/***/ (function(module, exports) {

module.exports = "<p-dataTable *ngIf=\"isOpen\" [responsive]=\"true\" [value]=\"products | priceFilter:sliderValue | categoryFilter:categoryValue\" \n    selectionMode=\"multiple\" [(selection)]=\"selected\"\n    [paginator]=\"true\" [rows]=\"10\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\" #dt>\n    <p-header>\n        <div class=\"ui-helper-clearfix\" style=\"text-align: left\">\n            <span style=\"font-size:20px;display:inline-block;margin-top:3px\"><b>Product picker</b></span>\n            <button pButton type=\"button\" label=\"Close\" (click)=\"hidePickerClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n        </div>\n    </p-header>\n    <p-footer>\n        <button pButton type=\"button\" label=\"Pickup\" (click)=\"pickerClick()\" class=\"ui-button-primary\" icon=\"fa-reply-all\"></button>\n    </p-footer>\n    <p-column [style]=\"{'width':'50px'}\" selectionMode=\"multiple\"></p-column>\n    <p-column field=\"productCode\" header=\"Code\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"productName\" header=\"Name\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>\n    <p-column field=\"brand.brandName\" header=\"Brand\" [sortable]=\"true\" [filter]=\"true\" filterMatchMode=\"equals\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"brands\" [filter]=\"true\" [style]=\"{'width':'100%'}\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n    </p-column>     \n    <p-column header=\"Categories\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <p-dropdown [options]=\"categories\" [filter]=\"true\" [style]=\"{'width':'100%'}\" [(ngModel)]=\"categoryValue\" styleClass=\"ui-column-filter\"></p-dropdown>\n        </ng-template>\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n            <li *ngFor=\"let item of data.categories\"> {{ item.category.categoryName }} </li>\n        </ng-template>\n    </p-column>\n    <p-column header=\"Price ({{sliderValue||'No Filter'}})\" [sortable]=\"true\" [filter]=\"true\" [style]=\"{'overflow':'visible'}\" >\n        <ng-template pTemplate=\"filter\" let-col>\n            <i class=\"fa fa-close\" (click)=\"sliderValue=null;dt.filter(null,col.field,col.filterMatchMode)\"></i>\n            <p-slider [style]=\"{'margin-top':'14px','margin-bottom':'5px'}\" [(ngModel)]=\"sliderValue\" [min]=\"5\" [max]=\"1000\"></p-slider>\n        </ng-template>\n        <ng-template let-col let-data=\"rowData\" pTemplate=\"body\">\n            <div *ngIf=\"data.discount;then discount_content else price_content\"></div>\n            <ng-template #discount_content>\n                <span class=\"percentage\">-{{data.discount.discountPercentage}}%</span>\n                <del>{{data.productSellingPrice | currency: 'EUR' : true}}</del><br><strong>{{data.discount.discountPrice | currency: 'EUR' : true}}</strong>\n            </ng-template>\n            <ng-template #price_content>\n                {{data.productSellingPrice | currency: 'EUR' : true}}\n            </ng-template>\n        </ng-template>\n    </p-column>\n</p-dataTable>"

/***/ }),

/***/ "../../../../../src/app/shared/product-picker.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var helpers_1 = __webpack_require__("../../../../../src/app/shared/helpers.ts");
var product_service_1 = __webpack_require__("../../../../../src/app/services/product.service.ts");
var ProductPickerComponent = (function () {
    function ProductPickerComponent(productService) {
        this.productService = productService;
        this.totalRecords = 0;
        this.onPicked = new core_1.EventEmitter();
        this.isOpen = false;
    }
    ProductPickerComponent.prototype.loadData = function () {
        var _this = this;
        this.isOpen = true;
        if (!this.products) {
            this.productService
                .getProducts()
                .subscribe(function (result) {
                _this.products = result;
                _this.totalRecords = _this.products.length;
                _this.buildFilter(result);
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    ProductPickerComponent.prototype.hidePickerClick = function () {
        this.isOpen = false;
    };
    ProductPickerComponent.prototype.pickerClick = function () {
        var data = [];
        this.selected.forEach(function (e) { return data.push(e.productCode); });
        this.onPicked.emit(data);
        this.isOpen = false;
    };
    ProductPickerComponent.prototype.buildFilter = function (items) {
        this.brands = [];
        this.brands.push({ label: 'All', value: null });
        var filterBrands = helpers_1.Helpers.distinct(items.map(function (item) { return helpers_1.Helpers.newSelectItem(item.brand.brandName); }));
        this.brands = this.brands.concat(filterBrands);
        this.categories = [];
        this.categories.push({ label: 'All', value: null });
        var array = items.map(function (p) { return p.categories.map(function (c) { return c.category.categoryName; }); }).join(',');
        var filterCategories = helpers_1.Helpers.distinct(array.split(',').map(function (item) { return helpers_1.Helpers.newSelectItem(item); }));
        this.categories = this.categories.concat(filterCategories);
    };
    return ProductPickerComponent;
}());
__decorate([
    core_1.ViewChild('dt'),
    __metadata("design:type", typeof (_a = typeof primeng_1.DataTable !== "undefined" && primeng_1.DataTable) === "function" && _a || Object)
], ProductPickerComponent.prototype, "datatable", void 0);
ProductPickerComponent = __decorate([
    core_1.Component({
        selector: 'product-picker',
        template: __webpack_require__("../../../../../src/app/shared/product-picker.component.html"),
        outputs: ['onPicked']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _b || Object])
], ProductPickerComponent);
exports.ProductPickerComponent = ProductPickerComponent;
var _a, _b;
//# sourceMappingURL=product-picker.component.js.map

/***/ }),

/***/ "../../../../../src/app/store/store.component.html":
/***/ (function(module, exports) {

module.exports = "<p-confirmDialog header=\"Confirmation delete on cascade\" icon=\"fa-trash-o\" [responsive]=\"true\"></p-confirmDialog>\n<img *ngIf=\"!stores\" src=\"/assets/loading.gif\" class=\"loading\">\n\n<div class=\"container-fluid\">\n\n    <p-toolbar>\n        <div class=\"ui-toolbar-group-left\">\n            <button pButton type=\"button\" label=\"{{totalRecords}} items\" title=\"Add item\" (click)=\"addClick()\" class=\"ui-button-primary\" icon=\"fa-plus\"></button>\n        </div>\n        <div class=\"ui-toolbar-group-right\">\n            <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n            <input #gb type=\"text\" pInputText placeholder=\"Search\" style=\"width: 180px\">\n        </div>\n    </p-toolbar>\n\n    <p-dataTable *ngIf=\"!displayPanel\" [responsive]=\"true\" [value]=\"stores\"\n        selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\"\n        [paginator]=\"true\" [rows]=\"15\" [totalRecords]=\"totalRecords\" [pageLinks]=\"5\"\n        [globalFilter]=\"gb\" #dt>\n        <p-column field=\"storeId\" header=\"Id\" [style]=\"{'width':'100px'}\" [sortable]=\"true\"></p-column>\n        <p-column field=\"storeName\" header=\"Name\" [sortable]=\"true\"></p-column>\n        <p-column field=\"storeCity\" header=\"City\" [sortable]=\"true\"></p-column>\n        <p-column field=\"storeCountry\" header=\"Country\" [sortable]=\"true\"></p-column>\n    </p-dataTable>\n\n    <p-panel *ngIf=\"displayPanel\">\n        <p-header>\n            <div class=\"ui-helper-clearfix\">\n                <span class=\"ui-panel-title\" style=\"font-size:20px;display:inline-block;margin-top:6px\"><b>Store</b></span>\n                <button pButton type=\"button\" label=\"Close\" (click)=\"closeClick()\" style=\"float: right\" class=\"ui-button-secondary\" icon=\"fa-close\"></button>\n            </div>\n        </p-header>\n        <form [formGroup]=\"dataform\">\n            <div class=\"ui-grid ui-grid-responsive ui-grid-pad ui-fluid\" style=\"margin: 10px 0px\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label>Id</label></div>\n                    <div class=\"ui-grid-col-8\">{{selected.storeId}}</div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"name\">Name</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"name\" [(ngModel)]=\"selected.storeName\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['name'].valid&&dataform.controls['name'].dirty\">\n                            <i class=\"fa fa-close\"></i> Name is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"address\">Address</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"address\" [(ngModel)]=\"selected.storeAddress\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['address'].valid&&dataform.controls['address'].dirty\">\n                            <i class=\"fa fa-close\"></i> Address is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"city\">City</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"city\" [(ngModel)]=\"selected.storeCity\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['city'].valid&&dataform.controls['city'].dirty\">\n                            <i class=\"fa fa-close\"></i> City is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"zip\">Zip</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"zip\" [(ngModel)]=\"selected.storeZip\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['zip'].valid&&dataform.controls['zip'].dirty\">\n                            <i class=\"fa fa-close\"></i>\n                            <span *ngIf=\"dataform.controls['zip'].errors['required']\">Zip is required</span>\n                            <span *ngIf=\"dataform.controls['zip'].errors['minlength']\">Must be equals than 5 characters</span>\n                            <span *ngIf=\"dataform.controls['zip'].errors['maxlength']\">Must be equals than 5 characters</span>\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"country\">Country</label></div>\n                    <div class=\"ui-grid-col-8\">\n                        <input pInputText formControlName=\"country\" [(ngModel)]=\"selected.storeCountry\"/>\n                        <div class=\"ui-message ui-messages-error ui-corner-all\" *ngIf=\"!dataform.controls['country'].valid&&dataform.controls['country'].dirty\">\n                            <i class=\"fa fa-close\"></i> Country is required\n                        </div>\n                </div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\">\n                        <button *ngIf=\"selected.storeId>0\" type=\"button\" pButton icon=\"fa-trash-o\" class=\"ui-button-secondary\" (click)=\"deleteClick()\" label=\"Delete\"></button>\n                    </div>\n                    <div class=\"ui-grid-col-4\"></div>\n                    <div class=\"ui-grid-col-4\">\n                        <button type=\"button\" pButton icon=\"fa-save\" (click)=\"saveClick()\" label=\"Save\" [disabled]=\"!dataform.valid\"></button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </p-panel>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/store/store.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var primeng_1 = __webpack_require__("../../../../primeng/primeng.js");
var session_service_1 = __webpack_require__("../../../../../src/app/services/session.service.ts");
var store_service_1 = __webpack_require__("../../../../../src/app/services/store.service.ts");
var models_1 = __webpack_require__("../../../../../src/app/shared/models.ts");
var StoreComponent = (function () {
    function StoreComponent(sessionService, storeService, confirmationService, fb) {
        this.sessionService = sessionService;
        this.storeService = storeService;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.totalRecords = 0;
        sessionService.title = 'Stores';
    }
    StoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.checkCredentials(false);
        this.dataform = this.fb.group({
            'name': new forms_1.FormControl('', forms_1.Validators.required),
            'address': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'city': new forms_1.FormControl('', forms_1.Validators.nullValidator),
            'zip': new forms_1.FormControl('', [forms_1.Validators.nullValidator, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(5)]),
            'country': new forms_1.FormControl('', forms_1.Validators.nullValidator)
        });
        this.storeService
            .getAll()
            .subscribe(function (result) {
            _this.stores = result;
            _this.totalRecords = _this.stores.length;
        }, function (onerror) { return alert(onerror._body); });
    };
    Object.defineProperty(StoreComponent.prototype, "isNew", {
        get: function () { return this.selected == null || this.selected.storeId === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StoreComponent.prototype, "selectedIndex", {
        get: function () { return this.stores.indexOf(this.selected); },
        enumerable: true,
        configurable: true
    });
    StoreComponent.prototype.addClick = function () {
        this.selected = new models_1.Store();
        this.displayPanel = true;
    };
    StoreComponent.prototype.onRowSelect = function (event) {
        this.displayPanel = true;
    };
    StoreComponent.prototype.closeClick = function () {
        this.displayPanel = false;
        this.selected = null;
    };
    StoreComponent.prototype.saveClick = function () {
        var _this = this;
        if (this.isNew) {
            this.storeService
                .create(this.selected)
                .subscribe(function (result) {
                _this.stores.push(result);
                _this.totalRecords++;
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
        else {
            this.storeService
                .update(this.selected.storeId, this.selected)
                .subscribe(function (result) {
                _this.closeClick();
            }, function (onerror) { return alert(onerror._body); });
        }
    };
    StoreComponent.prototype.deleteClick = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'All related articles stocks will be deleted. Are you sure that you want to delete this store?',
            accept: function () {
                _this.storeService
                    .delete(_this.selected.storeId)
                    .subscribe(function (result) {
                    _this.stores.splice(_this.selectedIndex, 1);
                    _this.totalRecords--;
                    _this.closeClick();
                }, function (onerror) { return alert(onerror._body); });
            }
        });
    };
    return StoreComponent;
}());
StoreComponent = __decorate([
    core_1.Component({
        selector: 'store-component',
        template: __webpack_require__("../../../../../src/app/store/store.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _a || Object, typeof (_b = typeof store_service_1.StoreService !== "undefined" && store_service_1.StoreService) === "function" && _b || Object, typeof (_c = typeof primeng_1.ConfirmationService !== "undefined" && primeng_1.ConfirmationService) === "function" && _c || Object, typeof (_d = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _d || Object])
], StoreComponent);
exports.StoreComponent = StoreComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=store.component.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("../../../../process/browser.js")))

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map