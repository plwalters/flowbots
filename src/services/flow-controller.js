export class FlowController {
  runCycle(options) {
    let rootFlow = options.rootFlow;
    let currentFlow = options.currentFlow;
    let trigger = options.trigger;
    this.matchAction(currentFlow, rootFlow, trigger)
      .then(result => {
        this.handleResult(currentFlow, rootFlow, result);
      });
  }
  matchAction(currentFlow, rootFlow, trigger) {
    let childMatcher;
    if (currentFlow !== rootFlow) {
      childMatcher = currentFlow.matcher;
    }
    return rootFlow.matcher.match(currentFlow.actions, currentFlow.activeAction, trigger, childMatcher)
      .then((result) => {
        let action = result.action;
        let args = result.args;
        if (!action) {
          return false;
        }
        let lastAction = currentFlow.activeAction;
        currentFlow.activeAction = action;
        return action.execute(lastAction, args);
      });
  }
  handleResult(currentFlow, rootFlow, result) {
    if (result) {
      currentFlow.activeAction = result;
    } else if (currentFlow.activeAction.nextActionId) {
      result = currentFlow.activeAction.findNextAction(currentFlow.actions);
      this.runCycle({
        currentFlow: currentFlow,
        rootFlow: rootFlow,
        trigger: '*'
      });
    }
  }
}
