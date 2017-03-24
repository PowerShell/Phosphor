"use strict";
var mock_nouns_1 = require('./mock-nouns');
exports.MOCKMODULES = [];
exports.all = {
    name: "All",
    nouns: mock_nouns_1.MOCKNOUNS,
    id: 0
};
exports.moduleA = {
    name: "Module A",
    nouns: [],
    id: 1
};
exports.moduleB = {
    name: "Module B",
    nouns: [],
    id: 2
};
exports.moduleC = {
    name: "Module C",
    nouns: [],
    id: 3
};
for (var i = 0; i < mock_nouns_1.MOCKNOUNS.length / 3; i++) {
    exports.moduleA.nouns.push(mock_nouns_1.MOCKNOUNS[i]);
}
for (var i = Math.ceil(mock_nouns_1.MOCKNOUNS.length / 3); i < 2 * mock_nouns_1.MOCKNOUNS.length / 3; i++) {
    exports.moduleB.nouns.push(mock_nouns_1.MOCKNOUNS[i]);
}
for (var i = Math.ceil(2 * mock_nouns_1.MOCKNOUNS.length / 3); i < mock_nouns_1.MOCKNOUNS.length; i++) {
    exports.moduleC.nouns.push(mock_nouns_1.MOCKNOUNS[i]);
}
exports.MOCKMODULES.push(exports.all);
exports.MOCKMODULES.push(exports.moduleA);
exports.MOCKMODULES.push(exports.moduleB);
exports.MOCKMODULES.push(exports.moduleC);
//# sourceMappingURL=mock-modules.js.map