import { Injectable, EventEmitter } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns';
import { Noun } from '../util/noun';

@Injectable()
export class NounService {

  selected: Noun;
  public nounSelected$: EventEmitter<Noun>;

  constructor() {
    this.nounSelected$ = new EventEmitter();
  }

  getNouns() {
    return Promise.resolve(MOCKNOUNS);
  }

  search(criteria) {
    var result = [];

    for (var i = 0; i < MOCKNOUNS.length; i++) {
      if (MOCKNOUNS[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
        result.push(MOCKNOUNS[i]);
        console.log(MOCKNOUNS[i]);
      }
    }

    return Promise.resolve(result);
  }

  getNounItems(selectedNoun) {
    return selectedNoun.items;
  }

  setSelected(noun: Noun) {
      this.selected = noun;
      this.nounSelected$.emit(noun);
      console.log("emitted");
  }

/*
  getNoun(id: number) {
    return this.getNouns()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
  */

}
