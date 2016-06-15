import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

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
    private collectionService: CollectionService) { }

  //Data for Collection
  items: string[];
  actions: string[];

  //Initialization
  ngOnInit() {
    let id = +this.routeParams.get('id');

    //May need to fix this. However, simply wrapping items in a promise causes errors.
    this.items = this.nounService.getNounItems(1);
    this.collectionService.getCollectionActions().then(actions => this.actions = actions);

    this.subscription = this.nounService.nounSelected$.subscribe(noun => this.onNounSelectionChange(noun));
  }

  onNounSelectionChange(noun: Noun) {
    this.items = this.nounService.getNounItems(noun.id);
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
