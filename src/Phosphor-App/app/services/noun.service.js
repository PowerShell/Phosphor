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
var mock_modules_1 = require('../util/mock-modules');
var collection_service_1 = require('./collection.service');
var NounService = (function () {
    function NounService(collectionService) {
        this.collectionService = collectionService;
        this.nounSelected$ = new core_1.EventEmitter();
    }
    NounService.prototype.getNouns = function () {
        return Promise.resolve(mock_nouns_1.MOCKNOUNS);
    };
    NounService.prototype.getModules = function () {
        return Promise.resolve(mock_modules_1.MOCKMODULES);
    };
    //This is called every keystroke to search using JavaScript's String indexOf method.
    /*
  search(criteria) {
    var result = [];

    for (var i = 0; i < MOCKNOUNS.length; i++) {
      if (MOCKNOUNS[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
        result.push(MOCKNOUNS[i]);
        //Debug: console.log(MOCKNOUNS[i]);
      }
    }

    return Promise.resolve(result);
  }
    */
    NounService.prototype.search = function (criteria, nouns) {
        var result = [];
        for (var i = 0; i < nouns.length; i++) {
            if (nouns[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
                result.push(nouns[i]);
            }
        }
        return Promise.resolve(result);
    };
    //Gets the items for the selected noun.
    NounService.prototype.getNounItems = function (position) {
        return mock_nouns_1.MOCKNOUNS[position - 1].items;
    };
    //Observer pattern to emit noun to subscribers
    NounService.prototype.setSelected = function (noun) {
        this.selected = noun;
        this.nounSelected$.emit(noun);
        this.collectionService.setCollection(noun.items);
    };
    NounService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [collection_service_1.CollectionService])
    ], NounService);
    return NounService;
}());
exports.NounService = NounService;
//# sourceMappingURL=noun.service.js.map