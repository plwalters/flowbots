import {FlowController} from 'services/flow-controller';
import {Container} from 'aurelia-dependency-injection';

describe('FlowController', () => {
  class FakeFlow {
    matcher = { match: () => { } };
  }
  class FakeCurrentFlow {
    actions = [];
    activeAction = {
      findNextAction: function () {}
    };
  }

  let container;
  let flowController;
  let fakeRoot;
  let currentFlow;
  let secondFakeFlow;
  let trigger;

  beforeEach(() => {
    fakeRoot = new FakeFlow();
    currentFlow = new FakeCurrentFlow();
    secondFakeFlow = new FakeCurrentFlow();
    trigger = 'test';
    container = new Container().makeGlobal();
    flowController = container.get(FlowController);
  });

  describe('.runCycle', () => {
    let options;

    beforeEach(() => {
      options = {
        rootFlow: fakeRoot,
        currentFlow: currentFlow,
        trigger: trigger
      };
      spyOn(flowController, 'matchAction').and.returnValue(
        new Promise((resolve, reject) => {
          let result = 'test';
          resolve(result);
        })
      )
    });

    it('calls match action with the proper arguments', () => {
      flowController.runCycle(options);
      expect(flowController.matchAction).toHaveBeenCalledWith(currentFlow, fakeRoot, trigger);
    });

    it('calls the handleResult method with proper args', (done) => {
      spyOn(flowController, 'handleResult');
      flowController.runCycle(options);
      expect(flowController.matchAction).toHaveBeenCalledWith(currentFlow, fakeRoot, trigger);
      setTimeout(() => {
        expect(flowController.handleResult).toHaveBeenCalledWith(currentFlow, fakeRoot, 'test');
        done();
      })
    });
  });

  describe('.matchAction', () => {
    beforeEach(() => {
      spyOn(fakeRoot.matcher, 'match').and.returnValue(
        new Promise((resolve, reject) => {
          let result = 'test';
          resolve(result);
        })
      )
    });

    it('calls match action with the proper arguments', () => {
      spyOn(flowController, 'matchAction').and.returnValue(
        new Promise((resolve, reject) => {
          let result = 'test';
          resolve(result);
        })
      );
      let options = {
        rootFlow: fakeRoot,
        currentFlow: currentFlow,
        trigger: trigger
      };
      flowController.runCycle(options);
      expect(flowController.matchAction).toHaveBeenCalledWith(currentFlow, fakeRoot, trigger);
    });

    it('calls root matcher.match with the child matcher when root !== current', () => {
      let currentFlow = secondFakeFlow;
      let childMatcher = secondFakeFlow.matcher;

      let options = {
        rootFlow: fakeRoot,
        currentFlow: currentFlow,
        trigger: trigger
      };
      flowController.runCycle(options);
      expect(fakeRoot.matcher.match).toHaveBeenCalledWith(currentFlow.actions, currentFlow.activeAction, trigger, childMatcher);
    });
  });


  describe('.handleResult', () => {
    beforeEach(() => {
      spyOn(fakeRoot.matcher, 'match').and.returnValue(
        new Promise((resolve, reject) => {
          let result = 'test';
          resolve(result);
        })
      )
    });

    it('sets the current flows active action to result if exists', () => {
      let expectedAction = { name: 'spy' };
      flowController.handleResult(currentFlow, fakeRoot, expectedAction);
      expect(currentFlow.activeAction).toEqual(expectedAction);
    });

    describe('when there is no result but nextActionId exists', () => {

      beforeEach(() => {
        currentFlow.activeAction.nextActionId = 100;
        spyOn(currentFlow.activeAction, 'findNextAction');
      });

      it('looks for the next action', () => {
        spyOn(flowController, 'runCycle');
        flowController.handleResult(currentFlow, fakeRoot, null);
        expect(currentFlow.activeAction.findNextAction).toHaveBeenCalledWith(currentFlow.actions);
      });

      it('calls .runCycle with a catchAll', () => {
        spyOn(flowController, 'runCycle');
        flowController.handleResult(currentFlow, fakeRoot, null);
        let expectedResult = {
          currentFlow: currentFlow,
          rootFlow: fakeRoot,
          trigger: '*'
        }
        expect(flowController.runCycle).toHaveBeenCalledWith(expectedResult);
      });
    });
  });
});
