import {MouthModel} from 'models/mouth';
import {bindable, containerless} from 'aurelia-framework';

@containerless
export class Mouth {
  value = new MouthModel();
  @bindable isTalking = false;
  token;
  thickness = 5;
  startTalking() {
    this.token = setInterval(() => {
      let val = Math.random() < 0.5 ? true : false;
      if (val) {
        this.bigger();
      } else {
        this.smaller();
      }
    }, 50);
  }
  stopTalking() {
    clearInterval(this.token);
  }
  shut() {
    this.value.top.y2 = 200;
    this.value.bottom.y2 = 200;
  }
  bigger() {
    if (this.value.separation() < 140) {
      this.value.open();
    }
  }
  smaller() {
    if (this.value.separation() !== 0) {
      this.value.close();
    }
  }
}
