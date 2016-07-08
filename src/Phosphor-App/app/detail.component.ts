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

  detailArr: any;
  currDetail: any;

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


    this.detailArr = [];
  }

  //Called as a listener for item selected from Collection
  getActions(item) {
    //IMPLEMENT LOGIC HERE
    console.log(item);
  }

  setVerbDetails(resItems) {

    var htmlBuilder = "";
    this.detailArr = [];

    console.log("Verb details: " + resItems);
    console.log(resItems.json());

    for (var detailIdx = 0; detailIdx < resItems.json().length; detailIdx++) {
      var items = resItems.json()[detailIdx];

      htmlBuilder = "";

      for (var i = 0; i < items.length; i++) {
        if (items[i].charAt(0) == "-") {

          if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
              htmlBuilder += "<h4> " + items[i].substring(1); + "</h4> <br> <br> ";
              htmlBuilder += '<input type="text" class="form-control" placeholder="">';
          }
          else {
            htmlBuilder += '<br> <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">' + items[i].substring(1) +  '</button> <br>';
          }
        }
      }

      this.detailArr.push(htmlBuilder);

    }

    this.currDetail = 0;

    document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
    console.log(this.detailArr);

    /*
    //Currently just grabs the first option from the response.
    var items = resItems.json()[0];

    for (var i = 0; i < items.length; i++) {
      if (items[i].charAt(0) == "-") {

        if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
            htmlBuilder += "<h4> " + items[i].substring(1); + "</h4> <br> <br> ";
            htmlBuilder += '<input type="text" class="form-control" placeholder="">';
        }
        else {
          htmlBuilder += '<br> <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">' + items[i].substring(1) +  '</button> <br>';
        }
      }
    }

    document.getElementById("details").innerHTML = htmlBuilder;

    */

  }

  leftDetailChange() {
    this.currDetail = (this.currDetail + this.detailArr.length - 1) % this.detailArr.length;
    document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
  }

  rightDetailChange() {
    this.currDetail = (this.currDetail + 1) % this.detailArr.length;
    document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
  }

}
