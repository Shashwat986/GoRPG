import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'content',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 32*24,
        height: 32*20
    },
    backgroundColor: '#cc9',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        BootScene,
        GameScene
    ]
};

const game = new Phaser.Game(config);
