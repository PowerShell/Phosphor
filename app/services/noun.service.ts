import { Injectable, EventEmitter } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns';
import { Noun } from '../util/noun';

@Injectable()
export class NounService {

  selected: Noun;
  selectedItem: string;

  public nounSelected$: EventEmitter<Noun>;
  public itemSelected$: EventEmitter<string>;

  constructor() {
    this.nounSelected$ = new EventEmitter<Noun>();
    this.itemSelected$ = new EventEmitter<string>();
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

  getNounItems(position) {
    return MOCKNOUNS[position - 1].items;
  }

  setSelected(noun: Noun) {
      this.selected = noun;
      this.nounSelected$.emit(noun);
  }


}
