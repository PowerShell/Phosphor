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
var DetailComponent = (function () {
    function DetailComponent(router, collectionService, verbService) {
        this.router = router;
        this.collectionService = collectionService;
        this.verbService = verbService;
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.collectionService.itemSelected$.subscribe(function (item) { return _this.getActions(item); });
        this.verbService.getVerbs();
        this.subscribeVerbDetails = this.verbService.verbDetailsSelection$.subscribe(function (item) { return _this.setVerbDetails(item); });
        //Promises to initialize
        this.verbService.getVerbs().then(function (verbs) { return _this.verbs = verbs; });
        this.verbService.getDetails('mock').then(function (details) { return _this.details = details; });
    };
    //Called as a listener for item selected from Collection
    DetailComponent.prototype.getActions = function (item) {
        //IMPLEMENT LOGIC HERE
        console.log(item);
    };
    DetailComponent.prototype.setVerbDetails = function (resItems) {
        var htmlBuilder = "";
        console.log("Verb details: " + resItems);
        console.log(resItems.json());
        //Currently just grabs the first option from the response.
        var items = resItems.json()[0];
        for (var i = 0; i < items.length; i++) {
            if (items[i].charAt(0) == "-") {
                if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
                    htmlBuilder += "<h4> " + items[i].substring(1);
                    +"</h4> <br> <br> ";
                    htmlBuilder += '<input type="text" class="form-control" placeholder="">';
                }
                else {
                    htmlBuilder += '<br> <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">' + items[i].substring(1) + '</button> <br>';
                }
            }
        }
        document.getElementById("details").innerHTML = htmlBuilder;
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'detail-blade',
            templateUrl: 'app/html/detail.component.html',
            styleUrls: ['app/css/detail.component.css'],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, collection_service_1.CollectionService, verb_service_1.VerbService])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail.component.js.map