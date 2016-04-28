import {newId} from 'resources/id-generator';
import {Action} from 'models/action';
import {Container} from 'aurelia-dependency-injection';
import {Commands} from 'resources/commands';

export class Flow {
  id;
  name = '';
  actions = [];
  activeAction;
  flows = [];
  state = new FlowState();
  matcher;
  matcherName;
  constructor(data) {
    if (!data || (data && !data.id)) {
      let _newId = { id: newId() };
      Object.assign(data || {}, _newId);
    } else if (data && data.state) {
      data.state = new FlowState(data.state);
    }
    if (data && data.actions) {
      let finalActions = [];
      data.actions.forEach(action => {
        if (action.command && !action.command.execute) {
          let commands = Container.instance.get(Commands).commands;
          let commandName = action.command.name;
          let match = commands.filter(command => {
            return command.name === commandName;
          })[0];
          action.command = match;
        }
        let newAction = new Action(action);
        newAction.flow = this;
        finalActions.push(newAction);
      });
      data.actions = finalActions;
      if (data.activeAction) {
        // Commenting to always start at route.
        // This prevents remembering last state
        // let matchingAction = data.actions.filter(action => {
        //   return action.id === data.activeAction.id;
        // })[0];
        // data.activeAction = matchingAction;
        data.activeAction = this.getRootAction();
      } else {
        data.activeAction = data.actions[0];
      }
    }
    Object.assign(this, data);
  }
  addAction(action, trigger, parentAction) {
    if (!parentAction) {
      this.setRootAction(action);
    } else {
      action.root = false;
      parentAction.createTrigger(trigger, action.id);
    }
    action.flow = this;
    this.actions.push(action);
  }
  addFlow(newFlow) {
    this.flows.push(newFlow);
  }
  getRootAction() {
    return this.actions.filter(action => {
      return action.root;
    })[0];
  }
  setRootAction(action) {
    this.actions.forEach(act => {
      act.root = false;
    });
    action.root = true;
  }
  setActiveAction(action) {
    this.activeAction = action;
  }
  setMatcher(matchers) {
    if (!this.matcherName) {
      this.matcherName = this.name.toLowerCase() + '_matcher';
    }
    let match = matchers.filter(matcher => {
      return matcher.name === this.matcherName;
    })[0];
    this.matcher = match;
  }
  static findById(id, flows) {
    return flows.filter(flow => {
      return flow.id === parseInt(id);
    })[0];
  }
}

class FlowState {
  nextFlow;
  lastAction;
  originalAction;
  lastTrigger;
  currentNote = '';
}
