export class CreateTriggerCustomAttribute {
  static inject = [Element];
  constructor(element) {
    this.element = element;
  }
  valueChanged(newValue, oldValue) {

    this.element
  }
  attached() {
    var self = this;
    this.element.addEventListener('click', () => {
      setTimeout(() => {
        let clickHandler = (event) => {
          let aureliaNode = event.target;
          while (aureliaNode !== null && aureliaNode !== undefined && aureliaNode.au === undefined) {
            aureliaNode = aureliaNode.parentNode;
          }
          document.removeEventListener('click', clickHandler);

          if (!aureliaNode) {
            debugger;
          }
          if (!aureliaNode.au['flow-action'] || !aureliaNode.au['flow-action'].viewModel) {
            debugger;
          }
          let viewModel = aureliaNode.au['flow-action'].viewModel;
          let nextAction = aureliaNode.au['flow-action'].viewModel.value;
          let nextActionId = aureliaNode.au['flow-action'].viewModel.value.id;
          self.value.nextActionId = nextActionId;
          self.value.flow.addAction(nextAction, '*', self.value);
          viewModel.generateAvailableActions();
        }
        document.addEventListener('click', clickHandler);
      }, 1);
    }, false);
  }
}
