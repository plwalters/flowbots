// import {Session} from 'services/session';
// import {Container} from 'aurelia-dependency-injection';
// import {FlowService} from 'services/flow';

// describe('Session', () => {
//   let container;
//   let session;

//   beforeEach(() => {
//     container = new Container().makeGlobal();
//     session = container.get(Session);
//     window.localStorage.clear();
//   });

//   describe('.constructor', () => {
//     beforeEach(() => {
//       spyOn(session, 'getTrainedMessages');
//       spyOn(session, 'getNotes');
//     });

//     it('calls for trainedMessages and notes', () => {
//       let flowService = container.get(FlowService);
//       session.constructor(null, flowService);
//       expect(session.getTrainedMessages).toHaveBeenCalled();
//       expect(session.getNotes).toHaveBeenCalled();
//     });
//   });

//   describe('.addTrainedMessage', () => {
//     beforeEach(() => {
//       spyOn(window.localStorage, 'setItem');
//     });

//     it('calls localStorage.setItem with the matching item name', () => {
//       let name = 'test';
//       let value = { name: 'test' };
//       expect(session.trainedMessages.length).toEqual(0);
//       session.addTrainedMessage(name, value);
//       expect(session.trainedMessages.length).toEqual(1);
//       expect(window.localStorage.setItem).toHaveBeenCalledWith('trainedMessages', JSON.stringify(session.trainedMessages));
//     });
//   });

//   describe('.addNote', () => {
//     beforeEach(() => {
//       spyOn(window.localStorage, 'setItem');
//     });

//     it('calls localStorage.setItem with the matching item name', () => {
//       let name = 'test';
//       let value = 'test note';
//       expect(session.notes.length).toEqual(0);
//       session.addNote(name, value);
//       expect(session.notes.length).toEqual(1);
//       expect(window.localStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify(session.notes));
//     });
//   });

//   describe('.deleteAllNotes', () => {
//     beforeEach(() => {
//       spyOn(window.localStorage, 'setItem');
//       session.addNote('testing');
//     });

//     it('sets session.notes item to empty array', () => {
//       session.deleteAllNotes();
//       expect(session.notes).toEqual([]);
//     });

//     it('sets localStorage.notes item to empty array', () => {
//       session.deleteAllNotes();
//       session.getNotes();
//       expect(session.notes).toEqual([]);
//     });
//   });
// });
