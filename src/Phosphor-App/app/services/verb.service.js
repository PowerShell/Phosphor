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
var VerbService = (function () {
    function VerbService() {
        //Mock Data
        this.verbs = ['set', 'stop', 'add', 'extend', 'modify', 'reduce', '...'];
        this.details = ['Name: ', 'DisplayName: ', 'Status: ', 'DependentServices: ',
            'ServicesDependedOn: ', 'CanPauseAndContinue: '];
        this.verbDetailsSelection$ = new core_1.EventEmitter();
        this.previewCommand$ = new core_1.EventEmitter();
    }
    //Data wrapped in a Promise
    VerbService.prototype.getVerbs = function () {
        return Promise.resolve(this.verbs);
    };
    VerbService.prototype.getDetails = function (verb) {
        return Promise.resolve(this.details);
    };
    VerbService.prototype.setVerbDetails = function (verb) {
        this.verbDetails = verb;
        this.verbDetailsSelection$.emit(verb);
    };
    VerbService.prototype.setPreview = function (command) {
        this.previewCommand$.emit(command);
    };
    VerbService.prototype.updateConsole = function (command) {
        var old = document.getElementById("ps-command").innerHTML;
        document.getElementById("ps-command").innerHTML = old + '<br> <img class="ps-icon" src="./app/img/psicon.png" style="height: 38px; width: 38px; margin-bottom: 3px;"/>' + "<span>" + command + "</span>";
        //A way to quickly scroll to the bottom
        document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;
    };
    VerbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VerbService);
    return VerbService;
}());
exports.VerbService = VerbService;
//# sourceMappingURL=verb.service.js.map