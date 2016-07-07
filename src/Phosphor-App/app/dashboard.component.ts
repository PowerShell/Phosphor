import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router-deprecated';

import { Http, Response } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import { NounComponent } from './noun.component';
import { NounService } from './services/noun.service';

import { VerbService } from './services/verb.service';

import { CollectionComponent } from './collection.component';
import { DetailComponent } from './detail.component';

import { MOCKMODULES } from './util/mock-modules';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/html/dashboard.component.html',
  styleUrls: ['app/css/dashboard.component.css'],
  directives: [NounComponent, CollectionComponent, DetailComponent]
})
export class DashboardComponent implements OnInit {

  expanded: boolean = false;

  subscription: any;

  verbs: any;

  selectedNoun: any;

  constructor(
    private router: Router,
    private http: Http,
    private nounService: NounService,
    private verbService: VerbService
  ) { }

  ngOnInit() {
    this.verbs = null;

    this.subscription = this.nounService.nounSelected$.subscribe(noun => this.getVerbs(noun));
  }

  getVerbs(noun) {

    this.selectedNoun = noun.name;

    this.verbs = null;

    this.http.get('/verbs?' + "noun=" + noun.name)
       .subscribe(
            res => {  console.log(res.json());  this.verbs = res.json(); },
            error => { console.log(error); this.verbs = null; }
    );
  }

  toggleConsole() {
    if (this.expanded) {
      var dash = document.getElementById("dash").style.height = "98%";
      var psconsole = document.getElementById("ps-console").style.height = "2%";
      var psicon = document.getElementById("ps-icon").style.height = "100%";
    }
    else {
      var dash = document.getElementById("dash").style.height = "85%";
      var psconsole = document.getElementById("ps-console").style.height = "15%";
      var psicon = document.getElementById("ps-icon").style.height = "20px";
    }

    this.expanded = !this.expanded;
  }

  getCommand(verb) {
    var old = document.getElementById("ps-command").innerHTML;
    var command = verb + "-" + this.selectedNoun;

    document.getElementById("ps-command").innerHTML = old + "<span>" + command + "</span> <br>";

    document.getElementById("details").innerHTML = '<div *ngIf="!details" style="margin-top: 30%; margin-left: 7%;" class="c-progress f-indeterminate-regional" role="progressbar" aria-valuetext="Loading..." tabindex="0">'
        + '<span></span>'
        + '<span></span>'
        + '<span></span>'
        + '<span></span>'
        + '<span></span>'
        + '</div>';

    this.http.get('/command-details?' + "command=" + command)
       .subscribe(
            res => {  console.log(res.json());  this.verbService.setVerbDetails(res); },
            error => { console.log(error); }
    );

    //A way to quickly scroll to the bottom
    document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;

    //Get-Command New-Service -Syntax
  }


}
