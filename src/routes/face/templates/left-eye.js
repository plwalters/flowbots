import {Eye} from 'models/eye';
import {containerless} from 'aurelia-framework';

@containerless
export class LeftEye {
  eye = new Eye('left');
  thickness = 5;
}
