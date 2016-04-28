import {newId} from 'resources/id-generator';

export class Note {
  id;
  message = '';
  type;
  constructor(data) {
    if (!data || (data && !data.id)) {
      let _newId = { id: newId() };
      Object.assign(data || {}, _newId);
    }
    Object.assign(this, data);
  }
}
