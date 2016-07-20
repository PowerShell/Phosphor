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
var verb_service_1 = require('./services/verb.service');
var collection_component_1 = require('./collection.component');
var detail_component_1 = require('./detail.component');
var DashboardComponent = (function () {
    function DashboardComponent(router, http, nounService, verbService) {
        this.router = router;
        this.http = http;
        this.nounService = nounService;
        this.verbService = verbService;
        this.expanded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.verbs = null;
        this.subscription = this.nounService.nounSelected$.subscribe(function (noun) { return _this.getVerbs(noun); });
        this.psSubscription = this.verbService.previewCommand$.subscribe(function (command) {
            _this.updateConsole(command);
        });
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
            var dash = document.getElementById("dash").style.height = "97.5%";
            var psconsole = document.getElementById("ps-console").style.height = "2.5%";
            var psicons = document.getElementsByClassName("ps-icon");
            for (var i = 0; i < psicons.length; i++) {
                psicons[i].style.height = "100%";
            }
            //A way to quickly scroll to the bottom
            document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;
        }
        else {
            var dash = document.getElementById("dash").style.height = "85%";
            var psconsole = document.getElementById("ps-console").style.height = "15%";
            var psicons = document.getElementsByClassName("ps-icon");
            for (var i = 0; i < psicons.length; i++) {
                psicons[i].style.height = "30px";
            }
        }
        this.expanded = !this.expanded;
    };
    DashboardComponent.prototype.getCommand = function (verb) {
        var _this = this;
        document.getElementById("output").style.display = "none";
        document.getElementById("inputs").style.display = "none";
        var command = verb + "-" + this.selectedNoun;
        this.updateConsole(command);
        document.getElementById("information").innerHTML = '<div *ngIf="!details" style="margin-top: 30%; margin-left: 7%;" class="c-progress f-indeterminate-regional" role="progressbar" aria-valuetext="Loading..." tabindex="0">'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '</div>';
        this.verbService.currentCommand = command;
        this.http.get('/command-details?' + "command=" + command)
            .subscribe(function (res) {
            console.log(res.json());
            _this.verbService.setVerbDetails(res);
            document.getElementById("inputs").style.display = "block";
            document.getElementById("details").style.display = "block";
        }, function (error) { console.log(error); });
        //Get-Command New-Service -Syntax
    };
    DashboardComponent.prototype.updateConsole = function (command) {
        var old = document.getElementById("ps-command").innerHTML;
        document.getElementById("ps-command").innerHTML = old + '<br> <img class="ps-icon" src="./app/img/psicon.png" style="height: 100%; width: 30px;"/>' + "<span>" + command + "</span>";
        //A way to quickly scroll to the bottom
        document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/html/dashboard.component.html',
            styleUrls: ['app/css/dashboard.component.css'],
            directives: [noun_component_1.NounComponent, collection_component_1.CollectionComponent, detail_component_1.DetailComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, http_1.Http, noun_service_1.NounService, verb_service_1.VerbService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map