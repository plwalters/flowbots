import {bindable} from 'aurelia-framework';
import {Commands} from 'resources/commands';

export class EditAction {
  @bindable value;
  @bindable saveCallback = () => {};
  availableCommands = [];
  static inject = [Commands];
  constructor(commands) {
    this.availableCommands = commands.commands;
  }
  save() {
    if (this.value.isNew) {
      this.value.flow.actions.push(this.value);
    }
    this.saveCallback(this.value);
  }
}
