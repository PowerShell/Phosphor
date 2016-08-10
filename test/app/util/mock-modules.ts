import { Noun } from './noun';
import { MOCKNOUNS } from './mock-nouns';

export var MOCKMODULES = [];

export var all = {
    name: "All",
    nouns: MOCKNOUNS,
    id: 0
}

export var moduleA = {
  name: "Module A",
  nouns: [],
  id: 1
};

export var moduleB = {
  name: "Module B",
  nouns: [],
  id: 2
};

export var moduleC = {
  name: "Module C",
  nouns: [],
  id: 3
};

for (var i = 0; i < MOCKNOUNS.length/3; i++) {
    moduleA.nouns.push(MOCKNOUNS[i]);      
}

for (var i = Math.ceil(MOCKNOUNS.length / 3); i < 2 * MOCKNOUNS.length / 3; i++) {
    moduleB.nouns.push(MOCKNOUNS[i]);   
}

for (var i = Math.ceil(2 * MOCKNOUNS.length / 3); i < MOCKNOUNS.length; i++) {
    moduleC.nouns.push(MOCKNOUNS[i]);    
}

MOCKMODULES.push(all);
MOCKMODULES.push(moduleA);
MOCKMODULES.push(moduleB);
MOCKMODULES.push(moduleC);
