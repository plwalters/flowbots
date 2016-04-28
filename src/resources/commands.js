import {RootCommands} from 'resources/commands/root';
import {NoteCommands} from 'resources/commands/note';
import {Command} from 'models/command';

export class Commands {
  commands = [];
  static inject = [RootCommands, NoteCommands];
  constructor(rootCommands, noteCommands) {
    this.rootCommands = rootCommands.commands;
    this.noteCommands = noteCommands.commands;
    this.commands = this.rootCommands.concat(this.noteCommands);
    this.combineCommands(rootCommands);
    this.combineCommands(noteCommands);
  }
  combineCommands(commands) {
    for (var prop in commands) {
      if (commands[prop] instanceof Command) {
        this[prop] = commands[prop];
      }
    }
  }
}
