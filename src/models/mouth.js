export class MouthModel {
  top = new MouthTop('40', '210', '150', 200, '260', '210');
  bottom = new MouthBottom('40', '210', '150', 200, '260', '210');
  get topValue () {
    return 'M' + this.top.x1 + ' ' + this.top.y1 + ' Q ' + this.top.x2 + ' ' + this.top.y2 + ' ' + this.top.x3 + ' ' + this.top.y3;
  }
  get bottomValue () {
    return 'M' + this.bottom.x1 + ' ' + this.bottom.y1 + ' Q ' + this.bottom.x2 + ' ' + this.bottom.y2 + ' ' + this.bottom.x3 + ' ' + this.bottom.y3;
  }
  separation() {
    return this.bottom.y2 - this.top.y2;
  }
  open() {
    this.top.y2 -= 5;
    this.bottom.y2 += 5;
  }
  close() {
    this.top.y2 += 5;
    this.bottom.y2 -= 5;
  }
}

class MouthTop {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }
}

class MouthBottom {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }
}
