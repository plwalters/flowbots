import {Eye} from 'models/eye';
import {containerless} from 'aurelia-framework';

@containerless
export class RightEye {
  eye = new Eye('right');
}
