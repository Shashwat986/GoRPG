import 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

window.uuidCount = 1;
window.getUuid = function () {
  window.uuidCount += 1;
  return window.uuidCount;
}

window.DEBUG = false;
window.numLevels = 15;

if (window.localStorage.getItem('loopState')) {
  window.solvedState = parseInt(window.localStorage.getItem('loopState'));
}

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 32*24,
    height: 32*20,
    pixelArt: true
  },
  pixelArt: true,
  backgroundColor: '#cc9',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    }
  },
  scene: [
    BootScene,
    TitleScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);
