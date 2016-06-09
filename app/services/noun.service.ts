import { Injectable } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns'

@Injectable()
export class NounService {
  getNouns() {
    return Promise.resolve(MOCKNOUNS);
  }

  search(criteria) {
    var result = [];

    for (var i = 0; i < MOCKNOUNS.length; i++) {
      if (MOCKNOUNS[i].name.indexOf(criteria) != -1) {
        result.push(MOCKNOUNS[i]);
        console.log(MOCKNOUNS[i]);
      }
    }

    return Promise.resolve(result);
  }

/*
  getNoun(id: number) {
    return this.getNouns()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
  */

}
