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
var VerbComponent = (function () {
    function VerbComponent(router) {
        this.router = router;
        this.verbs = ['set', 'new', 'add', 'extend', 'modify', 'reduce'];
    }
    VerbComponent.prototype.ngOnInit = function () {
    };
    VerbComponent = __decorate([
        core_1.Component({
            selector: 'verb-blade',
            templateUrl: 'app/html/verb.component.html',
            styleUrls: ['app/css/verb.component.css'],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], VerbComponent);
    return VerbComponent;
}());
exports.VerbComponent = VerbComponent;
//# sourceMappingURL=verb.component.js.map