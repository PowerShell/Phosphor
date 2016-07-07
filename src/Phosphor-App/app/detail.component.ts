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

  subscribeVerbDetails: any;

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

    this.verbService.getVerbs();

    this.subscribeVerbDetails = this.verbService.verbDetailsSelection$.subscribe(
      item => this.setVerbDetails(item)
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

  setVerbDetails(resItems) {

    var htmlBuilder = "";

    console.log("Verb details: " + resItems);
    console.log(resItems.json());

    //Currently just grabs the first option from the response.
    var items = resItems.json()[0];


    for (var i = 0; i < items.length; i++) {
      if (items[i].charAt(0) == "-") {

        htmlBuilder += "<h3> " + items[i].substring(1); + "</h3> <br>";

        if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
            htmlBuilder += "------ <button> input </button>";
        }
        else {
          htmlBuilder += '<div class="checkbox"> <label><input type="checkbox" value="">This should be a checkbox</label> </div>';
        }
      }
    }

    document.getElementById("details").innerHTML = htmlBuilder;

  }

}
