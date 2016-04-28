import {DataStore} from 'services/data-store';
import {Container} from 'aurelia-dependency-injection';

describe('DataStore', () => {
  let container;
  let dataStore;

  beforeEach(() => {
    container = new Container().makeGlobal();
    dataStore = container.get(DataStore);
    window.localStorage.clear();
  });

  describe('.getCollection', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'getItem').and.returnValue('{"name": "test"}');
    });

    it('calls localStorage.getItem with the matching item name', () => {
      dataStore.getCollection('test');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('test');
    });
  });

  describe('.setCollection', () => {

    beforeEach(() => {
      spyOn(window.localStorage, 'setItem');
    });

    it('calls localStorage.setItem with the name and value', () => {
      let name = 'test';
      let value = { name: 'test' };
      dataStore.setCollection(name, value);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(name, JSON.stringify(value));
    });

    it('prevents a circular reference when serializing objects', () => {
      let object1 = { a: 'b' };
      let object2 = { a: 'c', b: object1 };
      object1.b = object2;
      dataStore.setCollection('testing', { collection: [ object1, object2 ]}, 'b');
      setTimeout(() => {
        let test = dataStore.getCollection('testing')
        expect(window.localStorage.testing).toBeDefined();
      }, 100);
    });
  });

  describe('.clearCollection', () => {
    it('clears a collection that has items', () => {
      window.localStorage.testing = "['testing']";
      dataStore.clearCollection('fake');
      let result = window.localStorage.testing;
      setTimeout(() => {
        expect(result).toEqual(null);
      }, 100);
    });

    it('clears a collection that has no items', () => {
      window.localStorage.testing = '';
      dataStore.clearCollection('fake');
      let result = window.localStorage.testing;
      setTimeout(() => {
        expect(result).toEqual(null);
      }, 100);
    });

    it('does not throw an error if no collection is present', () => {
      expect(() => { dataStore.clearCollection('fake')}).not.toThrow();
    });
  });
});
