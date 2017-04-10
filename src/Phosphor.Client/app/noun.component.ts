import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Noun } from './util/noun';
import { NounService } from './services/noun.service';
import { VerbService } from './services/verb.service';
import { DetailComponent } from './detail.component';

@Component({
  selector: 'noun-blade',
  templateUrl: 'app/html/noun.component.html',
  styleUrls: ['app/css/noun.component.css']
})
export class NounComponent implements OnInit {

  constructor(
    private router: Router,
    private nounService: NounService,
    private verbService: VerbService) { }

  nouns: Noun[];
  modules: any;
  selectedModule: any;
  selectedNoun: string;

  getNouns() {
      this.nounService.getNouns().then(moduleInfo => {
        this.nouns = moduleInfo.nouns;
        this.modules = moduleInfo.modules;
        this.selectedModule = this.modules[0];
      });
  }

  ngOnInit() {
      this.getNouns();
  }

  search() {
    //This is a bit hacky as we need casting.
    var criteria = (<HTMLInputElement>document.getElementById("noun-search")).value;
    this.nounService.search(criteria).then(modules => this.modules = modules);

  }

  setSelected(selectedNoun) {
    this.nounService.setSelected(selectedNoun);
    this.verbService.updateConsole("Get-" + selectedNoun.name);
  }

  selectModule(selectedModule) {
      this.nouns = selectedModule.nouns;
      this.selectedModule = selectedModule;

      //DOM manipulation
      document.getElementById("module-dropdown").innerHTML = selectedModule.name + ' <span class="caret" > </span>';
  }

  toggleModule(moduleName) {
    var moduleNouns = document.getElementById(moduleName + "-nouns");
    var moduleClick = document.getElementById(moduleName + "-click");

    if (moduleClick.className.includes("glyphicon-triangle-right")) {
      moduleClick.className = "glyphicon glyphicon-triangle-bottom";
    }
    else {
      moduleClick.className = "glyphicon glyphicon-triangle-right";
    }

    if (moduleNouns.style.display === "none") {
      moduleNouns.style.display = "block";
    }
    else {
      moduleNouns.style.display = "none";
    }
  }
}
