import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { MOCKNOUNS } from '../util/mock-nouns';
import { MOCKMODULES } from '../util/mock-modules';
import { Noun } from '../util/noun';

import { CollectionService } from './collection.service';

@Injectable()
export class NounService {

  selected: Noun;
  nouns: any;
  modules: any;

  public nounSelected$: EventEmitter<Noun>;

  constructor(
    private collectionService: CollectionService,
    private http: Http
  )
  {
    this.nounSelected$ = new EventEmitter<Noun>();
  }

  ngOnInit() {

  }

  getNouns() {
    var servernouns = "" + document.getElementById("server-nouns").innerHTML;

    var splitted = servernouns.split(",");

    this.nouns = [];
    this.modules = [];

    //Module that contains all nouns:
    var allModule = {
      name: "All",
      nouns: []
    };

    for (var i = 0; i < splitted.length; i++) {

      var separate = splitted[i].split("-");

      var noun = separate[0];
      var module = separate[1];

      var newNoun = {
        name: noun,
        id: i,
        items: [],
        module: module
      };

      this.nouns.push(newNoun);

      if (!this.modules[module]) {

        var newModule = {
          name: module,
          nouns: []
        };

        newModule.nouns.push(newNoun);

        this.modules[module] = newModule;
      }
      else {
        this.modules[module].nouns.push(newNoun);
      }

      allModule.nouns.push(newNoun);
    }

    this.modules.push(allModule);

    return Promise.resolve(this.nouns);
    //return Promise.resolve(MOCKNOUNS);
  }

  getModules() {

    var allModules = [];

    for (var k in this.modules) {
      allModules.push(this.modules[k]);
    }

    return Promise.resolve(allModules);
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
  getNounItems(name) {

    //TODO Make an HTTP request to grab data from the server on the noun

/*
    var test = this.http.get("/shell").map(function(res) {
      console.log(res);
    }).catch(function(err, caught) {
      console.log(err);
      return caught;
    });

    console.log("test: " + test.json());
    */

    var nounItems;

    this.http.get('/nounitems?' + "noun=" + name)
       .subscribe(
            res => { console.log(res.json()); nounItems = res.json(); },
            error => { console.log(error); nounItems = null; }
    );

    setTimeout((function() {console.log("HELLO WORLD!" + nounItems); return nounItems;}), 2000);

    //return MOCKNOUNS[2 - 1].items;
  }

  //Observer pattern to emit noun to subscribers
  setSelected(noun: Noun) {
      this.selected = noun;
      this.nounSelected$.emit(noun);
      this.collectionService.setCollection(noun.items);
  }


}
