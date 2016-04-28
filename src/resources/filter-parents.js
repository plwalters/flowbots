export class FilterParentsValueConverter {
  toView(value, parent) {
    let availableActions = [];
    value.forEach(action => {
      if (!parent) {
        availableActions.push(action);
      } else if (action.value.id !== parent.value.id) {
        if (parent.parent) {
          if (parent.parent.value.id !== action.value.id) {
            if (!parent.parent.parent) {
              availableActions.push(action);
            } else if (parent.parent.parent.value.id !== action.value.id) {
              availableActions.push(action);
            }
          }
        } else {
          availableActions.push(action);
        }
      }
    });
    return availableActions;
  }
}

