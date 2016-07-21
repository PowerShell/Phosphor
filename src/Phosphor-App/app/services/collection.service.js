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
var mock_nouns_1 = require('../util/mock-nouns');
var CollectionService = (function () {
    function CollectionService() {
        //Currently placed here as mock data
        this.actions = ['New', 'Tools', 'Batch'];
        this.itemSelected$ = new core_1.EventEmitter();
        this.itemClicked$ = new core_1.EventEmitter();
        //Grabbing to initialize first
        this.items = mock_nouns_1.MOCKNOUNS[0].items;
    }
    CollectionService.prototype.getCollectionActions = function () {
        return Promise.resolve(this.actions);
    };
    //Observer pattern
    CollectionService.prototype.setSelected = function (item) {
        this.itemSelected$.emit(item);
    };
    //Called from noun service to set the items
    CollectionService.prototype.setCollection = function (items, rows) {
        this.items = items;
        this.rows = rows;
        //console.log(items);
        console.log(rows);
    };
    //This is called every keystroke to search using JavaScript's String indexOf method.
    CollectionService.prototype.search = function (criteria) {
        var result = [];
        for (var i = 0; i < this.rows.length; i++) {
            var found = false;
            if (this.rows[i] != null) {
                for (var j = 0; j < this.rows[i].length; j++) {
                    if (this.rows[i][j].toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
                        var found = true;
                    }
                }
            }
            if (found) {
                result.push(this.rows[i]);
            }
        }
        /*
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
            result.push(this.items[i]);
            //console.log(this.items[i]);
          }
        }
        */
        return Promise.resolve(result);
    };
    CollectionService.prototype.setItemClick = function (idx) {
        console.log("Set Item Clicked");
        this.itemClicked$.emit(idx);
    };
    CollectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CollectionService);
    return CollectionService;
}());
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map