import {Session} from 'services/session';
import {Router} from 'aurelia-router';
import {FlowService} from 'services/flow';

export class List {
  static inject = [Session, Router, FlowService];
  constructor(session, router, flowService) {
    this.session = session;
    this.router = router;
    this.flowService = flowService;
  }
  saveAllFlows() {
    this.session.flows.forEach(flow => {
      this.flowService.saveFlowRemotely(flow)
        .then(result => {
          console.log(result);
        });
    });
  }
}
