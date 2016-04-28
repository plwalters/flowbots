import {FlowService} from 'services/flow';

export class Index {
  static inject = [FlowService];
  constructor(flowService) {
    this.flowService = flowService;
  }
  clearFlows() {
    this.flowService.clearAllFlows();
  }
}
