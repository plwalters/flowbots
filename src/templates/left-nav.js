import {bindable} from 'aurelia-framework';

export class LeftNav {
  @bindable isShowing = true;
  @bindable router;
  @bindable subRoutes = [];
  setSubRoutes(newValue) {
    this.subRoutes.splice(0, this.subRoutes.length);
    if (newValue) {
      newValue.forEach(subroute => {
        this.subRoutes.push(subroute);
      })
    }
  }
}
