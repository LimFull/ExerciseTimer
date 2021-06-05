import Sound from 'react-native-sound';
const beepbeep = 'beepbeep.mp3';

export const SOUND_OBJECT = {
  beepbeep: 'beepbeep',
};

class SoundPlayer {
  constructor() {
    this.soundObjects = {};
    this._init();
  }

  _init() {
    Sound.setCategory('Playback');

    this.soundObjects.beepbeep = new Sound(
      beepbeep,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          throw new Error("Can't load sound");
        }
      }
    );
  }

  playSound(sound) {
    this.soundObjects[sound].play();
  }
}

export default new SoundPlayer();
