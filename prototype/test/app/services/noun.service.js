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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var collection_service_1 = require('./collection.service');
var NounService = (function () {
    function NounService(collectionService, http) {
        this.collectionService = collectionService;
        this.http = http;
        this.nounSelected$ = new core_1.EventEmitter();
    }
    NounService.prototype.ngOnInit = function () {
    };
    NounService.prototype.getNouns = function () {
        var servernouns = "" + document.getElementById("server-nouns").innerHTML;
        var splitted = servernouns.split(",");
        this.nouns = [];
        this.modules = [];
        //Module that contains all nouns:
        var allModule = {
            name: "All",
            nouns: []
        };
        for (var i = 0; i < splitted.length; i++) {
            var separate = splitted[i].split("-");
            var noun = separate[0];
            var module = separate[1];
            var newNoun = {
                name: noun,
                id: i,
                items: [],
                module: module
            };
            this.nouns.push(newNoun);
            if (!this.modules[module]) {
                var newModule = {
                    name: module,
                    nouns: []
                };
                newModule.nouns.push(newNoun);
                this.modules[module] = newModule;
            }
            else {
                this.modules[module].nouns.push(newNoun);
            }
            allModule.nouns.push(newNoun);
        }
        this.modules.push(allModule);
        return Promise.resolve(this.nouns);
        //return Promise.resolve(MOCKNOUNS);
    };
    NounService.prototype.getModules = function () {
        var allModules = [];
        for (var k in this.modules) {
            allModules.push(this.modules[k]);
        }
        return Promise.resolve(allModules);
    };
    //This is called every keystroke to search using JavaScript's String indexOf method.
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
    NounService.prototype.getNounItems = function (name) {
        //TODO Make an HTTP request to grab data from the server on the noun
        /*
            var test = this.http.get("/shell").map(function(res) {
              console.log(res);
            }).catch(function(err, caught) {
              console.log(err);
              return caught;
            });
        
            console.log("test: " + test.json());
            */
        var nounItems;
        this.http.get('/nounitems?' + "noun=" + name)
            .subscribe(function (res) { console.log(res.json()); nounItems = res.json(); }, function (error) { console.log(error); nounItems = null; });
        setTimeout((function () { console.log("HELLO WORLD!" + nounItems); return nounItems; }), 2000);
        //return MOCKNOUNS[2 - 1].items;
    };
    //Observer pattern to emit noun to subscribers
    NounService.prototype.setSelected = function (noun) {
        this.selected = noun;
        this.nounSelected$.emit(noun);
        this.collectionService.setCollection(noun.items);
    };
    NounService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [collection_service_1.CollectionService, http_1.Http])
    ], NounService);
    return NounService;
}());
exports.NounService = NounService;
//# sourceMappingURL=noun.service.js.map