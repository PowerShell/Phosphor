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
var noun_component_1 = require('./noun.component');
var noun_service_1 = require('./services/noun.service');
var collection_component_1 = require('./collection.component');
var detail_component_1 = require('./detail.component');
var DashboardComponent = (function () {
    function DashboardComponent(router, http, nounService) {
        this.router = router;
        this.http = http;
        this.nounService = nounService;
        this.expanded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.verbs = null;
        this.subscription = this.nounService.nounSelected$.subscribe(function (noun) { return _this.getVerbs(noun); });
    };
    DashboardComponent.prototype.getVerbs = function (noun) {
        var _this = this;
        this.selectedNoun = noun.name;
        this.verbs = null;
        this.http.get('/verbs?' + "noun=" + noun.name)
            .subscribe(function (res) { console.log(res.json()); _this.verbs = res.json(); }, function (error) { console.log(error); _this.verbs = null; });
    };
    DashboardComponent.prototype.toggleConsole = function () {
        if (this.expanded) {
            var dash = document.getElementById("dash").style.height = "98%";
            var psconsole = document.getElementById("ps-console").style.height = "2%";
            var psicon = document.getElementById("ps-icon").style.height = "100%";
        }
        else {
            var dash = document.getElementById("dash").style.height = "85%";
            var psconsole = document.getElementById("ps-console").style.height = "15%";
            var psicon = document.getElementById("ps-icon").style.height = "20px";
        }
        this.expanded = !this.expanded;
    };
    DashboardComponent.prototype.getCommand = function (verb) {
        var old = document.getElementById("ps-command").innerHTML;
        document.getElementById("ps-command").innerHTML = old + "<span>" + verb + "-" + this.selectedNoun + "</span> <br>";
        //A way to quickly scroll to the bottom
        document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;
        //Get-Command New-Service -Syntax
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/html/dashboard.component.html',
            styleUrls: ['app/css/dashboard.component.css'],
            directives: [noun_component_1.NounComponent, collection_component_1.CollectionComponent, detail_component_1.DetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, noun_service_1.NounService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map