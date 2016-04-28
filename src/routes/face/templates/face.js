import {bindable} from 'aurelia-framework';
import {VoiceRequest} from 'models/voice-request';
import {Session} from 'services/session';
import {FlowController} from 'services/flow-controller';
import {RootCommands} from 'resources/commands/root';
import {NoteCommands} from 'resources/commands/note';

let recognition = new webkitSpeechRecognition();
let speech = window.speechSynthesis;

export class Face {
  token;
  leftEye;
  rightEye;
  mouth;
  lastTalkingValue;
  state;
  currentFlow;
  @bindable lastHeard = '';
  isActive = false;
  isListening = false;
  recognition;
  displayText = '';
  lastDisplayText = '';
  static inject = [Session, FlowController, RootCommands, NoteCommands];
  constructor(session, flowController, rootCommands, noteCommands) {
    this.flowController = flowController;
    this.session = session;
    rootCommands.face = this;
    noteCommands.face = this;
    this.setCurrentFlow(this.session.rootFlow);
    this.setRecognitionHandlers();
  }
  setRecognitionHandlers() {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let interim_transcript = '';
      let final_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          interim_transcript = '';
          interim_transcript += event.results[i][0].transcript;
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      final_transcript = final_transcript;

      let request = new VoiceRequest(event);
      let justHeard = final_transcript;
      this.lastHeard = justHeard;
      let tempResults = this.lastDisplayText + interim_transcript;
      this.thinkHearing = tempResults.length > 35 ? tempResults.substr(tempResults.length - 35) : tempResults;
      this.displayText = this.thinkHearing;
    };
    recognition.onerror = (event) => {
      console.log('There were errors - ');
      console.log(event);
    };
    recognition.onend = (event) => {
      setTimeout(() => {
        if (!this.isTalking) {
          this.isListening = false;
          console.log('ended, listening')
          this.listen();
        }
      }, 250);
    };
  }
  lastHeardChanged(newValue) {
    if (!newValue) {
      return '';
    }
    let tempText = this.lastDisplayText + newValue;
    let displayMessage = '';
    if (tempText.length > 35) {
      displayMessage = tempText.substr(tempText.length - 35);
    } else {
      displayMessage = tempText;
    }
    displayMessage += '; ';
    this.lastDisplayText = displayMessage;
    this.displayText = displayMessage;
    let trimmed = this.lastHeard.trim();
    if (trimmed !== this.lastHeard && this.lastHeard.length === 1) {
      debugger;
    }
    this.runCycle(trimmed);
  }
  selectTrigger(trigger) {
    this.runCycle(trigger);
  }
  runCycle(trigger) {
    let activeAction = this.currentFlow.activeAction;
    this.flowController.runCycle({
      rootFlow: this.session.rootFlow,
      currentFlow: this.currentFlow,
      trigger: trigger
    });
  }
  attached() {
    this.isActive = true;
    console.log('attached, listening')
    this.listen();
  }
  get isTalking() {
    let newValue = speech.speaking;
    if (newValue === this.lastTalkingValue)
      return newValue;
    this.lastTalkingValue = newValue;
    if (newValue === true) {
      this.startTalking();
    } else {
      this.stopTalking();
    }
  }
  speak(message) {
    var msg = new SpeechSynthesisUtterance(message);
    speech.speak(msg);
  }
  toggleActive() {
    this.isActive = !this.isActive;
    speech.cancel();
  }
  startTalking() {
    this.stopListening();
    this.leftEye.eye.startTalking();
    this.rightEye.eye.startTalking();
    this.mouth.startTalking();
  }
  stopTalking() {
    this.leftEye.eye.stopTalking();
    this.rightEye.eye.stopTalking();
    this.mouth.stopTalking();
    this.mouth.shut();
    this.listen();
  }
  stopListening() {
    this.isListening = false;
    recognition.stop();
  }
  setCurrentFlow(newFlow) {
    this.currentFlow = newFlow;
    if (this.currentFlow && !this.currentFlow.activeAction) {
      this.currentFlow.activeAction = this.currentFlow.getRootAction();
    }
    this.runCycle('*');
  }
  listen() {
    if (this.isActive && this.isListening === false) {
      this.isListening = true;
      recognition.start();
    }
  }
  detached() {
    this.isActive = false;
    this.stopListening();
  }
  resetState() {
    this.currentFlow.activeAction = this.currentFlow.getRootAction();
    this.runCycle('root');
  }
  resetAllState() {
    this.setCurrentFlow(this.session.rootFlow);
    this.currentFlow.activeAction = this.currentFlow.getRootAction();
    this.runCycle('root');
  }
}
