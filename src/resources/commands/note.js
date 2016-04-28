import {Command} from 'models/command';
import {NoteService} from 'services/note';

export class NoteCommands {
  face;
  commands = [];
  static inject = [NoteService];
  constructor(noteService) {
    this.noteService = noteService;

    this.addNote = new Command({ name: 'add_note' });
    this.addNote.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        this.noteService.addNote(args);
        resolve();
      });
    };
    this.commands.push(this.addNote);

    this.takeNotes = new Command({ name: 'take_note' });
    this.takeNotes.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        action.flow.state.currentNote += args + ', ';
        resolve();
      });
    };
    this.commands.push(this.takeNotes);

    this.finishTakingNotes = new Command({ name: 'finish_take_note' });
    this.finishTakingNotes.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        this.noteService.addNote(action.flow.state.currentNote);
        action.flow.state.currentNote = '';
        resolve();
      });
    };
    this.commands.push(this.finishTakingNotes);

    this.readNotes = new Command({ name: 'read_notes' });
    this.readNotes.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        let message = '';
        let notes = this.noteService.getAllNotes();
        if (notes.length) {
          message = 'Here are your notes: ';
          notes.forEach(note => {
            message += note.message + '; ';
          });
          message += '  That is all.';
        } else {
          message = 'You have no notes.';
        }
        this.face.speak(message);
        resolve();
      });
    };
    this.commands.push(this.readNotes);

    this.clearAllNotes = new Command({ name: 'clear_notes' });
    this.clearAllNotes.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        this.noteService.clearAllNotes();
        resolve();
      });
    };
    this.commands.push(this.clearAllNotes);

    this.sendNotes = new Command({ name: 'send_notes' });
    this.sendNotes.execute = (action, parent, args) => {
      return new Promise((resolve, reject) => {
        this.noteService.sendNotes();
        resolve();
      });
    };
    this.commands.push(this.sendNotes);
  }
}
