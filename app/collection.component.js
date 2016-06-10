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
    function CollectionComponent(router, nounService) {
        this.router = router;
        this.nounService = nounService;
        this.items = ['mockNoun1 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun2 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun3 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun4 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun5 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun6 | mockAttr1 | mockAttr2 | mockAttr3',
            'mockNoun7 | mockAttr1 | mockAttr2 | mockAttr3'];
        this.actions = ['New', 'Tools', 'Batch'];
    }
    CollectionComponent.prototype.getItems = function () {
    };
    CollectionComponent.prototype.ngOnInit = function () {
        this.getItems();
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'collection-blade',
            templateUrl: 'app/html/collection.component.html',
            styleUrls: ['app/css/collection.component.css'],
            providers: [noun_service_1.NounService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, noun_service_1.NounService])
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
//# sourceMappingURL=collection.component.js.map