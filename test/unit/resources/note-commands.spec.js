import {NoteCommands} from 'resources/commands/note';
import {Command} from 'models/command';
import {NoteService} from 'services/note';
import {Container} from 'aurelia-dependency-injection';
import {Action} from 'models/action';

describe('NoteCommands service', () => {
  let commands;
  let container;
  let noteService;
  let fakeAction;

  beforeEach(() => {
    fakeAction = new Action({});
    container = new Container().makeGlobal();
    commands = container.get(NoteCommands);
    noteService = container.get(NoteService);
  });

  describe('addNote command', () => {
    it('calls noteService .addNote with proper args', () => {
      spyOn(noteService, 'addNote');
      let message = 'Testing this';
      commands.addNote.execute(fakeAction, null, message);
      expect(noteService.addNote).toHaveBeenCalledWith(message);
    });
  });
});
