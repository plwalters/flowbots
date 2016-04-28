import {bindable} from 'aurelia-framework';
import {Action} from 'models/action';

export class EditTrigger {
  @bindable value;
  @bindable actions;
  actionToEdit;
  createAction() {
    this.actionToEdit = new Action({});
    this.actionToEdit.isNew = true;
    this.actionToEdit.flow = this.actions[0].flow;
  }
  editAction() {
    this.actionToEdit = this.value.selectedAction;
    this.actionToEdit.flow = this.value.selectedAction.flow;
  }
  actionToEditSaved(action) {
    this.actionToEdit = null;
  }
}
