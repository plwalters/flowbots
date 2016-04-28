import {Face} from 'face/templates/face';
import {Container} from 'aurelia-dependency-injection';

describe('Face', () => {
  let face;
  let container;

  beforeEach(() => {
    container = new Container().makeGlobal();
    face = container.get(Face);
    window.localStorage.clear();
  });

  describe('.toggleActive', () => {
    beforeEach(() => {
      face.isActive = false;
    });

    it('toggles the property', () => {
      face.toggleActive();
      expect(face.isActive).toEqual(true);
    });

    it('calls speak method if set to active by toggle', () => {
      spyOn(face, 'speak');
      face.toggleActive();
      expect(face.speak).toHaveBeenCalled();
    });
  });

  describe('.stopListening', () => {
    it('sets isListening to false', () => {
      face.isListening = true;
      face.stopListening();
      expect(face.isListening).toEqual(false);
    });
  });

  describe('.listen', () => {
    describe('when not active', () => {
      beforeEach(() => {
        face.isActive = false;
      });

      it('does not change isListening property', () => {
        face.listen();
        expect(face.isListening).toEqual(false);
      });
    });
  });
});
