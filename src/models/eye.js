import {Point} from 'models/point';

const LEFT_TOP_SHAPE = [ new Point('50', '80'), new Point('127', '80') ];
const LEFT_BOTTOM_SHAPE = [ LEFT_TOP_SHAPE[0], new Point('176', '140'), new Point('124', '140'), LEFT_TOP_SHAPE[1] ];

const RIGHT_TOP_SHAPE = [ new Point('173', '80'), new Point('250', '80') ];
const RIGHT_BOTTOM_SHAPE = [ RIGHT_TOP_SHAPE[0], new Point('176', '140'), new Point('124', '140'), RIGHT_TOP_SHAPE[1] ];

export class Eye {
  top;
  bottom;
  thickness = 5;
  token;
  constructor(direction) {
    if (direction === 'left') {
      this.top = new EyeTop(LEFT_TOP_SHAPE);
      this.bottom = new EyeBottom(LEFT_BOTTOM_SHAPE);
    } else {
      this.top = new EyeTop(RIGHT_TOP_SHAPE);
      this.bottom = new EyeBottom(RIGHT_BOTTOM_SHAPE);
    }
  }
  get bottomValue() {
    return 'M' + this.bottom.x1 + ' ' + this.bottom.y1 + ' C ' + this.bottom.x2 + ' ' + this.bottom.y2 + ', ' + this.bottom.x3 + ' ' + this.bottom.y3 + ', ' + this.bottom.x4 + ' ' + this.bottom.y4;
  }
  startTalking() {
    this.token = setInterval(() => {
      if (this.thickness === 4) {
        this.thickness = 3;
      } else {
        this.thickness = 4;
      }
    }, 250);
  }
  stopTalking() {
    clearInterval(this.token);
  }
}

class EyeTop {
  constructor(topShape) {
    this.x1 = topShape[0].x;
    this.y1 = topShape[0].y;
    this.x2 = topShape[1].x;
    this.y2 = topShape[1].y;
  }
}

class EyeBottom {
  constructor(bottomShape) {
    this.x1 = bottomShape[0].x;
    this.y1 = bottomShape[0].y;
    this.x2 = bottomShape[1].x;
    this.y2 = bottomShape[1].y;
    this.x3 = bottomShape[2].x;
    this.y3 = bottomShape[2].y;
    this.x4 = bottomShape[3].x;
    this.y4 = bottomShape[3].y;
  }
}
