import {Session} from 'services/session';
import {Flow} from 'models/flow';
import {Router} from 'aurelia-router';
import {bindable} from 'aurelia-framework';

export class Show {
  @bindable value;
  static inject = [Session, Router];
  constructor(session, router) {
    this.session = session;
    this.router = router;
  }
  activate(params) {
    this.value = Flow.findById(params.id, this.session.flows);
  }
  attached() {
    if (!this.value) {
      return this.router.navigateToRoute('list');
    }
  }
}
