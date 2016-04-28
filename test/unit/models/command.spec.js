import {Command} from 'models/command';
import {Container} from 'aurelia-dependency-injection';
import {Session} from 'services/session';

describe('Command model', () => {
  let command;
  let session;
  let container;
  let commandName;

  beforeEach(() => {
    commandName = 'test';
    container = new Container().makeGlobal();
    session = Container.instance.get(Session);
    command = new Command({ name: commandName });
    window.localStorage.clear();
  });

  it('constructs and sets the name property', () => {
    expect(command.name).toEqual(commandName);
  });
});
