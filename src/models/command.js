import {newId} from 'resources/id-generator';

export class Command {
  id;
  name = '';
  constructor(data) {
    this.id = (data && data.id) ? data.id : newId();
    Object.assign(this, data);
  }
  execute(action) {
    console.error('Command should implement its own execute method');
  }
}
