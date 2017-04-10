import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { Noun } from '../util/noun';

import { SessionService } from './session.service';
import { CollectionService } from './collection.service';

interface VerbJson {
  name: string;
}

interface NounJson {
  name: string;
  verbs: VerbJson[];
}

interface ModuleJson {
  name: string;
  nouns: NounJson[];
}

@Injectable()
export class NounService {

  selected: Noun;
  nouns: any;
  modules: any;

  public nounSelected$: EventEmitter<Noun>;

  constructor(
    private session: SessionService,
    private collectionService: CollectionService,
    private http: Http
  )
  {
    this.nounSelected$ = new EventEmitter<Noun>();
  }

  ngOnInit() {

  }

  buildModuleInfo(modules: ModuleJson[]): any {

    var moduleInfo = {
      nouns: [],
      modules: []
    };

    var allModule = {
      name: "All",
      nouns: []
    }

    moduleInfo.modules.push(allModule);

    var nounId = 0;

    for (var module of modules) {

      var moduleModel = {
        name: module.name,
        nouns: []
      };

      moduleInfo.modules.push(moduleModel);

      for (var noun of module.nouns) {

        var nounModel = {
          name: noun.name,
          id: nounId++,
          items: [],
          verbs: noun.verbs.map(verb => verb.name).filter(verb => verb !== "Get"),
          module: module.name
        }

        moduleInfo.nouns.push(nounModel);        
        moduleModel.nouns.push(nounModel);
        allModule.nouns.push(nounModel);
      }
    }

    return moduleInfo;
  }

  getNouns() {
    return this.http
        .get(this.session.getUrlForSession('modules'))
        .toPromise()
        .then((res) => {
          var moduleInfo = this.buildModuleInfo(res.json());

          this.modules = moduleInfo.modules;
          this.nouns = moduleInfo.nouns;

          return moduleInfo;
        });
  }

  getVerbs(nounName: string) {
    return this.nouns.filter(noun => noun.name === nounName)[0].verbs;
  }

  //This is called every keystroke to search using JavaScript's String indexOf method.
  search(criteria) {
      var result = [];

      for (var i in this.modules) {
        var nouns = this.modules[i].nouns;

        for (var j = 0; j < nouns.length; j++) {
          if (this.modules[i].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1 || nouns[j].name.toLowerCase().indexOf(criteria.toLowerCase()) != -1) {
              result.push(this.modules[i]);
              break;
          }
        }
      }

      return Promise.resolve(result);
  }

  //Observer pattern to emit noun to subscribers
  setSelected(noun: Noun) {
      this.selected = noun;
      this.nounSelected$.emit(noun);
      //this.collectionService.setCollection(noun.items);
  }
}
