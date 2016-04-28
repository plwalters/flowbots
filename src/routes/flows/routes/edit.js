import {Session} from 'services/session';
import {Flow} from 'models/flow';
import {Action} from 'models/action';
import {Router} from 'aurelia-router';
import {FlowService} from 'services/flow';
import {observable} from 'aurelia-framework';

export class Edit {
  @observable value;
  rootAction;
  static inject = [Session, Router, FlowService];
  constructor(session, router, flowService) {
    this.session = session;
    this.router = router;
    this.flowService = flowService;
  }
  activate(params) {
    this.value = Flow.findById(params.id, this.session.flows);
    if (this.value) {
      this.rootAction = this.value.getRootAction();
    }
  }
  attached() {
    if (!this.value) {
      return this.router.navigateToRoute('list');
    }
  }
  createFlow(flow) {
    let newAction = new Action({name: 'root', root: true});
    let newFlow = new Flow({name: ''});
    newFlow.addAction(newAction, 'root');
    this.session.flows.push(newFlow);
    flow.addFlow(newFlow);
  }
  save() {
    this.flowService.saveFlows(this.session.flows);
    this.router.navigateToRoute('list');
  }
  delete() {
    let index = this.session.flows.indexOf(this.value);
    this.session.flows.splice(index, 1);
    this.flowService.saveFlows(this.session.flows);
    this.router.navigateToRoute('list');
  }
  deleteAction(action) {
    let match = this.value.actions.filter(flowAction => {
      return flowAction.id === action.id;
    })[0];
    let index = this.value.actions.indexOf(match);
    if (index !== -1) {
      this.value.actions.splice(index, 1);
    }
  }
}
