export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 1);
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.body.setSize(24, 16, false)
        this.body.setOffset(4, 16)

        this.createAnims();

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
        }

        if (cursors.up.isDown) {
            this.body.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(200);
        }

        this.animate(cursors)
    }

    createAnims () {
        this.scene.anims.create({
            key: "left",
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [3,4,5] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "right",
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [6,7,8] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "up",
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [9,10,11] }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "down",
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [0,1,2] }),
            frameRate: 10,
            repeat: -1
        });
    }

    animate (cursors) {
        if (cursors.left.isDown) {
            this.anims.play('left', true)
        } else if (cursors.right.isDown) {
            this.anims.play('right', true)
        } else if (cursors.up.isDown) {
            this.anims.play('up', true)
        } else if (cursors.down.isDown) {
            this.anims.play('down', true);
        } else {
            this.anims.stop();
        }

    }
}
