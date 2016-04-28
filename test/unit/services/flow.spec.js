import {FlowService} from 'services/flow';
import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {Flow} from 'models/flow';
import {DataStore} from 'services/data-store';

describe('FlowService', () => {
  let container;
  let flowService;
  let dataStore;

  beforeEach(() => {
    container = new Container().makeGlobal();
    flowService = container.get(FlowService);
    dataStore = container.get(DataStore);
  });

  describe('.getAllFlows', () => {
    it('returns all flows from localStorage when they exist', () => {
      let seed = [
        new Flow({
          name: 'root',
          actions: []
        }),
        new Flow({
          name: 'testing',
          actions: []
        })
      ]
      dataStore.setCollection('flows', seed);
      let result = flowService.getAllFlows();
      expect(result[0].name).toEqual(seed[0].name);
      expect(result[1].name).toEqual(seed[1].name);
    });

    it('returns objects that are instanceof a Flow class', () => {
      let seed = [
        {
          name: 'root',
          actions: []
        }
      ]
      window.localStorage.flows = JSON.stringify(seed);
      let result = flowService.getAllFlows();
      expect(result[0] instanceof Flow).toEqual(true);
    });

    it('seeds root flow when localStorage flows is empty', () => {
      window.localStorage.flows = JSON.stringify([]);
      spyOn(flowService, 'createRootFlow');
      let result = flowService.getAllFlows();
      expect(flowService.createRootFlow).toHaveBeenCalled();
    });
  });
});
