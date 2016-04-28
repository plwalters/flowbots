import {App} from '../../src/app';

describe('the App module', () => {
  var sut;

  beforeEach(() => {
    sut = new App();
  });

  it('contains a router property', () => {
    expect(sut).toBeDefined();
  });
});
