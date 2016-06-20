import { Injectable, EventEmitter } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns';
import { MOCKMODULES } from '../util/mock-modules';
import { Noun } from '../util/noun';

import { CollectionService } from './collection.service';

@Injectable()
export class NounService {

  selected: Noun;

  public nounSelected$: EventEmitter<Noun>;

  constructor(
    private collectionService: CollectionService
  )
  {
    this.nounSelected$ = new EventEmitter<Noun>();
  }

  getNouns() {
    return Promise.resolve(MOCKNOUNS);
  }

  getModules() {
    return Promise.resolve(MOCKMODULES);
  }

  //This is called every keystroke to search using JavaScript's String indexOf method.
  search(criteria, nouns) {
      var result = [];

      for (var i = 0; i < nouns.length; i++) {
          if (nouns[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
              result.push(nouns[i]);              
          }
      }

      return Promise.resolve(result);
  }

  //Gets the items for the selected noun.
  getNounItems(position) {
    return MOCKNOUNS[position - 1].items;
  }  

  //Observer pattern to emit noun to subscribers
  setSelected(noun: Noun) {
      this.selected = noun;
      this.nounSelected$.emit(noun);
      this.collectionService.setCollection(noun.items);
  }


}
