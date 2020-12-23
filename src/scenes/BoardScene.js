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
    }

    preload () {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.load.text("board", "assets/Board.html");
    }

    create () {
        this.board = new Board(this, {
            x: this.screenCenterX,
            y: this.screenCenterY,
            w: 0.9,
            h: 0.9,
            key: "board",
            boardSize: 5,
            title: "Let's Play",
            setup: [
                [1, 2],
                "pass",
                [2, 1],
                "pass",
                [3, 2],
                [2, 2]
            ]
        });
    }

    update () {
    }
}

export default BoardScene;
