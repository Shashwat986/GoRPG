import Player from '../classes/Player.js';
import ActionArea from '../classes/ActionArea.js';
import tenuki from 'tenuki'

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
            <div style="position: relative;background-color: #7f0000; width: ${domWidth}px; height: ${domHeight}px;">
                <div style="width: 80%; height: 80%; top: 10%; left: 5%; position: absolute;">
                    <div class="tenuki-board"></div>
                </div>
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
