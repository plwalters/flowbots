import {AvailableValueConverter} from 'resources/available';
import {Action} from 'models/action';

describe('AvailableValueConverter', () => {
  let valueConverter;

  beforeEach(() => {
    valueConverter = new AvailableValueConverter();
  });

  describe('.toView', () => {
    let array;
    let activeAction;

    beforeEach(() => {
      array = [ 'doesnt matter' ];
      activeAction = new Action({});
    });

    it('returns no results when activeAction has no triggers', () => {
      let result = valueConverter.toView(array, activeAction);
      expect(result.length).toEqual(0);
    });

    it('returns triggers when activeAction has triggers', () => {
      let keyNameOne = 'testone';
      let keyNameTwo = 'testtwo';
      activeAction.availableActionKeys = { [keyNameOne]: 1, [keyNameTwo]: 2 };
      let result = valueConverter.toView(array, activeAction);
      expect(result.length).toEqual(2);
      expect(result).toEqual([keyNameOne, keyNameTwo]);
    });

    it('returns triggers without "*" when activeAction has triggers', () => {
      let keyNameOne = 'testone';
      let keyNameTwo = 'testtwo';
      activeAction.availableActionKeys = { [keyNameOne]: 1, [keyNameTwo]: 2, '*': 3 };
      let result = valueConverter.toView(array, activeAction);
      expect(result.length).toEqual(2);
      expect(result).toEqual([keyNameOne, keyNameTwo]);
    });
  });
});
