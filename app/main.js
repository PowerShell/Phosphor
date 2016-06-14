"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_component_1 = require('./app.component');
var noun_service_1 = require('./services/noun.service');
var verb_service_1 = require('./services/verb.service');
var collection_service_1 = require('./services/collection.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS, noun_service_1.NounService, verb_service_1.VerbService, collection_service_1.CollectionService
]);
//# sourceMappingURL=main.js.map