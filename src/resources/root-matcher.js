import {Matcher} from 'models/matcher';

export class RootMatcher {
  name = 'root_matcher';
  match(actions, action, message, currentFlowMatcher) {
    let result;
    return new Promise((resolve, reject) => {
      if (currentFlowMatcher) {
        currentFlowMatcher.match(action, message).then((matchedAction, args) => {
          if (!matchedAction) {
            matchAlgorithm(actions, action, message, resolve);
          }
          resolve(matchedAction, args);
        });
      }
      matchAlgorithm(actions, action, message, resolve);
    });
  }
}

function matchAlgorithm(actions, action, message, resolve) {
  let words = [];
  message.split(' ').forEach(message => {
    words.push(message.toLowerCase());
  });

  let firstWord = words[0];
  let secondWord = words[1];
  let thirdWord = words[2];
  // let myName = this.session.bot.name;
  let result;
  let additionalWords;
  let availableActions = action.getAvailableActions(actions);
  result = action.findByTrigger(message, availableActions);
  if (result) {
    words = words.join(' ');
  } else {
    result = action.findByTrigger(firstWord + ' ' + secondWord + ' ' + thirdWord, availableActions);
    if (result) {
      words = words.splice(3, words.length).join(' ');
    } else {
      result = action.findByTrigger(firstWord + ' ' + secondWord, availableActions);
      if (result) {
        words = words.splice(2, words.length).join(' ');
      } else {
        result = action.findByTrigger(firstWord, availableActions);
        if (result) {
          words = words.splice(1, words.length).join(' ');
        } else {
          let catchAllAction = action.findByTrigger('*', availableActions);
          if (catchAllAction) {
            result = catchAllAction;
            words = words.join(' ');
          }
        }
      }
    }
  }
  additionalWords = words;
  resolve({action: result, args:additionalWords});
}
