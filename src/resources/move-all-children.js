export class MoveAllChildrenCustomAttribute {
  static inject = [Element];
  constructor(element) {
    this.element = element;
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

          let keys = self.value.availableActionKeys;
          for (var key in keys) {
            if (!keys.hasOwnProperty(key)) continue;
            if (viewModel.trigger !== key) {
              let value = keys[key];
              let childAction = this.value.findByTrigger(key, this.value.flow.actions);
              if (childAction.nextActionId === this.value.id) {
                childAction.nextActionId = viewModel.value.id;
              }
              delete self.value.availableActionKeys[key];
              viewModel.value.availableActionKeys[key] = value;
            }
          }
          if (viewModel.parent) {
            viewModel.parent.generateAvailableActions();
            viewModel.generateAvailableActions();
          }
        }
        document.addEventListener('click', clickHandler);
      }, 1);
    }, false);
  }
}
