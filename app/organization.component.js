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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var noun_service_1 = require('./services/noun.service');
var OrganizationComponent = (function () {
    function OrganizationComponent(router, nounService) {
        this.router = router;
        this.nounService = nounService;
        this.items = ['mockNoun1', 'mockNoun2', 'mockNoun3', 'mockNoun4', 'mockNoun5', 'mockNoun6', 'mockNoun7'];
    }
    OrganizationComponent.prototype.getItems = function () {
    };
    OrganizationComponent.prototype.ngOnInit = function () {
        this.getItems();
    };
    OrganizationComponent = __decorate([
        core_1.Component({
            selector: 'organization-blade',
            templateUrl: 'app/html/organization.component.html',
            styleUrls: ['app/css/organization.component.css'],
            providers: [noun_service_1.NounService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, noun_service_1.NounService])
    ], OrganizationComponent);
    return OrganizationComponent;
}());
exports.OrganizationComponent = OrganizationComponent;
//# sourceMappingURL=organization.component.js.map