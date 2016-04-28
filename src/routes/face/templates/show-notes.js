import {Session} from 'services/session';

export class ShowNotes {
  static inject = [Session];
  constructor(session) {
    this.session = session;
  }
}
