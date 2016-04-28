export class Matcher {
  name = '';
  constructor(data) {
    Object.assign(this, data);
  }
  match(action, message, currentFlowMatcher) {
    console.error('Matchers should override the default match behavior');
  }
}
