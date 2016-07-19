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
var collection_service_1 = require('./services/collection.service');
var verb_service_1 = require('./services/verb.service');
var DetailComponent = (function () {
    function DetailComponent(router, collectionService, http, verbService) {
        this.router = router;
        this.collectionService = collectionService;
        this.http = http;
        this.verbService = verbService;
        this.outputShown = false;
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.collectionService.itemSelected$.subscribe(function (item) { return _this.getActions(item); });
        this.verbService.getVerbs();
        this.subscribeVerbDetails = this.verbService.verbDetailsSelection$.subscribe(function (item) { return _this.setVerbDetails(item); });
        //Promises to initialize
        this.verbService.getVerbs().then(function (verbs) { return _this.verbs = verbs; });
        this.verbService.getDetails('mock').then(function (details) { return _this.details = details; });
        //Collects information from the HTTP request on syntax.
        this.detailArr = [];
        this.switchParams = [];
        //Local information for current pane
        this.inputs = [];
        this.switches = [];
        //Collects information for all switchable panes for the command
        this.allInputs = [];
        this.allSwitches = [];
        //Preloading data for services fl demo
        this.http.get('/servicefl')
            .subscribe(function (res) {
            console.log(res.json());
            //console.log(res);
            //document.getElementById("output").innerHTML = res.json();
            _this.serviceFl = res.json();
        }, function (error) { console.log(error); });
        this.itemClickSubscription = this.collectionService.itemClicked$.subscribe(function (idx) {
            return _this.setItemClicked(idx);
        });
    };
    DetailComponent.prototype.getActions = function (item) {
        console.log(item);
    };
    DetailComponent.prototype.setItemClicked = function (idx) {
        //Change HTML to serviceFL
        var htmlBuilder = "";
        var details = this.serviceFl[idx].split(";");
        console.log(this.serviceFl[idx]);
        console.log(this.serviceFl[idx].split(";"));
        for (var i = 0; i < details.length; i++) {
            console.log("deet: " + details[i]);
            htmlBuilder += "<div style='font-size: 1.15em; margin-bottom: 2%;'>" + details[i] + "</div>";
        }
        document.getElementById("information").innerHTML = htmlBuilder;
        document.getElementById("inputs").style.display = "none";
    };
    DetailComponent.prototype.setVerbDetails = function (resItems) {
        var htmlBuilder = "";
        this.detailArr = [];
        this.inputs = [];
        this.switches = [];
        this.allInputs = [];
        this.allSwitches = [];
        this.details = [];
        console.log("Verb details: " + resItems);
        console.log(resItems.json());
        for (var detailIdx = 0; detailIdx < resItems.json().length; detailIdx++) {
            var items = resItems.json()[detailIdx];
            htmlBuilder = "";
            this.allSwitches.push([]);
            this.allInputs.push([]);
            for (var i = 0; i < items.length; i++) {
                if (items[i].charAt(0) == "-") {
                    if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
                        htmlBuilder += "<h4> " + items[i].substring(1);
                        +"</h4> <br> <br> ";
                        htmlBuilder += '<input type="text" class="form-control detailInput" placeholder="">';
                        this.allInputs[detailIdx].push(items[i].substring(1));
                    }
                    else {
                        htmlBuilder += '<br> <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" (click)="addSwitchParam(' + items[i].substring(1) + ')">' + items[i].substring(1) + '</button> <br>';
                        this.allSwitches[detailIdx].push(items[i].substring(1));
                    }
                }
            }
            this.detailArr.push(htmlBuilder);
        }
        this.currDetail = 0;
        this.inputs = this.allInputs[0];
        this.switches = this.allSwitches[0];
        //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
        console.log(this.detailArr);
        console.log(this.inputs);
        console.log(this.switches);
        document.getElementById("information").innerHTML = "";
    };
    /***** PANE SWITCHING LOGIC *****/
    DetailComponent.prototype.leftDetailChange = function () {
        this.currDetail = (this.currDetail + this.detailArr.length - 1) % this.detailArr.length;
        this.inputs = this.allInputs[this.currDetail];
        this.switches = this.allSwitches[this.currDetail];
        //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
    };
    DetailComponent.prototype.rightDetailChange = function () {
        this.currDetail = (this.currDetail + 1) % this.detailArr.length;
        this.inputs = this.allInputs[this.currDetail];
        this.switches = this.allSwitches[this.currDetail];
        //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
    };
    /***** END OF PANE SWITCHING LOGIC *****/
    //HELPER FOR KEEPING TRACK OF SWITCHES
    DetailComponent.prototype.addSwitchParam = function (option) {
        console.log("switch");
        if (this.switchParams[option]) {
            this.switchParams[option] = false;
            console.log("off");
        }
        else {
            this.switchParams[option] = true;
            console.log("on");
        }
    };
    //HELPER FOR BUILDING PARAMETERS
    DetailComponent.prototype.grabParams = function () {
        var params = "";
        var inputs = document.getElementsByClassName("detailInput");
        for (var i = 0; i < inputs.length; i++) {
            var children = inputs[i].children;
            console.log(children);
            console.log(children[1]);
            console.log(children[0]);
            if (children[1] != null && children[1].value) {
                params += "-" + children[0].textContent.replace(/\s+/g, '');
                params += " " + children[1].value + " ";
            }
        }
        for (var k in this.switchParams) {
            console.log(k);
            console.log("value: " + this.switchParams[k]);
            if (this.switchParams[k] === true) {
                params += "-" + k + " ";
            }
        }
        return params;
    };
    /***** BUTTON DETAILS LOGIC *****/
    DetailComponent.prototype.run = function () {
        var _this = this;
        console.log("running");
        var params = this.grabParams();
        console.log(this.verbService.currentCommand);
        console.log("command=" + this.verbService.currentCommand + "&" + "params=" + params);
        document.getElementById("details").style.display = "none";
        document.getElementById("output").style.display = "block";
        document.getElementById("output").innerHTML = '<div style="margin-top: 50%; margin-left: 7%;" class="c-progress f-indeterminate-regional" role="progressbar" aria-valuetext="Loading..." tabindex="0">'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '<span></span>'
            + '</div>';
        this.http.get('/run?' + "command=" + this.verbService.currentCommand + "&" + "params=" + params)
            .subscribe(function (res) {
            console.log(res.json());
            //document.getElementById("output").innerHTML = res.json();
            var newHtml = "";
            var results = res.json();
            for (var i = 0; i < results.length; i++) {
                newHtml += '<div style="font-size: 1.3em;">' + results[i] + '</div>';
            }
            _this.outputShown = true;
            document.getElementById("output").innerHTML = newHtml;
        }, function (error) { console.log(error); });
        this.switchParams = [];
        this.verbService.setPreview(this.verbService.currentCommand + " " + this.grabParams());
    };
    DetailComponent.prototype.previewCommand = function (command) {
        this.verbService.setPreview(this.verbService.currentCommand + " " + this.grabParams());
    };
    DetailComponent.prototype.copyToClipboard = function () {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", this.verbService.currentCommand + " " + this.grabParams());
    };
    DetailComponent.prototype.exitOutput = function () {
        document.getElementById("details").style.display = "block";
        document.getElementById("output").style.display = "none";
        this.outputShown = false;
    };
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'detail-blade',
            templateUrl: 'app/html/detail.component.html',
            styleUrls: ['app/css/detail.component.css'],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, collection_service_1.CollectionService, http_1.Http, verb_service_1.VerbService])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=detail.component.js.map