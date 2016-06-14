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
var collection_service_1 = require('./services/collection.service');
var verb_service_1 = require('./services/verb.service');
var VerbComponent = (function () {
    function VerbComponent(router, collectionService, verbService) {
        this.router = router;
        this.collectionService = collectionService;
        this.verbService = verbService;
    }
    VerbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.collectionService.itemSelected$.subscribe(function (item) { return _this.getActions(item); });
        //Promises to initialize
        this.verbService.getVerbs().then(function (verbs) { return _this.verbs = verbs; });
        this.verbService.getDetails('mock').then(function (details) { return _this.details = details; });
    };
    //Called as a listener for item selected from Collection
    VerbComponent.prototype.getActions = function (item) {
        //IMPLEMENT LOGIC HERE
        console.log(item);
    };
    VerbComponent = __decorate([
        core_1.Component({
            selector: 'verb-blade',
            templateUrl: 'app/html/verb.component.html',
            styleUrls: ['app/css/verb.component.css'],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, collection_service_1.CollectionService, verb_service_1.VerbService])
    ], VerbComponent);
    return VerbComponent;
}());
exports.VerbComponent = VerbComponent;
//# sourceMappingURL=verb.component.js.map