import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import BoardScene from './scenes/BoardScene';
import MenuScene from './scenes/MenuScene';

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
            debug: __DEV__
        }
    },
    scene: [
        BootScene,
        GameScene,
        BoardScene,
        MenuScene
    ]
};

const game = new Phaser.Game(config);

window.GlobalConfig = {
    game: game
}
