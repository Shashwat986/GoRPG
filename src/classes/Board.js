import tenuki from 'tenuki';
import BoardScene from '../components/BoardScene.vue';
import Vue from 'vue';

export default class Board extends Phaser.GameObjects.DOMElement {
    constructor(scene, data) {
        super(scene, data.x, data.y)

        this.createElement('div')
        this.vue = new Vue({
            render: h => h(BoardScene, {
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

        scene.add.existing(this);
    }
}
