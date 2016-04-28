import {VoiceRequest} from 'models/voice-request';

describe('VoiceRequest model', () => {

  let fakeVoiceRequest = {
    results: [[{
      transcript: 'hello world'
    }]]
  };
  let request;

  beforeEach(() => {
    request = new VoiceRequest(fakeVoiceRequest)
  });

  it('constructs and sets the transcript property', () => {
    expect(request.transcript).toEqual('hello world');
  });

  describe('.getWords', () => {

    it('returns an array of words', () => {
      let result = request.getWords();
      expect(Array.isArray(result)).toEqual(true);
    });

    it('returns words from the transcript in the same order', () => {
      let result = request.getWords();
      expect(result).toEqual(['hello', 'world']);
    });
  });
});
