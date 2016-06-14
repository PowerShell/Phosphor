import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { CollectionService } from './services/collection.service';
import { VerbService } from './services/verb.service';

@Component({
  selector: 'verb-blade',
  templateUrl: 'app/html/verb.component.html',
  styleUrls: ['app/css/verb.component.css'],
})
export class VerbComponent implements OnInit {

  subscription: any;

  constructor(private router: Router, private collectionService: CollectionService,
  private verbService: VerbService) { }

  verbs: string[];
  details: string[] = this.verbService.getDetails();

  ngOnInit() {
    this.subscription = this.collectionService.itemSelected$.subscribe(
      item => this.getActions(item)
    );

    this.verbService.getVerbs().then(verbs => this.verbs = verbs);    
  }

  getActions(item) {
    //IMPLEMENT LOGIC HERE
    console.log(item);
  }

}
