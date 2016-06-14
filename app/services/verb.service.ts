import { Injectable } from '@angular/core';

@Injectable()
export class VerbService {

  verbs = ['set', 'stop', 'add', 'extend', 'modify', 'reduce', '...'];
  details = ['Name: ', 'DisplayName: ', 'Status: ', 'DependentServices: ',
             'ServicesDependedOn: ', 'CanPauseAndContinue: '];

  getVerbs() {
    return Promise.resolve(this.verbs);
  }

  getDetails(verb) {
    return this.details;
  }

  //General Algorithm for mapping verbs to images and similar verbs together

  //verbs[any verb]
  //if we have a dictionary of similar word relations that would be nice to build from
  //From that dictionary, we can then map images to the verbs.



}
