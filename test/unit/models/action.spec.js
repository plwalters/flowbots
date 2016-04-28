import {VoiceRequest} from 'models/voice-request';
import {Action} from 'models/action';
import {Container} from 'aurelia-dependency-injection';
import {Session} from 'services/session';
import {Commands} from 'resources/commands';

describe('Action model', () => {
  let fakeRequest = {
    results: [[{
      transcript: 'hello world'
    }]]
  };
  class FakeFace {
    speak() {}
  }

  let request;
  let action;
  let session;
  let container;
  let secondAction;
  let commands;
  let actionCollection;
  let actionOne;
  let actionTwo;
  let actionThree;
  let actionFour;
  let actionTwoTrigger;
  let actionThreeTrigger;
  let actionFourTrigger;

  beforeEach(() => {
    actionCollection = [];
    container = new Container().makeGlobal();
    session = container.get(Session);
    commands = container.get(Commands);
    request = new VoiceRequest(fakeRequest);
    actionOne = new Action(actions[0]);
    actionTwo = new Action(actions[1]);
    actionThree = new Action(actions[2]);
    actionFour = new Action(actions[3]);
    actionOne.command = commands.say;
    actionTwo.command = commands.say;
    actionThree.command = commands.say;
    actionFour.command = commands.say;
    actionTwoTrigger = 'one';
    actionThreeTrigger = 'two';
    actionFourTrigger = 'three';
    actionOne.createTrigger(actionTwoTrigger, actionTwo.id);
    actionOne.createTrigger(actionThreeTrigger, actionThree.id);
    actionOne.createTrigger(actionFourTrigger, actionFour.id);
    actionCollection.push(actionTwo);
    actionCollection.push(actionThree);
    actionCollection.push(actionFour);
    window.localStorage.clear();
  });

  it('constructs and sets the message property', () => {
    expect(actionOne.message).toEqual('welcome');
  });

  describe('.createTrigger', () => {
    it('adds a new trigger to the availableActionKeys with a value of the id', () => {
      let one = 'one';
      actionOne.createTrigger(one, actionTwo);
      expect(actionOne.availableActionKeys[one]).not.toEqual(undefined);
    });
  });

  describe('.findByTrigger', () => {
    it('finds an action by text from passed in actions list', () => {
      let result = actionOne.findByTrigger('one', actionCollection);
      expect(result.id).toEqual(actionTwo.id);
    });

    it('is undefined when no matching action is found', () => {
      let result = actionOne.findByTrigger('not hello world', actionCollection);
      expect(result).toEqual(undefined);
    });

    it('logs a error when no actions are passed in', () => {
      spyOn(console, 'error');
      let result = actionOne.findByTrigger('not hello world');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('.findNextAction', () => {
    it('find next action based on nextActionId', () => {
      actionOne.nextActionId = 2;
      let result = actionOne.findNextAction(actionCollection);
      expect(result.id).toEqual(actionTwo.id);
    });

    it('returns undefined when no matching id is present', () => {
      actionTwo.id = 2;
      let result = actionOne.findNextAction(actionCollection);
      expect(result).toEqual(undefined);
    });

    it('nulls out the nextActionId if undefined is returned', () => {
      actionOne.nextActionId = 12;
      let result = actionOne.findNextAction(actionCollection);
      expect(result).toEqual(undefined);
      expect(actionOne.nextActionId).toEqual(null);
    });
  });

  describe('.getAvailableActions', () => {
    it('gets all available actions', () => {
      let expectedIds = actionOne.getAvailableActions(actionCollection).map(function (action) {
        return action.id;
      });
      expect(expectedIds).toEqual([actionTwo.id, actionThree.id, actionFour.id]);
      expectedIds = actionTwo.getAvailableActions(actionCollection).map(function (action) {
        return action.id;
      });
      expect(expectedIds).toEqual([]);
    });
  });

  describe('.getAvailableTriggers', () => {
    it('gets all available triggers', () => {
      let result = actionOne.getAvailableTriggers();
      expect(result).toEqual([actionTwoTrigger, actionThreeTrigger, actionFourTrigger]);
    });
  });

  describe('.execute', () => {
    it('calls the commands execute method', () => {
      spyOn(commands.say, 'execute');
      let result = actionOne.execute();
      expect(commands.say.execute).toHaveBeenCalled();
    });
  });

  describe('Class.findCommandByName', () => {
    it('returns the command with a matching name', () => {
      let result = Action.findCommandByName('say');
      expect(result).toEqual(commands.say);
    });
  });
});

let actions = [{
  id: 1,
  message: 'welcome',
  name: 'red'
}, {
  id: 2,
  message: 'is your favorite color blue?',
  name: 'blue'
}, {
  id: 3,
  message: 'correct',
  nextActionId: 1
}, {
  id: 4,
  message: 'dont know',
  nextActionId: 1
}];
