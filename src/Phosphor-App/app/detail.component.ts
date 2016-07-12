import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

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
    private http: Http,
    private verbService: VerbService) { }

  //Information for Verb-Blade
  verbs: string[];
  details: string[];

  detailArr: any;
  currDetail: any;

  switchParams: any;

  inputs: string[];
  switches: string[];

  allInputs: any;
  allSwitches: any;

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
    this.switchParams = [];

    this.inputs = [];
    this.switches = [];

    this.allInputs = [];
    this.allSwitches = [];
  }

  //Called as a listener for item selected from Collection
  getActions(item) {
    //IMPLEMENT LOGIC HERE
    console.log(item);
  }

  setVerbDetails(resItems) {

    var htmlBuilder = "";
    this.detailArr = [];
    this.inputs = [];
    this.switches = [];
    this.allInputs = [];
    this.allSwitches = [];
    this.details = [];

    console.log("Verb details: " + resItems);
    console.log(resItems.json());

    for (var detailIdx = 0; detailIdx < resItems.json().length; detailIdx++) {
      var items = resItems.json()[detailIdx];

      htmlBuilder = "";

      this.allSwitches.push([]);
      this.allInputs.push([]);

      for (var i = 0; i < items.length; i++) {
        if (items[i].charAt(0) == "-") {

          if (i < items.length - 1 && items[i + 1].charAt(0) != "-") {
              htmlBuilder += "<h4> " + items[i].substring(1); + "</h4> <br> <br> ";
              htmlBuilder += '<input type="text" class="form-control detailInput" placeholder="">';
              this.allInputs[detailIdx].push(items[i].substring(1));
          }
          else {
            htmlBuilder += '<br> <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" (click)="addSwitchParam('+ items[i].substring(1) + ')">' + items[i].substring(1) +  '</button> <br>';
            this.allSwitches[detailIdx].push(items[i].substring(1));
          }
        }
      }

      this.detailArr.push(htmlBuilder);

    }

    this.currDetail = 0;

    this.inputs = this.allInputs[0];
    this.switches = this.allSwitches[0];

    //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
    console.log(this.detailArr);

    console.log(this.inputs);
    console.log(this.switches);

    document.getElementById("information").innerHTML = "";


  }

  leftDetailChange() {
    this.currDetail = (this.currDetail + this.detailArr.length - 1) % this.detailArr.length;
    this.inputs = this.allInputs[this.currDetail];
    this.switches = this.allSwitches[this.currDetail];

    //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
  }

  rightDetailChange() {
    this.currDetail = (this.currDetail + 1) % this.detailArr.length;
    this.inputs = this.allInputs[this.currDetail];
    this.switches = this.allSwitches[this.currDetail];

    //document.getElementById("details").innerHTML = this.detailArr[this.currDetail];
  }

  addSwitchParam(option) {
    console.log("switch");
    if (this.switchParams[option]) {
      this.switchParams[option] = false;
      console.log("off");
    }
    else {
      this.switchParams[option] = true;
      console.log("on");
    }
  }

  grabParams() {
    var params = "";

    var inputs = document.getElementsByClassName("detailInput");
    for (var i = 0; i < inputs.length; i++) {
      var children = (inputs[i] as any).children;

      console.log(children[3].value);
      console.log(children[0].textContent);

      if (children[3].value) {
        params += "-" + children[0].textContent.replace(/\s+/g, '');
        params += " " + children[3].value + " ";
      }

    }

    for (var k in this.switchParams) {
      console.log(k);
      console.log("value: " + this.switchParams[k]);

      if (this.switchParams[k] === true) {
        params += "-" + k;
      }

    }

    return params;
  }

  run() {
    console.log("running");

    var params = this.grabParams();

    console.log(this.verbService.currentCommand);

    console.log("command=" + this.verbService.currentCommand + "&" + "params=" + params);

    this.http.get('/run?' + "command=" + this.verbService.currentCommand + "&" + "params=" + params)
       .subscribe(
            res => {  console.log(res.json());  },
            error => { console.log(error); }
    );

    this.switchParams = [];

  }

  previewCommand(command) {
    this.verbService.setPreview(this.verbService.currentCommand + " " + this.grabParams());
  }

  copyToClipboard() {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", this.verbService.currentCommand + " " + this.grabParams());
  }

}
