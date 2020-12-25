import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';
import DOM from '../classes/DOM.js';

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
        this.board = new DOM(this, {
            x: this.screenCenterX,
            y: this.screenCenterY,
            w: 0.85,
            h: 0.85,
            data: this.data
        });

        this.add.image(this.sys.game.config.width - 48, 48, 'cross')
            .setDisplaySize(32, 32)
            .setInteractive()
            .on('pointerup', () => {
                this.scene.stop();
                this.scene.wake('GameScene');
            });
    }

    update () {
    }
}

export default BoardScene;
