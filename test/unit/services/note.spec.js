import {NoteService} from 'services/note';
import {Container} from 'aurelia-dependency-injection';
import {Note} from 'models/note';
import {DataStore} from 'services/data-store';

describe('NoteService', () => {
  let container;
  let noteService;
  let dataStore;

  beforeEach(() => {
    container = new Container().makeGlobal();
    noteService = container.get(NoteService);
    dataStore = container.get(DataStore);
  });

  describe('.getAllNotes', () => {
    it('gets all notes from localStorage', () => {
      let testValue = new Note({message:'test'});
      dataStore.setCollection('notes', [testValue]);
      let result = noteService.getAllNotes();
      expect(result).toEqual([testValue]);
    });
  });

  describe('.addNote', () => {
    it('adds a new note to something', () => {
      let testValue = 'test';
      noteService.addNote(testValue);
      let result = noteService.getAllNotes();
      expect(result[0].message).toEqual(testValue);
    });
  });

  describe('.removeNoteById', () => {
    it('removes a note by id and saves localStorage', () => {
      let testValue = new Note({message:'test'});
      let testValueTwo = new Note({message:'testtwo'});
      dataStore.setCollection('notes', [testValue, testValueTwo]);
      noteService.removeNoteById(testValue.id);
      let result = noteService.getAllNotes();
      expect(result).toEqual([testValueTwo]);
    });
  });

  describe('.clearAllNotes', () => {
    it('removes all notes and saves localStorage', () => {
      let testValue = [{message:'test'}];
      dataStore.setCollection('note', testValue);
      noteService.clearAllNotes();
      let result = noteService.getAllNotes();
      expect(result).toEqual([]);
    });
  });
});
