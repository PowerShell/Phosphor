import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';

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
    private collectionService: CollectionService) { }

  //Data for Collection
  items: string[];
  actions: string[];

  //Initialization
  ngOnInit() {
    let id = +this.routeParams.get('id');

    //May need to fix this. However, simply wrapping items in a promise causes errors.
    this.http.get('/shell?' + "noun=" + "service")
       .subscribe(
            res => { console.log(res.json()); this.items = res.json(); },
            error => { console.log(error); this.items = null; }
    );

    this.collectionService.getCollectionActions().then(actions => this.actions = actions);

    this.subscription = this.nounService.nounSelected$.subscribe(noun => this.onNounSelectionChange(noun));
  }

  onNounSelectionChange(noun: Noun) {
    this.items = null;
    this.http.get('/shell?' + "noun=" + noun.name)
       .subscribe(
            res => { console.log(res.json()); this.items = res.json(); },
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
    this.collectionService.search(criteria).then(items => this.items = items);
  }

  //Cleanup
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
