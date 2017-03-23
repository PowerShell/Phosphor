import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class VerbService {

  //Mock Data
  verbs = ['set', 'stop', 'add', 'extend', 'modify', 'reduce', '...'];
  details = ['Name: ', 'DisplayName: ', 'Status: ', 'DependentServices: ',
             'ServicesDependedOn: ', 'CanPauseAndContinue: '];

  verbDetails: any;

  public currentCommand: string;

  public previewCommand$: EventEmitter<String>;

  //Data wrapped in a Promise
  getVerbs() {
    return Promise.resolve(this.verbs);
  }

  getDetails(verb) {
    return Promise.resolve(this.details);
  }

  public verbDetailsSelection$: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  )
  {
    this.previewCommand$ = new EventEmitter<String>();
  }

  setVerbDetails(verb) {
      this.verbDetails = verb;
      this.verbDetailsSelection$.emit(verb);
  }

  setPreview(command) {
    this.previewCommand$.emit(command);
  }

  updateConsole(command) {
    var old = document.getElementById("ps-command").innerHTML;

    document.getElementById("ps-command").innerHTML = old + '<br> <img class="ps-icon" src="./app/img/psicon.png" style="height: 38px; width: 38px; margin-bottom: 3px;"/>' + "<span>" + command + "</span>";

    //A way to quickly scroll to the bottom
    document.getElementById("ps-console").scrollTop = document.getElementById("ps-console").scrollHeight;
  }


  //General Algorithm for mapping verbs to images and similar verbs together

  //verbs[any verb]
  //if we have a dictionary of similar word relations that would be nice to build from
  //From that dictionary, we can then map images to the verbs.



}
