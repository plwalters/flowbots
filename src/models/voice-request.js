export class VoiceRequest {
  transcript = '';
  constructor(data) {
    this.transcript = data.results[0][0].transcript;
  }
  getWords() {
    return this.transcript.split(' ');
  }
  getMessage() {
    return this.words;
  }
}
