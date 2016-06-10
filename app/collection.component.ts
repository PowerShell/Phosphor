import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';

@Component({
  selector: 'collection-blade',
  templateUrl: 'app/html/collection.component.html',
  styleUrls: ['app/css/collection.component.css'],
  providers: [NounService]
})
export class CollectionComponent implements OnInit {

  constructor(private router: Router, private nounService: NounService) { }

  items = ['mockNoun1 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun2 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun3 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun4 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun5 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun6 | mockAttr1 | mockAttr2 | mockAttr3',
           'mockNoun7 | mockAttr1 | mockAttr2 | mockAttr3'];

  actions = ['New', 'Tools', 'Batch'];

  getItems() {

  }

  ngOnInit() {
    this.getItems();
  }

/*
  handleItem(item: String) {

  }
  */
}
