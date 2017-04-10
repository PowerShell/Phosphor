import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';

import { SessionService } from './services/session.service';
import { CollectionService } from './services/collection.service';

@Component({
  selector: 'collection-blade',
  templateUrl: 'app/html/collection.component.html',
  styleUrls: ['app/css/collection.component.css']
})
export class CollectionComponent implements OnInit {

  subscription: any;

  //Necessary imports
  constructor(
    private router: Router,
    private nounService: NounService,
    private routeParams: RouteParams,
    private http: Http,
    private session: SessionService,
    private collectionService: CollectionService) { }

  //Data for Collection
  items: string[];
  headers: string[];
  actions: string[];
  rows: any;

  currNoun: any;
  highlightedNoun: string;

  //Initialization
  ngOnInit() {
    let id = +this.routeParams.get('id');

    //As a way to keep the list empty and the spinner from spinning
    this.items = [];
    this.items.push(" ");

    this.collectionService.getCollectionActions().then(actions => this.actions = actions);

    this.subscription = this.nounService.nounSelected$.subscribe(noun => this.onNounSelectionChange(noun));
  }

  onNounSelectionChange(noun: Noun) {
    this.items = null;
    document.getElementById("listItems").style.display = "none";
    this.requestNounItems(noun.name);
    this.currNoun = noun.name;
  }


  requestNounItems(noun: string) {
    this.http.get(this.session.getUrlForSession('modules/items/' + noun))
       .subscribe(
            res => { /* console.log(res.json()); */

              var result = res.json();

              this.headers = result.headers;
              this.items = result.items;
              this.rows = [];

              for (var item of this.items) {
                var row = [];

                for (var header of this.headers) {
                  row.push(item[header]);
                }

                this.rows.push(row);
              }

              this.collectionService.setCollection(this.items, this.rows);

              document.getElementById("listItems").style.display = "block";

            },
            error => { console.log(error); this.items = null; }
    );
  }

  //Wrapper for observer pattern of service
  setSelected(item: string) {
    this.collectionService.setSelected(item);
  }

  search() {
    //This is a bit hacky as we need casting.
    var criteria = (<HTMLInputElement>document.getElementById("collection-search")).value;
    this.collectionService.search(criteria).then(rows => this.rows = rows);
  }

  itemClick(idx) {
    this.collectionService.setItemClick(idx);

    if (this.highlightedNoun) {
      document.getElementById(this.highlightedNoun).style.backgroundColor = "transparent";
    }

    this.highlightedNoun = "row-" + idx;
    document.getElementById(this.highlightedNoun).style.backgroundColor = "#CAE0F5";
  }

  //Cleanup
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
