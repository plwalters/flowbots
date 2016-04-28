import {Command} from 'models/command';

export class RootCommands {
  commands = [];
  constructor(face) {
    this.face = face;
    this.say = new Command({ name: 'say' });
    this.say.execute = (action) => {
      return new Promise((resolve, reject) => {
        this.face.speak(action.message);
        resolve();
      });
    };
    this.commands.push(this.say);

    this.listen = new Command({ name: 'listen' });
    this.listen.execute = (action) => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.listen);

    this.setFlow = new Command({ name: 'set_flow' });
    this.setFlow.execute = (action, parent, args) => {
      let nextFlow = action.flow.state.nextFlow;
      this.face.setCurrentFlow(nextFlow);
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.setFlow);
    this.listOptions = new Command({ name: 'list options' });
    this.listOptions.execute = (action, parent, args) => {
      let triggers = parent.getAvailableTriggers();
      let result = '';
      triggers.forEach(trigger => {
        result += trigger +'. ';
      });
      result += 'That is all';
      return new Promise((resolve, reject) => {
        this.face.speak(result);
        resolve(parent);
      });
    };
    this.commands.push(this.listOptions);
    this.listFlows = new Command({ name: 'list flows' });
    this.listFlows.execute = (action, parent, args) => {
      let flows = parent.flow.availableFlows;
      let result = '';
      flows.forEach(flow => {
        result += flow.name +'. ';
      });
      result += 'That is all';
      return new Promise((resolve, reject) => {
        this.face.speak(result);
        resolve(parent);
      });
    };
    this.commands.push(this.listFlows);
    this.goBack = new Command({ name: 'go back' });
    this.goBack.execute = (action, parent, args) => {
      let rootAction = parent.flow.getRootAction();
      return new Promise((resolve, reject) => {
        resolve(rootAction);
      });
    };
    this.commands.push(this.goBack);

    this.backToRoot = new Command({ name: 'go back to root' });
    this.backToRoot.execute = (action, parent, args) => {
      let rootFlow = this.face.session.rootFlow;
      this.face.setCurrentFlow(rootFlow);
      let rootAction = rootFlow.getRootAction();
      return new Promise((resolve, reject) => {
        resolve(rootAction);
      });
    };
    this.commands.push(this.backToRoot);

    this.setFlowState = new Command({ name: 'set flow state' });
    this.setFlowState.execute = (action, parent, args) => {
      action.flow.state.lastTrigger = args;
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.setFlowState);

    this.chooseNextFlow = new Command({ name: 'set flow state next flow' });
    this.chooseNextFlow.execute = (action, parent, args) => {
      let match = this.face.session.flows.filter(flow => {
        return flow.name.toLowerCase() === args;
      })[0];
      action.flow.state.nextFlow = match;
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.chooseNextFlow);

    this.setStateOriginalAction = new Command({ name: 'set state original action' });
    this.setStateOriginalAction.execute = (action, parent, args) => {
      action.flow.state.originalAction = parent;
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.setStateOriginalAction);
    this.setTrigger = new Command({ name: 'set trigger' });
    this.setTrigger.execute = (action, parent, args) => {
      let trigger = action.flow.state.lastTrigger;
      let originalAction = action.flow.state.originalAction;
      let newAction = action.flow.getRootAction().findByTrigger(args, action.flow.actions);
      action.flow.addAction(newAction, trigger, originalAction);
      return new Promise((resolve, reject) => {
        resolve();
      });
    };
    this.commands.push(this.setTrigger);
  }
}
