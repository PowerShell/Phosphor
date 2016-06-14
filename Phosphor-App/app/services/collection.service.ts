import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CollectionService {

  //Observer pattern below
  selectedItem: string;
  public itemSelected$: EventEmitter<string>;

  //Currently placed here as mock data
  actions = ['New', 'Tools', 'Batch'];

  constructor() {
    this.itemSelected$ = new EventEmitter<string>();
  }

  getCollectionActions() {
    return Promise.resolve(this.actions);
  }

  //Observer pattern
  setSelected(item) {
    this.itemSelected$.emit(item);
  }

  //General Algorithm for mapping verbs to images and similar verbs together

  //verbs[any verb]
  //if we have a dictionary of similar word relations that would be nice to build from
  //From that dictionary, we can then map images to the verbs.



}
