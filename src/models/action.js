import {newId} from 'resources/id-generator';
import {Commands} from 'resources/commands';
import {Container} from 'aurelia-dependency-injection';

export class Action {
  id;
  name = '';
  message = '';
  command;
  nextActionId;
  availableActionKeys = {};
  root = false;
  flow;
  isNew = false;
  constructor(data) {
    this.id = data.id ? data.id : newId();
    this.name = data.name;
    this.root = data.root;
    this.message = data.message;
    let command = Object.assign({ name: '' }, data ? data.command : {});
    this.command = Action.findCommandByName(command.name);
    this.nextActionId = data.nextActionId;
    this.availableActionKeys = data.availableActionKeys || {};
  }
  static findCommandByName(name) {
    if (!name) {
      return null;
    }
    let commands = Container.instance.get(Commands).commands;
    let match = commands.filter(command => {
      return command.name === name;
    })[0];
    return match;
  }
  execute(parent, args) {
    return this.command.execute(this, parent, args);
  }
  createTrigger(trigger, id) {
    this.availableActionKeys[trigger] = id;
  }
  findNextAction(actions) {
    let match = this.getAvailableActions(actions).filter(action => {
      return action.id.toString() === this.nextActionId.toString();
    })[0];
    if (!match) {
      debugger;
      this.nextActionId = null;
    }
    return match;
  }
  getAvailableActions(actions) {
    let result = [];
    let ids = [];
    for (let key in this.availableActionKeys) {
      let value = this.availableActionKeys[key];
      ids.push(value);
    }
    for (let i = 0; i < actions.length; i++) {
      if (ids.indexOf(actions[i].id) !== -1) {
        result.push(actions[i]);
      }
    }
    return result;
  }
  getAvailableTriggers() {
    let result = [];
    for (let key in this.availableActionKeys) {
      result.push(key);
    }
    return result;
  }
  findByTrigger(name, actions) {
    let matchingId;
    if (!actions) {
      console.error('Must provide actions');
      return;
    }
    for (let key in this.availableActionKeys) {
      let value = this.availableActionKeys[key];
      if (key === name) {
        matchingId = value;
      }
    }
    let match = this.getAvailableActions(actions).filter(action => {
      return action.id === matchingId;
    })[0];
    return match;
  }
  updateTrigger(oldTrigger, newTrigger, newId) {
    delete this.availableActionKeys[oldTrigger];
    this.availableActionKeys[newTrigger] = newId;
  }
  deleteTrigger(oldTrigger) {
    delete this.availableActionKeys[oldTrigger];
  }
}
