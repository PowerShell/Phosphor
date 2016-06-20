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
var NounComponent = (function () {
    function NounComponent(router, nounService) {
        this.router = router;
        this.nounService = nounService;
    }
    NounComponent.prototype.getNouns = function () {
        var _this = this;
        this.nounService.getNouns().then(function (nouns) { return _this.nouns = nouns; });
    };
    NounComponent.prototype.getModules = function () {
        var _this = this;
        this.nounService.getModules().then(function (modules) {
            _this.modules = modules;
            _this.selectedModule = _this.modules[0];
        });
    };
    NounComponent.prototype.getNounsByModule = function () {
    };
    NounComponent.prototype.ngOnInit = function () {
        this.getNouns();
        this.getModules();
    };
    NounComponent.prototype.search = function () {
        var _this = this;
        //This is a bit hacky as we need casting.
        var criteria = document.getElementById("noun-search").value;
        this.nounService.search(criteria, this.selectedModule.nouns).then(function (nouns) { return _this.nouns = nouns; });
    };
    NounComponent.prototype.setSelected = function (selectedNoun) {
        this.nounService.setSelected(selectedNoun);
    };
    NounComponent.prototype.selectModule = function (selectedModule) {
        this.nouns = selectedModule.nouns;
        this.selectedModule = selectedModule;
        //DOM manipulation
        document.getElementById("module-dropdown").innerHTML = selectedModule.name + ' <span class="caret" > </span>';
    };
    NounComponent = __decorate([
        core_1.Component({
            selector: 'noun-blade',
            templateUrl: 'app/html/noun.component.html',
            styleUrls: ['app/css/noun.component.css']
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, noun_service_1.NounService])
    ], NounComponent);
    return NounComponent;
}());
exports.NounComponent = NounComponent;
//# sourceMappingURL=noun.component.js.map