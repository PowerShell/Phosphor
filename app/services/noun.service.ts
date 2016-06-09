import { Injectable } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns'

@Injectable()
export class NounService {
  getNouns() {
    return Promise.resolve(MOCKNOUNS);
  }

/*
  getNoun(id: number) {
    return this.getNouns()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
  */

}
