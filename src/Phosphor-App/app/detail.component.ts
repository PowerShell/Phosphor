import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { CollectionService } from './services/collection.service';
import { VerbService } from './services/verb.service';

@Component({
  selector: 'detail-blade',
  templateUrl: 'app/html/detail.component.html',
  styleUrls: ['app/css/detail.component.css'],
})
export class DetailComponent implements OnInit {

  subscription: any;

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private verbService: VerbService) { }

  //Information for Verb-Blade
  verbs: string[];
  details: string[];

  ngOnInit() {
    this.subscription = this.collectionService.itemSelected$.subscribe(
      item => this.getActions(item)
    );

    //Promises to initialize
    this.verbService.getVerbs().then(verbs => this.verbs = verbs);
    this.verbService.getDetails('mock').then(details => this.details = details);
  }

  //Called as a listener for item selected from Collection
  getActions(item) {
    //IMPLEMENT LOGIC HERE
    console.log(item);
  }

}
