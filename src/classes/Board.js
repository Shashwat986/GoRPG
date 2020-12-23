import tenuki from 'tenuki';
import Tutorial from '../components/Tutorial.vue';
import Vue from 'vue';

export default class Board extends Phaser.GameObjects.DOMElement {
    constructor(scene, data) {
        super(scene, data.x, data.y)

        window.t = this;
        this.v = Tutorial
        window.v = Vue

        this.createElement('div')
        this.vue = new Vue({
            render: h => h(Tutorial, {
                attrs: {
                    data: data.data
                }
            }),
        }).$mount();

        this.node.appendChild(this.vue.$el)


        const domWidth = scene.cameras.main.width * data.w;
        const domHeight = scene.cameras.main.height * data.h;

        let style = this.node.style;
        style.width = domWidth + 'px';
        style.height = domHeight + 'px';
        this.updateSize()

//      let boardElement = document.querySelector(".tenuki-board");
//      this.game = new tenuki.Game({
//          element: boardElement,
//          boardSize: data.boardSize
//      });

//      if (data.setup != null) {
//          this.setup(data.setup)
//      }

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
