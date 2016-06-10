import { Injectable } from '@angular/core';

@Injectable()
export class VerbService {

  verbs = ['set', 'stop', 'add', 'extend', 'modify', 'reduce', '...'];

  getVerbs() {
      return Promise.resolve(this.verbs);
  }

}
