export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'base', 1029);
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.depth = 5;
        this.body.setCollideWorldBounds(true);
        scene.physics.add.collider(this, scene.layerCollides);
    }

    update (cursors) {
        if (!this.body.embedded && this.body.touching.none)
            this.interactingWithActionArea = false

        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        if (cursors.left.isDown) {
            this.body.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(200);
        } else {
        }

        if (cursors.up.isDown) {
            this.body.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(200);
        } else {
        }
    }
}
