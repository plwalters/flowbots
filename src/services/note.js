import {DataStore} from 'services/data-store';
import {Note} from 'models/note';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'resources/config';

export class NoteService {
  static inject = [DataStore, Config];
  constructor(dataStore, config) {
    this.dataStore = dataStore;
    this.http = new HttpClient()
      .configure(x => {
        x.withBaseUrl(config.domain);
        x.withHeader('Content-Type', 'application/json');
      });
  }
  getAllNotes() {
    let result = this.dataStore.getCollection('notes');
    let finalNotes = [];
    if (result) {
      result.forEach(note => {
        finalNotes.push(new Note(note));
      });
    }
    return finalNotes;
  }
  addNote(message) {
    let allNotes = this.getAllNotes();
    let newNote = new Note({message: message});
    allNotes.push(newNote);
    this.saveNotes(allNotes);
    return allNotes;
  }
  removeNoteById(id) {
    let allNotes = this.getAllNotes();
    let match = allNotes.filter(note => {
      return note.id === id;
    })[0];
    if (match) {
      let index = allNotes.indexOf(match);
      allNotes.splice(index, 1);
      this.saveNotes(allNotes);
    }
  }
  clearAllNotes() {
    this.saveNotes([]);
  }
  saveNotes(notes) {
    return this.dataStore.setCollection('notes', notes);
  }
  sendNotes() {
    let notes = this.getAllNotes();
    return this.http.post('notes/send/patrickwaltersc21@yahoo.com', notes);
  }
}
