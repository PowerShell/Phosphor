import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';

@Component({
  selector: 'collection-blade',
  templateUrl: 'app/html/collection.component.html',
  styleUrls: ['app/css/collection.component.css']
})
export class CollectionComponent implements OnInit {

  subscription: any;

  constructor(private router: Router, private nounService: NounService,
  private routeParams: RouteParams) {
  }

  items = this.nounService.getNounItems({
    id: 1,
    name: 'AppxPackage',
    items: ['AppxPackage1 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage2 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage3 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage4 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage5 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage6 | mockAttr1 | mockAttr2 | mockAttr3',
            'AppxPackage7 | mockAttr1 | mockAttr2 | mockAttr3']
  });

  actions = ['New', 'Tools', 'Batch'];

  getItems() {

  }

  onNounSelectionChange(noun: Noun) {
    console.log(noun.name);
  }

  ngOnInit() {
    let id = +this.routeParams.get('id');
    console.log("Here is the id: " + id);
    this.getItems();

    console.log(this.nounService.nounSelected$.observers);
    Promise.resolve(this.subscription =
      this.nounService.nounSelected$.subscribe(noun => this.onNounSelectionChange(noun))))

    console.log(this.nounService.nounSelected$);
    console.log(this.nounService.nounSelected$.observers);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

/*
  handleItem(item: String) {

  }
  */
}
