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
var NounService = (function () {
    function NounService() {
        this.nounSelected$ = new core_1.EventEmitter();
    }
    NounService.prototype.getNouns = function () {
        return Promise.resolve(mock_nouns_1.MOCKNOUNS);
    };
    NounService.prototype.search = function (criteria) {
        var result = [];
        for (var i = 0; i < mock_nouns_1.MOCKNOUNS.length; i++) {
            if (mock_nouns_1.MOCKNOUNS[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
                result.push(mock_nouns_1.MOCKNOUNS[i]);
                console.log(mock_nouns_1.MOCKNOUNS[i]);
            }
        }
        return Promise.resolve(result);
    };
    NounService.prototype.getNounItems = function (selectedNoun) {
        return selectedNoun.items;
    };
    NounService.prototype.setSelected = function (noun) {
        this.selected = noun;
        this.nounSelected$.emit(noun);
        console.log("emitted");
    };
    NounService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NounService);
    return NounService;
}());
exports.NounService = NounService;
//# sourceMappingURL=noun.service.js.map