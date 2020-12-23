import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';
import Board from '../classes/Board.js';

class BoardScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BoardScene',
            cameras: {
                backgroundColor: 'rgba(0,0,0,0.5)'
            }
        });
    }

    init (data) {
        this.data = data
    }

    preload () {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }

    create () {
        this.input.keyboard.enabled = false
        this.board = new Board(this, {
            x: this.screenCenterX,
            y: this.screenCenterY,
            w: 0.9,
            h: 0.9,
            data: this.data
        });

        let img = this.add.image(this.sys.game.config.width - 32, 32, 'cross');
        img.displayWidth = 48;
        img.displayHeight = 48;
        img.setInteractive();
        img.on('pointerup', () => {
            this.scene.stop();
            this.scene.wake('GameScene');
        });
    }

    update () {
    }
}

export default BoardScene;
