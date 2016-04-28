import {Flow} from 'models/flow';
import {Action} from 'models/action';
import {RootActions} from 'resources/root-actions';
import {DataStore} from 'services/data-store';
import {Commands} from 'resources/commands';

export class RootFlowFactory {
  static inject = [Commands];
  constructor(commands) {
    this.commands = commands;
  }
  getRootFlow(matcher) {
    let result = new DataStore().getCollection('rootFlow');
    if (result) {
      result = new Flow(result);
    } else {
      result = RootFlowFactory.create(this.commands);
    }
    result.matcher = matcher;
    return result;
  }
  static create(commands) {
    let rootFlow = new Flow({name: 'Root', description: 'The Root flow for the assistant.'});
    let rootActions = new RootActions(commands);

    let rootAction = new Action({
      id: 1,
      name: 'root',
      message: 'Yes?',
      command: commands.say
    });

    let startFlow = new Action({
      id: 20,
      name: 'start_flow',
      message: 'Which flow?',
      command: commands.say
    });

    let chooseFlow = new Action({
      id: 21,
      name: 'choose_flow',
      message: 'Which flow?',
      command: commands.chooseNextFlow,
      nextActionId: 22
    });

    let setFlow = new Action({
      id: 22,
      name: 'set_flow',
      message: 'Actually sets the flow from the flow state',
      command: commands.setFlow
    });

    let changeCommand = new Action({
      id: 3,
      name: 'change_command',
      message: 'change the trigger for an action',
      command: commands.changeCommand
    });

    let goBack = new Action({
      id: 4,
      name: 'back',
      message: 'go back',
      command: commands.goBack
    });

    let listOptions = new Action({
      id: 30,
      name: 'list_options',
      message: 'read all of the current flows available triggers',
      command: commands.listOptions
    });

    rootFlow.addAction(rootAction, 'root');

    rootFlow.addAction(startFlow, 'start flow', rootAction);
    rootFlow.flows.forEach(flow => {
      console.log(flow);
    })
    rootFlow.addAction(chooseFlow, 'notes', startFlow);
    rootFlow.addAction(chooseFlow, 'introduction', startFlow);
    rootFlow.addAction(chooseFlow, 'root', startFlow);

    rootFlow.addAction(setFlow, '*', chooseFlow);

    rootFlow.addAction(changeCommand, 'change command', rootAction);
    rootFlow.addAction(goBack, 'back', rootAction);
    rootFlow.addAction(listOptions, 'list options', rootAction);

    let trainNewCommand = rootActions.trainNewCommand;
    rootFlow.addAction(trainNewCommand, 'train command', rootAction);
    let setFlowState = rootActions.setFlowState;
    let askNewCommand = rootActions.askNewCommand;
    let askCommand = rootActions.askCommand;
    let setTriggerToAction = rootActions.setTriggerToAction;
    rootFlow.addAction(askNewCommand, '*', trainNewCommand);
    rootFlow.addAction(setFlowState, '*', askNewCommand);
    rootFlow.addAction(askCommand, '*', setFlowState);
    let allTriggers = rootFlow.getRootAction().getAvailableTriggers();
    allTriggers.forEach(trigger => {
      rootFlow.addAction(setTriggerToAction, trigger, askCommand);
    });
    rootFlow.addAction(goBack, '*', setTriggerToAction);
    rootFlow.setRootAction(rootAction);
    // rootFlow.addAction(trainNewCommand, '*', rootAction);
    return rootFlow;
  }
}