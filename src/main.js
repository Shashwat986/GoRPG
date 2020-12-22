import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import BoardScene from './scenes/BoardScene';

const config = {
    type: Phaser.AUTO,
    parent: 'content',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 32*24,
        height: 32*20
    },
    dom: {
        createContainer: true
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
        GameScene,
        BoardScene
    ]
};

const game = new Phaser.Game(config);
