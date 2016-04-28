export class AvailableValueConverter {
  toView(value, activeAction) {
    let triggers = activeAction.getAvailableTriggers();
    let wildcardIndex = triggers.indexOf('*');
    if (wildcardIndex !== -1) {
      triggers.splice(wildcardIndex, 1);
    }
    return triggers;
  }
}
