import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'verb-blade',
  templateUrl: 'app/html/verb.component.html',
  styleUrls: ['app/css/verb.component.css'],
})
export class VerbComponent implements OnInit {

  constructor(private router: Router) { }

  verbs = ['set', 'stop', 'add', 'extend', 'modify', 'reduce', '...'];

  ngOnInit() {

  }

/*
  handleItem(item: String) {

  }
  */
}
