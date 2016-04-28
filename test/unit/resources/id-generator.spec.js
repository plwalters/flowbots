import {newId} from 'resources/id-generator';

describe('.newId', () => {
  it('returns an id between 10000 and 99999', () => {
    var times = 10;
    for(var i=0; i < times; i++) {
      let result = newId();
      expect(result > 10000).toEqual(true);
      expect(result < 99999).toEqual(true);
    }
  });
});
