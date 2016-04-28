import {Bot} from 'models/bot';
import {FlowService} from 'services/flow';
import {Lazy} from 'aurelia-dependency-injection';

export class Session {
  flows = [];
  rootFlow;
  notesFlow;
  static inject = [FlowService];
  constructor(flowService) {
    this.flowService = flowService;
    this.bot = new Bot();
    this.getFlows();
  }
  getFlows() {
    this.flows = this.flowService.getAllFlows();
    this.rootFlow = this.flows.filter(flow => {
      return flow.name === 'Root';
    })[0];
    this.notesFlow = this.flows.filter(flow => {
      return flow.name === 'Notes';
    })[0];
  }
}
