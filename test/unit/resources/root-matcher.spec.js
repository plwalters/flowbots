import {RootMatcher} from 'resources/root-matcher';
import {Action} from 'models/action';
import {Container} from 'aurelia-dependency-injection';

describe('RootMatcher', () => {
  let container;
  let matcher;
  let actionCollection;
  class FakeChildMatcher {
    match() {
      return new Promise((resolve, reject) => {
        return resolve('test');
      });
    }
  }

  beforeEach(() => {
    container = new Container().makeGlobal();
    matcher = container.get(RootMatcher);
    actionCollection = [new Action({
      id: 1,
      message: 'welcome',
      name: 'red',
    })];
  });

  describe('.match', () => {
    it('calls a childMatchers match method first', () => {
      let childMatcher = new FakeChildMatcher();
      spyOn(childMatcher, 'match').and.returnValue(
        new Promise((resolve, reject) => {
          return resolve('test');
        })
      );
      matcher.match(actionCollection, actionCollection[0], 'test', childMatcher);
      expect(childMatcher.match).toHaveBeenCalled();
    });
  });
});
