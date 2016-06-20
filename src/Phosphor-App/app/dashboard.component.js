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
var noun_component_1 = require('./noun.component');
var collection_component_1 = require('./collection.component');
var verb_component_1 = require('./verb.component');
var mock_modules_1 = require('./util/mock-modules');
var DashboardComponent = (function () {
    function DashboardComponent(router) {
        this.router = router;
        this.expanded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log(mock_modules_1.MOCKMODULES);
    };
    DashboardComponent.prototype.toggleConsole = function () {
        if (this.expanded) {
            var dash = document.getElementById("dash").style.height = "98%";
            var psconsole = document.getElementById("ps-console").style.height = "2%";
        }
        else {
            var dash = document.getElementById("dash").style.height = "85%";
            var psconsole = document.getElementById("ps-console").style.height = "15%";
        }
        this.expanded = !this.expanded;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "selectedNoun", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/html/dashboard.component.html',
            styleUrls: ['app/css/dashboard.component.css'],
            directives: [noun_component_1.NounComponent, collection_component_1.CollectionComponent, verb_component_1.VerbComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map