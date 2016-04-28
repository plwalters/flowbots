import {Action} from 'models/action';
import {Commands} from 'resources/commands';

export class RootActions {
  trainNewCommand;
  setFlowState;
  askCommand;
  setTriggerToCommand;
  static inject = [Commands];
  constructor(commands) {
    this.commands = commands;
    this.createCommandTrainingActions(this.commands);
    this.createFlowActions(this.commands);
  }
  createCommandTrainingActions(commands) {
    this.trainNewCommand = new Action({
      id: 5,
      name: 'train_command',
      message: 'trains a new command',
      command: this.commands.setStateOriginalAction,
      nextActionId: 6
    });
    this.askNewCommand = new Action({
      id: 6,
      name: 'ask_new_command',
      message: 'What new command do you want to train?',
      command: this.commands.say
    });
    this.setFlowState = new Action({
      id: 7,
      name: 'set_flow_state',
      message: 'sets the flow state with the response',
      command: this.commands.setFlowState,
      nextActionId: 8
    });
    this.askCommand = new Action({
      id: 8,
      name: 'ask_command',
      message: 'What command do you want to use?',
      command: this.commands.say
    });
    this.setTriggerToAction = new Action({
      id: 9,
      name: 'set_trigger_to_command',
      message: 'Sets the last trigger from flow state to ',
      command: this.commands.setTrigger,
      nextActionId: 4
    });
  }
  createFlowActions(commands) {
    this.listFlows = new Action({
      id: 5,
      name: 'list_flows',
      message: 'lists all of the available flows',
      command: this.commands.listFlows,
      nextActionId: 4
    });
  }
}
