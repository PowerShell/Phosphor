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
var CollectionComponent = (function () {
    function CollectionComponent(router, nounService, routeParams) {
        this.router = router;
        this.nounService = nounService;
        this.routeParams = routeParams;
        this.items = this.nounService.getNounItems({
            id: 1,
            name: 'AppxPackage',
            items: ['AppxPackage1 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage2 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage3 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage4 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage5 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage6 | mockAttr1 | mockAttr2 | mockAttr3',
                'AppxPackage7 | mockAttr1 | mockAttr2 | mockAttr3']
        });
        this.actions = ['New', 'Tools', 'Batch'];
    }
    CollectionComponent.prototype.getItems = function () {
    };
    CollectionComponent.prototype.onNounSelectionChange = function (noun) {
        console.log(noun.name);
    };
    CollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.routeParams.get('id');
        console.log("Here is the id: " + id);
        this.getItems();
        console.log(this.nounService.nounSelected$.observers);
        Promise.resolve(this.subscription =
            this.nounService.nounSelected$.subscribe(function (noun) { return _this.onNounSelectionChange(noun); }));
        console.log(this.nounService.nounSelected$);
        console.log(this.nounService.nounSelected$.observers);
    };
    CollectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'collection-blade',
            templateUrl: 'app/html/collection.component.html',
            styleUrls: ['app/css/collection.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, noun_service_1.NounService, router_deprecated_1.RouteParams])
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
//# sourceMappingURL=collection.component.js.map