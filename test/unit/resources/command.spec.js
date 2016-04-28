import {Commands} from 'resources/commands';
import {Command} from 'models/command';
import {Container} from 'aurelia-dependency-injection';

describe('Command model', () => {
  let commands;
  let container;

  beforeEach(() => {
    container = new Container().makeGlobal();
    let commands = container.get(Commands);
  });
});
