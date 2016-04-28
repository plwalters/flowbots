import {Action} from 'models/action';

export class NotesActions {
  constructor(commands) {
    this.commands = commands;
    this.createActions(this.commands);
  }
  createActions(commands) {
    this.replace = new Action({
      id: 5,
      name: 'train_command',
      message: 'trains a new command',
      command: this.commands.setStateOriginalAction,
      nextActionId: 6
    });
  }
}
