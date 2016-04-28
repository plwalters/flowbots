import {Flow} from 'models/flow';
import {Action} from 'models/action';
import {Container} from 'aurelia-dependency-injection';
import {Session} from 'services/session';

describe('Flow model', () => {
  let flow;
  let actionOne;
  let actionTwo;
  let actionThree;
  let flows;
  let session;
  let container;

  beforeEach(() => {
    container = new Container().makeGlobal();
    session = Container.instance.get(Session);
    flow = new Flow({id: 24});
    actionOne = new Action(actionOneData, session);
    actionTwo = new Action(actionTwoData, session);
    actionThree = new Action(actionThreeData, session);
    window.localStorage.clear();
  });

  it('constructs and sets the id property', () => {
    expect(flow.id).toEqual(24);
  });

  describe('.addAction', () => {
    it('adds actions to the root of flow if no parent is specified', () => {
      flow.addAction(actionOne, 'test');
      expect(flow.actions[0]).toEqual(actionOne);
      expect(actionOne.root).toEqual(true);
    });

    it('adds an action as an available trigger to another action', () => {
      let startingKeys = {'yes': 3};
      flow.addAction(actionOne, 'yes');
      expect(actionOne.availableActionKeys).toEqual(startingKeys);
      flow.addAction(actionTwo, 'no', actionOne);
      let expectedResult = Object.assign(startingKeys, {'no': actionTwo.id});
      expect(actionOne.availableActionKeys).toEqual(expectedResult);
    });
  });

  describe('.getRootAction', () => {
    it('returns the root actions', () => {
      flow.addAction(actionOne, 'a test');
      flow.addAction(actionTwo, 'b test');
      flow.addAction(actionThree, 'c test', actionTwo);
      expect(flow.getRootAction()).toEqual(actionTwo);
    });
  });

  describe('.setRootAction', () => {
    it('sets the flows new root action', () => {
      flow.addAction(actionOne, 'a test');
      flow.addAction(actionTwo, 'b test');
      flow.addAction(actionThree, 'c test', actionTwo);
      flow.setRootAction(actionThree);
      expect(flow.getRootAction()).toEqual(actionThree);
    });
  });

  describe('.setActiveAction', () => {
    it('sets the flows new active action', () => {
      flow.addAction(actionOne, 'a test');
      flow.addAction(actionTwo, 'b test');
      flow.addAction(actionThree, 'c test', actionTwo);
      flow.setActiveAction(actionTwo);
      expect(flow.activeAction).toEqual(actionTwo);
    });
  });
});

let fakeActions = [
  actionOneData,
  actionTwoData,
  actionThreeData,
  actionFourData
];

let actionOneData = {
  id: 1,
  text: 'is your favorite color red?',
  name: 'red',
  availableActionKeys: {
    'yes': 3
  }
};
let actionTwoData = {
  id: 2,
  text: 'is your favorite color blue?',
  name: 'blue',
  availableActionKeys: {
    'no': 4,
    'yes': 3
  }
};
let actionThreeData = {
  id: 3,
  text: 'correct',
  nextActionId: 1,
  availableActionKeys: {
    'no': 1
  }
};
let actionFourData = {
  id: 4,
  text: 'dont know',
  nextActionId: 1,
  availableActionKeys: {
    'no': 1
  }
};
