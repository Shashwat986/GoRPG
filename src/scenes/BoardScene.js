import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';
import tenuki from 'tenuki'

class BoardScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BoardScene',
            cameras: {
                x: 32*2,
                y: 32*2,
                width: 32*20,
                height: 32*16,
                backgroundColor: '#770000'
            }
        });
    }

    init (data) {
        console.log("Here");
    }

    preload () {
    }

    create () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const domWidth = this.cameras.main.width * 0.8;
        const domHeight = this.cameras.main.height * 0.8;
        this.add.dom(screenCenterX, screenCenterY).createFromHTML(`
            <div style="background-color: gray; width: ${domWidth}px; height: ${domHeight}px;">
                <div class="tenuki-board"></div>
            </div>
        `)
        var boardElement = document.querySelector(".tenuki-board");
        var game = new tenuki.Game({
            element: boardElement,
            boardSize: 19
        });

        this.add.text(
            screenCenterX,
            this.cameras.main.worldView.y + 10,
            "Let's Play!",
            {
                fontFamily: "sans-serif",
                fontSize: "25px"
            }
        ).setOrigin(0.5, 0);
    }

    update () {
    }
}

export default BoardScene;
