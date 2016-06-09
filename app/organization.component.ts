import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';

@Component({
  selector: 'organization-blade',
  templateUrl: 'app/html/organization.component.html',
  styleUrls: ['app/css/organization.component.css'],
  providers: [NounService]
})
export class OrganizationComponent implements OnInit {

  constructor(private router: Router, private nounService: NounService) { }

  items = ['mockNoun1', 'mockNoun2', 'mockNoun3', 'mockNoun4', 'mockNoun5', 'mockNoun6', 'mockNoun7'];

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
