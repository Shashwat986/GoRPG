import tenuki from 'tenuki';
import Mustache from 'mustache';

export default class Board extends Phaser.GameObjects.DOMElement {
    constructor(scene, data) {
        super(scene, data.x, data.y)

        const domWidth = scene.cameras.main.width * data.w;
        const domHeight = scene.cameras.main.height * data.h;

        this.createFromHTML(Mustache.render(
            scene.cache.text.get(data.key),
            {
                data: data,
                test: function () {
                    console.log(1)
                }
            }
        ))

        let style = this.node.style;
        style.width = domWidth + 'px';
        style.height = domHeight + 'px';
        this.updateSize()

        let boardElement = document.querySelector(".tenuki-board");
        this.game = new tenuki.Game({
            element: boardElement,
            boardSize: data.boardSize
        });

        if (data.setup != null) {
            this.setup(data.setup)
        }

        scene.add.existing(this);
    }

    setup (moves) {
        for (let elem of moves) {
            if (elem === "pass")
                this.game.pass()
            else
                this.game.playAt.apply(this.game, elem);
        }
    }

}
