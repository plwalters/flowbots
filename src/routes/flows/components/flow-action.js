import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Trigger} from 'flows/models/trigger';
import {EditTriggerModal} from 'flows/components/edit-trigger-modal';

export class FlowAction {
  @bindable trigger;
  @bindable value;
  @bindable parent;
  availableActions = [];
  isOpen = false;
  static inject = [DialogService];
  constructor(dialogService) {
    this.dialogService = dialogService;
  }
  attached() {
    this.generateAvailableActions();
  }
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  valueChanged(newValue) {
    if (newValue) {
      // this.generateAvailableActions();
    }
  }
  generateAvailableActions(triggerParent) {
    if (this.parent && triggerParent) {
      this.parent.generateAvailableActions();
    }
    this.availableActions.splice(0, this.availableActions.length);
    let keys = this.value.availableActionKeys;
    for (let prop in keys) {
      let nextAction = this.value.findByTrigger(prop, this.value.flow.actions);
      this.availableActions.push({
        name: prop,
        value: nextAction
      });
    };
  }
  addTrigger() {
    let newTrigger = new Trigger();
    let model = { trigger: newTrigger, actions: this.value.flow.actions };
    this.dialogService.open({ viewModel: EditTriggerModal, model: model }).then(response => {
      if (!response.wasCancelled) {
        this.value.createTrigger(newTrigger.trigger, newTrigger.selectedAction.id);
        this.generateAvailableActions(true);
      } else {
        console.log('bad');
      }
    });
  }
  editTrigger() {
    let trigger = new Trigger();
    trigger.trigger = this.trigger;
    trigger.selectedAction = this.value;
    let model = { trigger: trigger, actions: this.value.flow.actions };
    this.dialogService.open({ viewModel: EditTriggerModal, model: model }).then(response => {
      if (!response.wasCancelled) {
        this.parent.value.updateTrigger(this.trigger, trigger.trigger, trigger.selectedAction.id);
        this.generateAvailableActions(true);
      } else {
        console.log('bad');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  deleteTrigger() {
    this.parent.value.deleteTrigger(this.trigger);
    this.parent.generateAvailableActions();
  }
  clearAllTriggers() {
    this.value.getAvailableTriggers().forEach(trigger => {
      this.value.deleteTrigger(trigger);
    });
    this.generateAvailableActions();
  }
}
