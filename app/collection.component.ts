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

  items = this.nounService.getNounItems(1);

  actions = ['New', 'Tools', 'Batch'];

  onNounSelectionChange(noun: Noun) {
    this.items = this.nounService.getNounItems(noun.id);
  }

  ngOnInit() {
    let id = +this.routeParams.get('id');

    this.subscription = this.nounService.nounSelected$.subscribe(noun => this.onNounSelectionChange(noun))

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
