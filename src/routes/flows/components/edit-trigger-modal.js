import {DialogController} from 'aurelia-dialog';

export class EditTriggerModal {
  value;
  actions = [];
  static inject = [DialogController];
  constructor(controller) {
    this.controller = controller;
  }
  activate(model) {
    this.value = model.trigger;
    this.actions = model.actions;
  }
  save() {
    if (this.value && this.value.selectedAction && this.value.selectedAction !== 'Choose action...') {
      this.controller.ok(this.value);
    }
  }
}
