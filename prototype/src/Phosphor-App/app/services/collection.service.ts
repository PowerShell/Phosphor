import { Injectable, EventEmitter, OnInit } from '@angular/core';

import { MOCKNOUNS } from '../util/mock-nouns';

@Injectable()
export class CollectionService {

  //Observer pattern below
  selectedItem: string;
  public itemSelected$: EventEmitter<string>;
  public itemClicked$: EventEmitter<any>;

  //Currently placed here as mock data
  actions = ['New', 'Tools', 'Batch'];
  items: string[];
  rows: string[];

  constructor() {
    this.itemSelected$ = new EventEmitter<string>();
    this.itemClicked$ = new EventEmitter<any>();
    //Grabbing to initialize first
    this.items = MOCKNOUNS[0].items;
  }

  getCollectionActions() {
    return Promise.resolve(this.actions);
  }

  //Observer pattern
  setSelected(item) {
    this.itemSelected$.emit(item);
  }

  //Called from noun service to set the items
  setCollection(items, rows) {
    this.items = items;
    this.rows = rows;
    //console.log(items);
    console.log(rows);
  }

  //This is called every keystroke to search using JavaScript's String indexOf method.
  search(criteria) {
    var result = [];

    for (var i = 0; i < this.rows.length; i++) {

      var found = false;

      if (this.rows[i] != null) {
          for (var j = 0; j < this.rows[i].length; j++) {
              if (this.rows[i][j].toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
                var found = true;
              }
          }
      }

      if (found) {
        result.push(this.rows[i]);
      }

    }

    /*
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
        result.push(this.items[i]);
        //console.log(this.items[i]);
      }
    }
    */
    return Promise.resolve(result);
  }

  setItemClick(idx) {
    console.log("Set Item Clicked");
    this.itemClicked$.emit(idx);
  }

  //General Algorithm for mapping verbs to images and similar verbs together

  //verbs[any verb]
  //if we have a dictionary of similar word relations that would be nice to build from
  //From that dictionary, we can then map images to the verbs.



}
