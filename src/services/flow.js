import {DataStore} from 'services/data-store';
import {RootFlowFactory} from 'services/root-flow-factory';
import {RootMatcher} from 'resources/root-matcher';
import {NotesFlowFactory} from 'services/notes-flow-factory';
import {NotesMatcher} from 'resources/notes-matcher';
import {Commands} from 'resources/commands';
import {Flow} from 'models/flow';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'resources/config';

export class FlowService {
  static inject = [DataStore, RootMatcher, NotesMatcher, NotesFlowFactory, RootFlowFactory, Commands, Config];
  constructor(dataStore, rootMatcher, notesMatcher, notesFlowFactory, rootFlowFactory, commands, config) {
    this.dataStore = dataStore;
    this.rootMatcher = rootMatcher;
    this.notesMatcher = notesMatcher;
    this.notesFlowFactory = notesFlowFactory;
    this.rootFlowFactory = rootFlowFactory;
    this.commands = commands;
    this.http = new HttpClient()
      .configure(x => {
        x.withBaseUrl(config.domain);
        x.withHeader('Content-Type', 'application/json');
      });
  }
  getAllFlows() {
    let finalFlows = [];
    let allFlows = this.dataStore.getCollection('flows');
    if (!allFlows || allFlows.length === 0) {
      finalFlows = this.createAllFlows();
    } else {
      allFlows.forEach(flow => {
        let thisFlow = new Flow(flow);
        thisFlow.setMatcher([this.rootMatcher, this.notesMatcher]);
        finalFlows.push(thisFlow);
      });
    }
    this.saveFlows(allFlows);
    return finalFlows;
  }
  saveFlows(value) {
    let saveValue = value;
    return this.dataStore.setCollection('flows', saveValue, 'flow');
  }
  saveFlowRemotely(value) {
    let saveValue = this.serializeFlow(value);
    return this.http.post('flow/' + value.id, saveValue);
  }
  createAllFlows() {
    let finalFlows = [];
    this.http.get('flows').then(response => {
      response.content.forEach(flow => {
        finalFlows.push(new Flow(flow));
      });
      this.saveFlows(finalFlows);
    });
    // let rootFlow = this.createRootFlow(this.commands, this.rootMatcher);
    // let notesFlow = this.createNotesFlow(this.commands, this.notesMatcher);
    return finalFlows;
  }
  createRootFlow() {
    return this.rootFlowFactory.getRootFlow(this.rootMatcher);
  }
  createNotesFlow() {
    return this.notesFlowFactory.getNotesFlow(this.notesMatcher);
  }
  clearAllFlows() {
    return this.dataStore.clearCollection('flows');
  }
  serializeFlow(rawValue) {
    let ignorePropName = 'flow';
    let newValue = JSON.stringify(rawValue, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (key === ignorePropName) {
          return;
        }
      }
      return value;
    });
    return newValue;
  }
}
