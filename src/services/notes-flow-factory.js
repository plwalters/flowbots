import {Flow} from 'models/flow';
import {Action} from 'models/action';
import {NotesActions} from 'resources/notes-actions';
import {DataStore} from 'services/data-store';
import {Commands} from 'resources/commands';

export class NotesFlowFactory {
  static inject = [Commands];
  constructor(commands) {
    this.commands = commands;
  }
  getNotesFlow(matcher) {
    let result = new DataStore().getCollection('notesFlow');
    if (result) {
      result = new Flow(result);
    } else {
      result = NotesFlowFactory.create(this.commands);
    }
    result.matcher = matcher;
    return result;
  }
  static create(commands) {
    let notesFlow = new Flow({name: 'Notes', description: 'The flow for creating and reading notes.'});
    let notesActions = new NotesActions(commands);

    let rootAction = new Action({
      id: 1,
      name: 'root',
      message: 'Welcome to notes.',
      command: commands.say
    });

    let addNote = new Action({
      id: 210,
      name: 'add note',
      message: 'What is the note?',
      command: commands.say
    });
    let recordNote = new Action({
      id: 211,
      name: 'record note',
      message: 'recording note',
      command: commands.addNote,
      nextActionId: 300
    });

    let goBack = new Action({
      id: 300,
      name: 'go back',
      message: 'go back',
      command: commands.goBack
    });

    let takeNotes = new Action({
      id: 220,
      name: 'take notes',
      message: 'Take notes.',
      command: commands.say
    });

    let readNotes = new Action({
      id: 4,
      name: 'read notes',
      message: 'Reading notes.',
      command: commands.readNotes,
      nextActionId: 300
    });

    let sendNotes = new Action({
      id: 400,
      name: 'send notes',
      message: 'Notes sent',
      command: commands.sendNotes,
      nextActionId: 401
    });
    let confirmNotesSent = new Action({
      id: 401,
      name: 'confirm_notes_sent',
      message: 'Notes sent',
      command: commands.say
    });

    let clearNotes = new Action({
      id: 500,
      name: 'clear notes',
      message: 'Are you sure?',
      command: commands.say
    });
    let confirmClearNotes = new Action({
      id: 501,
      name: 'clearing notes',
      message: 'Clearing notes',
      command: commands.clearAllNotes,
      nextActionId: 300
    });

    notesFlow.addAction(rootAction, 'root');
    notesFlow.addAction(addNote, 'add note', rootAction);
    notesFlow.addAction(recordNote, '*', addNote);
    notesFlow.addAction(goBack, '*', recordNote);

    notesFlow.addAction(takeNotes, 'take notes', rootAction);

    notesFlow.addAction(readNotes, 'read my notes', rootAction);
    notesFlow.addAction(goBack, '*', readNotes);

    notesFlow.addAction(sendNotes, 'send notes', rootAction);
    notesFlow.addAction(confirmNotesSent, '*', sendAction);
    notesFlow.addAction(goBack, '*', confirmNotesSent);

    notesFlow.addAction(clearNotes, 'clear my notes', rootAction);
    notesFlow.addAction(confirmClearNotes, 'yes', clearNotes);
    notesFlow.addAction(goBack, '*', confirmClearNotes);
    notesFlow.addAction(goBack, 'no', clearNotes);

    return notesFlow;
  }
}
