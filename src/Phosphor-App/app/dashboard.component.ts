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

  constructor(
    private router: Router) { }

  ngOnInit() {

  }

}
