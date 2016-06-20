import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router-deprecated';

import { NounComponent } from './noun.component';
import { CollectionComponent } from './collection.component';
import { VerbComponent } from './verb.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/html/dashboard.component.html',
  styleUrls: ['app/css/dashboard.component.css'],
  directives: [NounComponent, CollectionComponent, VerbComponent]
})
export class DashboardComponent implements OnInit {

  @Input() selectedNoun;

  expanded: boolean = false;

  constructor(
    private router: Router) { }

  ngOnInit() {

  }

  toggleConsole() {
    if (this.expanded) {
      var dash = document.getElementById("dash").style.height = "98%";
      var psconsole = document.getElementById("ps-console").style.height = "2%";
    }
    else {
      var dash = document.getElementById("dash").style.height = "90%";
      var psconsole = document.getElementById("ps-console").style.height = "10%";      
    }

    this.expanded = !this.expanded;
  }

}
