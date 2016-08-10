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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var noun_service_1 = require('./services/noun.service');
var collection_service_1 = require('./services/collection.service');
var CollectionComponent = (function () {
    //Necessary imports
    function CollectionComponent(router, nounService, routeParams, http, collectionService) {
        this.router = router;
        this.nounService = nounService;
        this.routeParams = routeParams;
        this.http = http;
        this.collectionService = collectionService;
    }
    //Initialization
    CollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.routeParams.get('id');
        //May need to fix this. However, simply wrapping items in a promise causes errors.
        this.requestNounItems("service");
        this.collectionService.getCollectionActions().then(function (actions) { return _this.actions = actions; });
        this.subscription = this.nounService.nounSelected$.subscribe(function (noun) { return _this.onNounSelectionChange(noun); });
    };
    CollectionComponent.prototype.onNounSelectionChange = function (noun) {
        this.items = null;
        document.getElementById("listItems").style.display = "none";
        this.requestNounItems(noun.name);
    };
    CollectionComponent.prototype.requestNounItems = function (noun) {
        var _this = this;
        this.http.get('/nounitems?' + "noun=" + noun)
            .subscribe(function (res) {
            _this.headers = [];
            _this.rows = [];
            _this.items = res.json();
            _this.collectionService.setCollection(_this.items);
            if (_this.items.length > 1) {
                var currHeader = _this.items[1];
            }
            _this.headers = currHeader.match(/\S+/g);
            var rows = [];
            for (var i = _this.headers.length - 1; i < _this.items.length; i++) {
                //console.log(this.items[i].split(" "));
                var currRow = _this.items[i].match(/\S+/g);
                var builder;
                if (currRow != null && currRow.length > _this.headers.length) {
                    builder = currRow[_this.headers.length - 1];
                    for (var j = _this.headers.length; j < currRow.length; j++) {
                        builder += " " + currRow[j];
                    }
                    if (currRow.length > _this.headers.length) {
                        currRow[_this.headers.length - 1] = builder;
                    }
                    currRow = currRow.slice(0, _this.headers.length);
                }
                rows.push(currRow);
            }
            _this.rows = rows;
            document.getElementById("listItems").style.display = "block";
        }, function (error) { console.log(error); _this.items = null; });
    };
    //Wrapper for observer pattern of service
    CollectionComponent.prototype.setSelected = function (item) {
        this.collectionService.setSelected(item);
    };
    CollectionComponent.prototype.search = function () {
        var _this = this;
        //This is a bit hacky as we need casting.
        var criteria = document.getElementById("collection-search").value;
        this.collectionService.search(criteria).then(function (items) { return _this.items = items; });
    };
    CollectionComponent.prototype.itemClick = function (idx) {
        this.collectionService.setItemClick(idx);
    };
    //Cleanup
    CollectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'collection-blade',
            templateUrl: 'app/html/collection.component.html',
            styleUrls: ['app/css/collection.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, noun_service_1.NounService, router_deprecated_1.RouteParams, http_1.Http, collection_service_1.CollectionService])
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
//# sourceMappingURL=collection.component.js.map